export function WhatsAppFloatingButton() {
  return (
    <button
      type="button"
      aria-label="Abrir WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <span className="text-xl" aria-hidden>
        W
      </span>
    </button>
  );
}
