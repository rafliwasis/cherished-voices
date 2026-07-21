import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchOverrides, saveOverrides } from '../../lib/data-store';
import { MOMENT_ITEMS } from '../../data';
import { MomentItem } from '../../types';
import { Pencil, Check, X, RefreshCw, Save, Image as ImageIcon } from 'lucide-react';

interface MomentMeta {
  id: string;
  staticId: string;
  imageUrl: string;
  caption: string;
  description: string;
  aspect: MomentItem['aspect'];
  sort_order: number;
  fromDb: boolean;
}

// ── Local Image Uploader ──
function ImageUploader({ currentUrl, onUploaded }: { currentUrl: string; onUploaded: (url: string) => void }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    setError('');
    setUploading(true);
    const ext = file.name.split('.').pop();
    const filename = `images/custom_${Date.now()}.${ext}`;
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-filename': filename,
          'Content-Type': file.type,
        },
        body: file,
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }
      
      const data = await response.json();
      onUploaded(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }, [onUploaded]);

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) uploadFile(f); }}
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          dragging ? 'bg-[#912A55]/50 opacity-100' : 'bg-black/0 opacity-0 hover:bg-black/40 hover:opacity-100'
        }`}
      >
        {uploading ? (
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <ImageIcon className="w-4 h-4 text-[#912A55]" />
            </div>
            <span className="font-sans text-[10px] text-white font-medium uppercase tracking-wider text-center px-2 drop-shadow-md">
              {dragging ? 'Drop image' : 'Change Image'}
            </span>
          </>
        )}
      </div>
      {error && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-500/90 text-white text-[10px] px-2 py-1 rounded shadow-lg z-20">
          {error}
        </div>
      )}
    </>
  );
}


export default function MomentsAdmin() {
  const [moments, setMoments] = useState<MomentMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editAspect, setEditAspect] = useState<MomentItem['aspect']>('square');
  const [error, setError] = useState('');

  const mergeWithDb = (dbRows: Record<string, any>) => {
    const base = MOMENT_ITEMS.map((item, idx) => {
      const db = dbRows[item.id];
      return {
        id: db?.db_id ?? item.id,
        staticId: item.id,
        imageUrl: db?.image_url ?? item.imageUrl,
        caption: db?.caption ?? item.caption,
        description: db?.description ?? item.description ?? '',
        aspect: db?.aspect ?? item.aspect,
        sort_order: idx,
        fromDb: !!db,
        isCustom: false,
      };
    });

    const existingIds = new Set(MOMENT_ITEMS.map(i => i.id));
    const custom = Object.entries(dbRows)
      .filter(([id]) => !existingIds.has(id))
      .map(([id, data], idx) => ({
        id,
        staticId: id,
        imageUrl: data.image_url,
        caption: data.caption,
        description: data.description,
        aspect: data.aspect ?? 'square',
        sort_order: base.length + idx,
        fromDb: true,
        isCustom: true,
      }));

    return [...base, ...custom];
  };

  const fetchFromDb = async () => {
    setLoading(true);
    const overrides = await fetchOverrides();
    const momentsObj = overrides.moments || {};

    const dbMap: Record<string, any> = {};
    Object.entries(momentsObj).forEach(([id, data]) => {
      dbMap[id] = {
        db_id: id,
        image_url: data.imageUrl,
        caption: data.caption,
        description: data.description,
        aspect: data.aspect,
      };
    });
    
    setMoments(mergeWithDb(dbMap));
    setLoading(false);
  };

  useEffect(() => { fetchFromDb(); }, []);

  const startEdit = (m: MomentMeta) => {
    setEditingId(m.staticId);
    setEditCaption(m.caption);
    setEditDescription(m.description);
    setEditImageUrl(m.imageUrl);
    setEditAspect(m.aspect);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCaption('');
    setEditDescription('');
    setEditImageUrl('');
    setError('');
  };

  const handleSave = async (m: MomentMeta) => {
    if (!editCaption.trim()) { setError('Title is required.'); return; }
    setError('');
    setSavingId(m.staticId);

    try {
      const overrides = await fetchOverrides();
      if (!overrides.moments) overrides.moments = {};
      
      const isNew = m.staticId.startsWith('new_');
      const finalId = isNew ? `custom_${Date.now()}` : m.staticId;
      
      overrides.moments[finalId] = {
        imageUrl: editImageUrl,
        caption: editCaption.trim(),
        description: editDescription.trim(),
        aspect: editAspect
      };
      
      await saveOverrides(overrides);
      
      if (isNew) {
        fetchFromDb(); // Re-fetch to merge properly
        cancelEdit();
        return;
      }

      setMoments((prev) =>
        prev.map((item) =>
          item.staticId === m.staticId
            ? { ...item, caption: editCaption.trim(), description: editDescription.trim(), imageUrl: editImageUrl, aspect: editAspect, fromDb: true }
            : item
        )
      );
      
      setSavingId(null);
      setSavedId(m.staticId);
      setTimeout(() => setSavedId(null), 2000);
      cancelEdit();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddNew = () => {
    const newId = `new_${Date.now()}`;
    setMoments(prev => [{
      id: newId,
      staticId: newId,
      imageUrl: '/images/cv_placeholder.jpg',
      caption: '',
      description: '',
      aspect: 'square',
      sort_order: 0,
      fromDb: false,
      isCustom: true
    }, ...prev]);
    
    setEditingId(newId);
    setEditCaption('');
    setEditDescription('');
    setEditImageUrl('/images/cv_placeholder.jpg');
    setEditAspect('square');
    setError('');
  };

  const handleDelete = async (staticId: string) => {
    if (!confirm('Are you sure you want to delete this custom moment?')) return;
    
    try {
      const overrides = await fetchOverrides();
      if (overrides.moments && overrides.moments[staticId]) {
        delete overrides.moments[staticId];
        await saveOverrides(overrides);
        fetchFromDb();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const aspectClass = (aspect: string) => {
    switch(aspect) {
      case '9/16': return 'aspect-[9/16]';
      case '2/3': return 'aspect-[2/3]';
      case '3/4': return 'aspect-[3/4]';
      case '4/5': return 'aspect-[4/5]';
      default: return 'aspect-square';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-light italic text-[#1C1B1B]">Moments Gallery</h2>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleAddNew} className="flex items-center gap-1.5 px-4 py-2 bg-[#912A55] hover:bg-[#B05480] text-white font-sans text-xs font-medium uppercase tracking-widest rounded-full transition-colors cursor-pointer shadow-sm">
            + Add New
          </button>
          <button onClick={fetchFromDb} disabled={loading} className="p-2 text-[#5e5e5d] hover:text-[#912A55] transition-colors cursor-pointer">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <X className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="font-sans text-xs text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-[#5e5e5d]">
          <div className="w-5 h-5 border-2 border-[#912A55]/20 border-t-[#912A55] rounded-full animate-spin" />
          <span className="font-sans text-sm">Loading moments…</span>
        </div>
      ) : (
        <div className="space-y-4">
          {moments.map((m) => {
            const isEditing = editingId === m.staticId;
            const isSaving = savingId === m.staticId;
            const isSaved = savedId === m.staticId;
            const currentImg = isEditing ? editImageUrl : m.imageUrl;

            return (
              <div key={m.staticId} className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${isEditing ? 'border-[#912A55]/30 shadow-md' : 'border-[#D9BDD0]/30'}`}>
                <div className="flex gap-0">
                  {/* Image thumbnail */}
                  <div className={`relative flex-shrink-0 w-32 md:w-48 ${aspectClass(m.aspect)} bg-[#e5e2e1]`}>
                    <img src={currentImg} alt={m.caption} className="absolute inset-0 w-full h-full object-cover" />
                    
                    {isEditing && (
                      <ImageUploader currentUrl={editImageUrl} onUploaded={setEditImageUrl} />
                    )}

                    {!isEditing && (
                      <div className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-sans font-semibold uppercase tracking-wider ${(m as any).isCustom ? 'bg-[#912A55] text-white' : m.fromDb ? 'bg-[#1C1B1B] text-white' : 'bg-black/40 text-white/80'}`}>
                        {(m as any).isCustom ? 'Custom' : m.fromDb ? 'Modified' : 'Static'}
                      </div>
                    )}
                  </div>

                  {/* Content area */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col justify-between min-w-0">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Title</label>
                          <input
                            autoFocus
                            type="text"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            className="w-full px-3 py-2.5 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-serif text-base italic text-[#1c1b1b] focus:outline-none focus:border-[#912A55] focus:ring-2 focus:ring-[#912A55]/10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Description</label>
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2.5 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#5e5e5d] focus:outline-none focus:border-[#912A55] focus:ring-2 focus:ring-[#912A55]/10 resize-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Aspect Ratio</label>
                          <div className="flex items-center gap-2">
                            {(['square', '4/5', '3/4', '2/3', '9/16'] as const).map(ratio => (
                              <button
                                key={ratio}
                                onClick={() => setEditAspect(ratio)}
                                className={`px-4 py-2 font-sans text-xs uppercase tracking-widest rounded-lg border transition-all ${
                                  editAspect === ratio
                                    ? 'bg-[#912A55] text-white border-[#912A55]'
                                    : 'bg-[#FCF9F8] text-[#5e5e5d] border-[#D9BDD0]/50 hover:border-[#912A55]/50'
                                }`}
                              >
                                {ratio}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button onClick={() => handleSave(m)} disabled={isSaving} className="flex items-center gap-1.5 px-4 py-2 bg-[#912A55] hover:bg-[#B05480] disabled:opacity-50 text-white font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer">
                            {isSaving ? <span className="animate-pulse">Saving…</span> : <><Save className="w-3.5 h-3.5" /> Save</>}
                          </button>
                          <button onClick={cancelEdit} className="flex items-center gap-1.5 px-4 py-2 border border-[#D9BDD0]/50 text-[#5e5e5d] hover:text-[#912A55] font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer">
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                          {(m as any).isCustom && !m.staticId.startsWith('new_') && (
                            <button onClick={() => handleDelete(m.staticId)} className="ml-auto text-red-500 hover:text-red-600 font-sans text-[10px] uppercase tracking-widest font-semibold px-2">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-between h-full gap-3">
                        <div className="space-y-2">
                          <span className="font-sans text-[9px] font-semibold text-[#912A55] uppercase tracking-widest">Cherished Archive</span>
                          <h3 className="font-serif text-lg md:text-xl font-light italic text-[#1c1b1b] leading-snug">{m.caption}</h3>
                          <p className="font-sans text-xs md:text-sm text-[#5e5e5d] leading-relaxed line-clamp-2">{m.description || <span className="italic text-[#5e5e5d]/40">No description yet</span>}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => startEdit(m)} className="flex items-center gap-1.5 px-4 py-2 border border-[#D9BDD0]/50 hover:border-[#912A55]/40 text-[#5e5e5d] hover:text-[#912A55] font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer">
                            <Pencil className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => handleDelete(m.staticId)} className="flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:border-red-400 text-red-400 hover:text-red-600 hover:bg-red-50 font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer transition-all">
                            <X className="w-3 h-3" /> Delete
                          </button>
                          {isSaved && <span className="flex items-center gap-1 font-sans text-xs text-emerald-600 animate-[fadeIn_0.3s_ease-out]"><Check className="w-3.5 h-3.5" /> Saved</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
