import { AlertTriangle } from 'lucide-react';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-[#D9BDD0]/40 bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
              destructive ? 'bg-red-50' : 'bg-[#F4DCEA]'
            }`}
          >
            <AlertTriangle className={`h-5 w-5 ${destructive ? 'text-red-500' : 'text-[#912A55]'}`} />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl font-light italic text-[#1C1B1B]">{title}</h3>
            <p className="font-sans text-sm leading-relaxed text-[#5e5e5d]">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-full border border-[#D9BDD0]/50 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-[#5e5e5d] transition-colors hover:border-[#912A55]/40 hover:text-[#912A55] cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              void onConfirm();
            }}
            className={`rounded-full px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors cursor-pointer ${
              destructive ? 'bg-red-500 hover:bg-red-600' : 'bg-[#912A55] hover:bg-[#B05480]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
