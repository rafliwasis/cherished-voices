import { useState } from 'react';
import { TESTIMONIALS } from '../../data';
import { Testimonial } from '../../types';
import { Pencil, Check, X, Save, Plus, Trash2 } from 'lucide-react';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Form states
  const [editQuote, setEditQuote] = setEditQuoteWrapper('');
  const [editAuthor, setEditAuthor] = setEditAuthorWrapper('');
  const [editAvatar, setEditAvatar] = setEditAvatarWrapper('');

  // Wrapper functions just for typing correctly with useState hooks without complex unions
  function setEditQuoteWrapper(val: string) {
      return useState<string>(val);
  }
  function setEditAuthorWrapper(val: string) {
      return useState<string>(val);
  }
  function setEditAvatarWrapper(val: string) {
      return useState<string>(val);
  }

  // We actually need normal useState for the forms:
  const [quoteInput, setQuoteInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');


  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setQuoteInput(t.quote);
    setAuthorInput(t.author);
    setAvatarInput(t.avatar || '');
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setQuoteInput('');
    setAuthorInput('');
    setAvatarInput('');
    setError('');
  };

  const saveToServer = async (newTestimonials: Testimonial[], successId: string) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/save-testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonials)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save testimonials');
      }
      setTestimonials(newTestimonials);
      setSavedId(successId);
      setTimeout(() => setSavedId(null), 2000);
      cancelEdit();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (id: string) => {
    if (!quoteInput.trim() || !authorInput.trim()) {
      setError('Quote and Author are required.');
      return;
    }

    const updated = testimonials.map(t => 
      t.id === id 
        ? { ...t, quote: quoteInput, author: authorInput, avatar: avatarInput } 
        : t
    );

    // If it's a completely new one that hasn't been added to the array yet
    if (!testimonials.find(t => t.id === id)) {
       updated.unshift({
           id,
           quote: quoteInput,
           author: authorInput,
           avatar: avatarInput
       });
    }

    await saveToServer(updated, id);
  };

  const handleAddNew = () => {
    const newId = `t${Date.now()}`;
    const newTestimonial: Testimonial = {
      id: newId,
      quote: '',
      author: '',
      avatar: 'https://ui-avatars.com/api/?name=New+Client&background=912A55&color=fff&size=64'
    };
    
    // Add to top of list temporarily while editing
    setTestimonials([newTestimonial, ...testimonials]);
    startEdit(newTestimonial);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    const updated = testimonials.filter(t => t.id !== id);
    await saveToServer(updated, 'deleted');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-light italic text-[#1C1B1B]">Testimonials</h2>
        </div>
        <div className="flex items-center gap-3">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => {
          const isEditing = editingId === t.id;
          const isSaving = saving && isEditing;
          const isSaved = savedId === t.id;

          return (
            <div key={t.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${isEditing ? 'border-[#912A55]/50 shadow-md ring-1 ring-[#912A55]/20' : 'border-[#D9BDD0]/30'}`}>
              
              {isEditing ? (
                <div className="p-5 md:p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Author Name</label>
                    <input
                      autoFocus
                      type="text"
                      value={authorInput}
                      onChange={(e) => setAuthorInput(e.target.value)}
                      placeholder="E.g. John & Jane"
                      className="w-full px-3 py-2.5 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#1c1b1b] focus:outline-none focus:border-[#912A55] focus:ring-1 focus:ring-[#912A55]/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Quote</label>
                    <textarea
                      value={quoteInput}
                      onChange={(e) => setQuoteInput(e.target.value)}
                      rows={4}
                      placeholder="What did they say?"
                      className="w-full px-3 py-2.5 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#5e5e5d] focus:outline-none focus:border-[#912A55] focus:ring-1 focus:ring-[#912A55]/50 resize-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest">Avatar URL</label>
                    <input
                      type="text"
                      value={avatarInput}
                      onChange={(e) => setAvatarInput(e.target.value)}
                      placeholder="https://ui-avatars.com/..."
                      className="w-full px-3 py-2.5 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-xs text-[#5e5e5d] focus:outline-none focus:border-[#912A55] focus:ring-1 focus:ring-[#912A55]/50"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleSave(t.id)} disabled={isSaving} className="flex items-center gap-1.5 px-4 py-2 bg-[#912A55] hover:bg-[#B05480] disabled:opacity-50 text-white font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer">
                        {isSaving ? <span className="animate-pulse">Saving…</span> : <><Save className="w-3.5 h-3.5" /> Save</>}
                      </button>
                      <button onClick={() => {
                        // If cancelling a completely new one, remove it from list
                        if (t.quote === '' && t.author === '') {
                          setTestimonials(testimonials.filter(item => item.id !== t.id));
                        }
                        cancelEdit();
                      }} className="flex items-center gap-1.5 px-4 py-2 border border-[#D9BDD0]/50 text-[#5e5e5d] hover:text-[#912A55] font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer">
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 md:p-6 flex flex-col h-full">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                       <div className="flex items-center gap-3">
                         {t.avatar ? (
                           <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-[#D9BDD0]/30" />
                         ) : (
                           <div className="w-10 h-10 rounded-full bg-[#F4DCEA] flex items-center justify-center text-[#912A55] font-serif italic text-lg">
                             {t.author.charAt(0)}
                           </div>
                         )}
                         <div>
                           <h3 className="font-sans text-sm font-semibold text-[#1c1b1b]">{t.author}</h3>
                           <span className="font-sans text-[10px] text-[#912A55] uppercase tracking-widest">ID: {t.id}</span>
                         </div>
                       </div>
                    </div>
                    
                    <div className="bg-[#FCF9F8] p-4 rounded-xl border border-[#D9BDD0]/20 relative">
                       <p className="font-sans text-sm text-[#5e5e5d] leading-relaxed italic">
                         "{t.quote}"
                       </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D9BDD0]/20">
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(t)} className="flex items-center gap-1.5 px-4 py-2 border border-[#D9BDD0]/50 hover:border-[#912A55]/40 text-[#5e5e5d] hover:text-[#912A55] font-sans text-xs font-medium uppercase tracking-widest rounded-full cursor-pointer transition-colors">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      {isSaved && <span className="flex items-center gap-1 font-sans text-xs text-emerald-600 animate-[fadeIn_0.3s_ease-out]"><Check className="w-3.5 h-3.5" /> Saved</span>}
                    </div>
                    
                    <button onClick={() => handleDelete(t.id)} className="p-2 text-[#5e5e5d]/60 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer" title="Delete Testimonial">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {testimonials.length === 0 && (
         <div className="text-center py-12 border-2 border-dashed border-[#D9BDD0]/50 rounded-2xl">
            <p className="font-sans text-sm text-[#5e5e5d]">No testimonials found. Add one to get started!</p>
         </div>
      )}
    </div>
  );
}
