import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../lib/supabase";
import { CalendarEvent } from "../../types";
import { RefreshCw, MapPin, Search, Filter, ArrowUpDown, Upload, X } from "lucide-react";
import imageCompression from 'browser-image-compression';

export default function EventsAdmin() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "upcoming" | "past">(
    "all",
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [mediaModalEventId, setMediaModalEventId] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("calendar_events")
        .select("id, date, title, location, event_type, type, media_urls")
        .not("gcal_event_id", "is", null)
        .order("date", { ascending: false });

      if (error) throw error;

      const mapped = (data ?? []).map((row: any) => ({
        id: row.id,
        date: row.date,
        title: row.title,
        location: row.location ?? "",
        eventType: row.event_type,
        type: row.type,
        media_urls: row.media_urls || [],
      }));
      setEvents(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, eventId: string, currentMedia: string[]) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingId(eventId);
    setError("");

    try {
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        const fileExt = file.name.split('.').pop() || '';

        // Prevent multiple videos
        if (fileExt.match(/(mp4|webm|ogg|mov)/i)) {
          const hasVideo = currentMedia.some(url => url.match(/\.(mp4|webm|ogg|mov)$/i)) || newUrls.some(url => url.match(/\.(mp4|webm|ogg|mov)$/i));
          if (hasVideo) {
            setError("You can only upload a maximum of 1 video per event.");
            continue;
          }
        }

        if (file.type.startsWith('image/')) {
          try {
            const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1920, useWebWorker: true };
            file = await imageCompression(file, options);
          } catch (error) {
            console.warn("Compression failed", error);
          }
        }

        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${eventId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("events")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("events")
          .getPublicUrl(filePath);

        newUrls.push(publicUrlData.publicUrl);
      }

      const updatedMedia = [...currentMedia, ...newUrls];

      const { error: updateError } = await supabase
        .from("calendar_events")
        .update({ media_urls: updatedMedia })
        .eq("id", eventId);

      if (updateError) throw updateError;

      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === eventId ? { ...evt, media_urls: updatedMedia } : evt
        )
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingId(null);
      e.target.value = '';
    }
  };

  const handleDeleteMedia = async (eventId: string, mediaUrl: string, currentMedia: string[]) => {
    try {
      const urlParts = mediaUrl.split("/events/");
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        const { error: removeError } = await supabase.storage
          .from("events")
          .remove([filePath]);
        if (removeError) console.error("Error removing from storage:", removeError);
      }

      const updatedMedia = currentMedia.filter((url) => url !== mediaUrl);

      const { error: updateError } = await supabase
        .from("calendar_events")
        .update({ media_urls: updatedMedia })
        .eq("id", eventId);

      if (updateError) throw updateError;

      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === eventId ? { ...evt, media_urls: updatedMedia } : evt
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const displayedEvents = useMemo(() => {
    return [...events]
      .filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((e) => (filterType === "all" ? true : e.type === filterType))
      .filter((e) => {
        if (!startDate && !endDate) return true;
        try {
          const eventDateStr = new Date(e.date).toISOString().split("T")[0];
          if (startDate && eventDateStr < startDate) return false;
          if (endDate && eventDateStr > endDate) return false;
          return true;
        } catch {
          return true; // fallback if date is invalid
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [events, searchQuery, filterType, startDate, endDate, sortOrder]);

  const todayStr = new Date().toISOString().split("T")[0];
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const lastWeekStr = lastWeekDate.toISOString().split("T")[0];

  const thisWeekEvents = displayedEvents.filter(e => e.date >= lastWeekStr && e.date <= todayStr);
  const otherEvents = displayedEvents.filter(e => e.date < lastWeekStr || e.date > todayStr);

  const renderEventCard = (evt: CalendarEvent) => (
              <div
                key={evt.id}
                className="bg-white p-5 rounded-2xl border border-[#D9BDD0]/30 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-lg font-semibold text-[#1c1b1b] leading-tight">
                      {evt.title}
                    </h3>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${
                          evt.type === "past"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-[#F4DCEA] text-[#912A55]"
                        }`}
                      >
                        {evt.type}
                      </span>
                      {evt.eventType && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-medium uppercase tracking-wider bg-[#eae7e7] text-[#5e5e5d]">
                          {evt.eventType}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-sans text-xs text-[#912A55] uppercase tracking-widest font-semibold">
                      {new Date(evt.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    {evt.location && (
                      <div className="flex items-start gap-1.5 text-xs text-[#5e5e5d] font-sans pt-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D9BDD0]" />
                        <span className="line-clamp-2">{evt.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Manage Media Button */}
                  <div className="pt-4 border-t border-[#D9BDD0]/20">
                    <button
                      onClick={() => setMediaModalEventId(evt.id)}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-[#FCF9F8] border border-[#D9BDD0]/50 hover:bg-[#F4DCEA] hover:border-[#D9BDD0] rounded-xl text-[#5e5e5d] hover:text-[#912A55] transition-all group cursor-pointer"
                    >
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider">
                        Manage Highlights
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs bg-white px-2 py-0.5 rounded-full border border-[#D9BDD0]/30 shadow-sm">
                          {evt.media_urls?.length || 0}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-light italic text-[#1C1B1B]">
            Event Highlights
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchEvents}
            disabled={loading}
            className="p-2 text-[#5e5e5d] hover:text-[#912A55] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-[#D9BDD0]/30 shadow-sm">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#D9BDD0]" />
          </div>
          <input
            type="text"
            placeholder="Search events by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm focus:outline-none focus:border-[#912A55] focus:ring-1 focus:ring-[#912A55] transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          {/* Filter */}
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-[#D9BDD0]" />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="pl-10 pr-8 py-2 appearance-none border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#5e5e5d] focus:outline-none focus:border-[#912A55] focus:ring-1 focus:ring-[#912A55] transition-all cursor-pointer"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] pr-2 transition-all focus-within:border-[#912A55] focus-within:ring-1 focus-within:ring-[#912A55]">
            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => {
                const val = e.target.value;
                setStartDate(val);
                if (val && endDate) {
                  const [y, m, d] = val.split('-');
                  const maxEnd = new Date(Number(y), Number(m), Number(d));
                  const maxEndStr = `${maxEnd.getFullYear()}-${String(maxEnd.getMonth() + 1).padStart(2, '0')}-${String(maxEnd.getDate()).padStart(2, '0')}`;
                  if (endDate > maxEndStr) {
                    setEndDate(maxEndStr);
                  }
                }
              }}
              className="pl-3 py-2 bg-transparent font-sans text-sm text-[#5e5e5d] focus:outline-none cursor-pointer rounded-l-lg"
              title="Start Date"
            />
            <span className="text-[#D9BDD0] font-sans text-[10px] uppercase font-semibold">To</span>
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              max={startDate ? (() => {
                const [y, m, d] = startDate.split('-');
                const dObj = new Date(Number(y), Number(m), Number(d));
                return `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, '0')}-${String(dObj.getDate()).padStart(2, '0')}`;
              })() : undefined}
              onChange={(e) => {
                const val = e.target.value;
                setEndDate(val);
                if (val && startDate) {
                  const [y, m, d] = val.split('-');
                  const minStart = new Date(Number(y), Number(m) - 2, Number(d));
                  const minStartStr = `${minStart.getFullYear()}-${String(minStart.getMonth() + 1).padStart(2, '0')}-${String(minStart.getDate()).padStart(2, '0')}`;
                  if (startDate < minStartStr) {
                    setStartDate(minStartStr);
                  }
                }
              }}
              className="py-2 bg-transparent font-sans text-sm text-[#5e5e5d] focus:outline-none cursor-pointer"
              title="End Date (Max 1 month from start)"
            />
            {(startDate || endDate) && (
              <button
                onClick={() => { setStartDate(""); setEndDate(""); }}
                className="text-[#D9BDD0] hover:text-[#912A55] p-1 ml-1 transition-colors"
                title="Clear date filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
            }
            className="flex items-center gap-2 px-4 py-2 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] hover:bg-[#F4DCEA] hover:text-[#912A55] text-[#5e5e5d] font-sans text-sm transition-all cursor-pointer"
            title={`Sort by Date: ${sortOrder === "desc" ? "Newest first" : "Oldest first"}`}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline whitespace-nowrap">
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </span>
          </button>
        </div>
      </div>

      {error && !mediaModalEventId && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl font-sans text-xs">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-[#5e5e5d]">
          <div className="w-5 h-5 border-2 border-[#912A55]/20 border-t-[#912A55] rounded-full animate-spin" />
          <span className="font-sans text-sm">Loading events...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {displayedEvents.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-[#D9BDD0]/30 text-center">
              <p className="text-[#5e5e5d] font-sans text-sm">
                No events found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {thisWeekEvents.length > 0 && (
                <div className="space-y-4">
                  <div className="border-b border-[#D9BDD0]/30 pb-2">
                    <h3 className="font-serif text-2xl text-[#1c1b1b]">
                      Past 7 Days
                    </h3>
                    <p className="font-sans text-xs text-[#5e5e5d] mt-1">
                      Events from the last 7 days will be prioritized and shown first on the public viewer.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {thisWeekEvents.map(renderEventCard)}
                  </div>
                </div>
              )}

              {otherEvents.length > 0 && (
                <div className="space-y-4">
                  {thisWeekEvents.length > 0 && (
                    <div className="border-b border-[#D9BDD0]/30 pb-2">
                      <h3 className="font-serif text-2xl text-[#1c1b1b]">
                        All Other Events
                      </h3>
                      <p className="font-sans text-xs text-[#5e5e5d] mt-1">
                        Older or upcoming events that appear after the recent highlights.
                      </p>
                    </div>
                  )}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {otherEvents.map(renderEventCard)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Media Modal */}
      {mediaModalEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          {(() => {
            const currentEvent = events.find((e) => e.id === mediaModalEventId);
            if (!currentEvent) return null;

            return (
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-[#D9BDD0]/30">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1c1b1b]">
                      Manage Highlights
                    </h3>
                    <p className="font-sans text-sm text-[#5e5e5d] mt-1">
                      {currentEvent.title}
                    </p>
                  </div>
                  <button
                    onClick={() => setMediaModalEventId(null)}
                    className="p-2 text-[#5e5e5d] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FCF9F8]">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl font-sans text-xs">
                      {error}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm font-medium text-[#5e5e5d]">
                      {currentEvent.media_urls?.length || 0} items uploaded
                    </span>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#912A55] hover:bg-[#7a2246] text-white transition-colors shadow-sm">
                      {uploadingId === currentEvent.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span className="font-sans text-xs uppercase font-bold tracking-wider">
                        Upload Files
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="hidden"
                        disabled={uploadingId === currentEvent.id}
                        onChange={(e) => handleFileUpload(e, currentEvent.id, currentEvent.media_urls || [])}
                      />
                    </label>
                  </div>

                  {currentEvent.media_urls && currentEvent.media_urls.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-start">
                      {currentEvent.media_urls.map((url, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm flex items-center justify-center">
                          {url.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                            <video src={url} controls className="w-full h-auto" />
                          ) : (
                            <img src={url} alt="" className="w-full h-auto" />
                          )}
                          <button
                            onClick={() => handleDeleteMedia(currentEvent.id, url, currentEvent.media_urls!)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-full shadow-md transition-colors cursor-pointer"
                            title="Delete media"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-[#D9BDD0]/30 border-dashed">
                      <Upload className="w-8 h-8 text-[#D9BDD0] mx-auto mb-3" />
                      <p className="text-[#5e5e5d] font-sans text-sm">No media uploaded yet.</p>
                      <p className="text-[#D9BDD0] font-sans text-xs mt-1">Upload images or videos to feature them.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
