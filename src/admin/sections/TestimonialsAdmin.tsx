import { useEffect, useState } from 'react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '../../lib/cms';
import { Testimonial } from '../../types';
import ConfirmModal from '../components/ConfirmModal';
import ImageUploader from '../components/ImageUploader';
import { Pencil, Check, X, RefreshCw, Save, Plus, Trash2, Camera } from 'lucide-react';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editQuote, setEditQuote] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'save' | 'delete' | null>(null);
  const [pendingTestimonial, setPendingTestimonial] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    setTestimonials(await getTestimonials());
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setEditName(t.name);
    setEditQuote(t.quote);
    setEditPhotoUrl(t.photoUrl || '');
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditQuote('');
    setEditPhotoUrl('');
    setError('');
  };

  const handleSave = async (t: Testimonial) => {
    if (!editName.trim() || !editQuote.trim()) {
      setError('Guest name and quote are required.');
      return;
    }
    setError('');
    setSavingId(t.id);

    try {
      const isNew = t.id.startsWith('new_');
      await saveTestimonial({
        id: isNew ? undefined : t.id,
        name: editName.trim(),
        quote: editQuote.trim(),
        photoUrl: editPhotoUrl || undefined,
        sortOrder: testimonials.findIndex((item) => item.id === t.id),
      });

      await fetchTestimonials();
      setSavingId(null);
      if (!isNew) {
        setSavedId(t.id);
        setTimeout(() => setSavedId(null), 2000);
      }
      cancelEdit();
    } catch (err: any) {
      setError(err.message);
      setSavingId(null);
    }
    setConfirmOpen(false);
    setPendingAction(null);
    setPendingTestimonial(null);
  };

  const handleAddNew = () => {
    const newId = `new_${Date.now()}`;
    const newTestimonial: Testimonial = {
      id: newId,
      name: '',
      quote: '',
    };
    setTestimonials([newTestimonial, ...testimonials]);
    startEdit(newTestimonial);
  };

  const handleSaveClick = (t: Testimonial) => {
    if (!editName.trim() || !editQuote.trim()) {
      setError('Guest name and quote are required.');
      return;
    }
    setPendingAction('save');
    setPendingTestimonial(t);
    setConfirmOpen(true);
  };

  const requestDeleteConfirmation = (t: Testimonial) => {
    setPendingAction('delete');
    setPendingTestimonial(t);
    setConfirmOpen(true);
  };

  const proceedWithPendingAction = async () => {
    if (!pendingTestimonial) return;

    if (pendingAction === 'delete') {
      try {
        await deleteTestimonial(pendingTestimonial.id);
        await fetchTestimonials();
      } catch (err: any) {
        setError(err.message);
      }
    } else if (pendingAction === 'save') {
      await handleSave(pendingTestimonial);
    }

    setConfirmOpen(false);
    setPendingAction(null);
    setPendingTestimonial(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-light italic text-[#1C1B1B]">Testimonials</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTestimonials}
            disabled={loading}
            className="p-2 text-[#5e5e5d] hover:text-[#912A55] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleAddNew}
            disabled={editingId !== null}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#912A55] hover:bg-[#B05480] disabled:opacity-50 text-white font-sans text-xs font-medium uppercase tracking-widest rounded-full transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add New
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
          <span className="font-sans text-sm">Loading testimonials…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => {
            const isEditing = editingId === t.id;
            const isSaving = savingId === t.id;
            const isSaved = savedId === t.id;
            const isNew = t.id.startsWith('new_');
            const currentPhoto = isEditing ? editPhotoUrl : t.photoUrl || '';
            const initials = (isEditing ? editName : t.name).trim().charAt(0).toUpperCase();

            return (
              <div
                key={t.id}
                className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${
                  isEditing ? 'border-[#912A55]/50 shadow-md ring-1 ring-[#912A55]/20' : 'border-[#D9BDD0]/30'
                }`}
              >
                {isEditing ? (
                  <div className="p-5 md:p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-[#F4DCEA] flex items-center justify-center text-[#912A55] font-serif italic text-2xl border border-[#D9BDD0]/30">
                        {currentPhoto ? (
                          <img src={currentPhoto} alt={editName} className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-5 h-5 text-[#912A55]/60" />
                        )}
                        <ImageUploader
                          bucket="testimonial-photos"
                          currentUrl={currentPhoto}
                          onUploaded={setEditPhotoUrl}
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Guest Name</label>
                        <input
                          autoFocus
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="E.g. John & Jane"
                          className="w-full px-3 py-2.5 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#1c1b1b] focus:outline-none focus:border-[#912A55] focus:ring-1 focus:ring-[#912A55]/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Quote</label>
                      <textarea
                        value={editQuote}
                        onChange={(e) => setEditQuote(e.target.value)}
                        rows={4}
                        placeholder="What did they say?"
                        className="w-full px-3 py-2.5 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#5e5e5d] focus:outline-none focus:border-[#912A55] focus:ring-1 focus:ring-[#912A55]/50 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleSaveClick(t)}
                          disabled={isSaving}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#912A55] hover:bg-[#B05480] disabled:opacity-50 text-white font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer"
                        >
                          {isSaving ? (
                            <span className="animate-pulse">Saving…</span>
                          ) : (
                            <><Save className="w-3.5 h-3.5" /> Save</>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (isNew && editName.trim() === '' && editQuote.trim() === '') {
                              setTestimonials(testimonials.filter((item) => item.id !== t.id));
                            }
                            cancelEdit();
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 border border-[#D9BDD0]/50 text-[#5e5e5d] hover:text-[#912A55] font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                        {!isNew && (
                          <button
                            onClick={() => requestDeleteConfirmation(t)}
                            className="ml-auto text-red-500 hover:text-red-600 font-sans text-[10px] uppercase tracking-widest font-semibold px-2 cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 md:p-6 flex flex-col h-full">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        {t.photoUrl ? (
                          <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#D9BDD0]/30 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#F4DCEA] flex items-center justify-center text-[#912A55] font-serif italic text-lg flex-shrink-0">
                            {initials}
                          </div>
                        )}
                        <h3 className="font-sans text-sm font-semibold text-[#1c1b1b]">{t.name}</h3>
                      </div>

                      <div className="bg-[#FCF9F8] p-4 rounded-xl border border-[#D9BDD0]/20 relative">
                        <p className="font-sans text-sm text-[#5e5e5d] leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D9BDD0]/20">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(t)}
                          className="flex items-center gap-1.5 px-4 py-2 border border-[#D9BDD0]/50 hover:border-[#912A55]/40 text-[#5e5e5d] hover:text-[#912A55] font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        {isSaved && (
                          <span className="flex items-center gap-1 font-sans text-xs text-emerald-600 animate-[fadeIn_0.3s_ease-out]">
                            <Check className="w-3.5 h-3.5" /> Saved
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => requestDeleteConfirmation(t)}
                        className="p-2 text-[#5e5e5d]/60 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && testimonials.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-[#D9BDD0]/50 rounded-2xl">
          <p className="font-sans text-sm text-[#5e5e5d]">No testimonials found. Add one to get started!</p>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        title={pendingAction === 'delete' ? 'Delete this testimonial?' : 'Save changes?'}
        message={pendingAction === 'delete' ? 'Are you sure you want to delete this testimonial?' : 'Are you sure you want to save these changes?'}
        confirmLabel={pendingAction === 'delete' ? 'Yes, delete' : 'Yes'}
        cancelLabel="No"
        destructive={pendingAction === 'delete'}
        onConfirm={proceedWithPendingAction}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingAction(null);
          setPendingTestimonial(null);
        }}
      />
    </div>
  );
}
