import { businessInfo, whatsappPlaceholderHref } from "@/lib/site";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappPlaceholderHref}
      aria-label="Iniciar conversación por WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:h-12 sm:min-w-12 sm:px-3"
      title={`WhatsApp ${businessInfo.contact.phoneDisplay}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12.04 2C6.51 2 2.03 6.48 2.03 12c0 1.77.46 3.5 1.34 5.02L2 22l5.12-1.34A9.97 9.97 0 0 0 12.04 22c5.53 0 10.01-4.48 10.01-10S17.57 2 12.04 2Zm0 18.18c-1.55 0-3.06-.41-4.39-1.18l-.31-.18-3.04.8.81-2.96-.2-.31A8.15 8.15 0 0 1 3.86 12a8.18 8.18 0 1 1 8.18 8.18Zm4.49-6.13c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.16.25-.64.81-.78.98-.14.16-.29.18-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.41h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.56 4.06 3.59.57.25 1.01.4 1.36.51.57.18 1.09.15 1.5.09.46-.07 1.47-.6 1.68-1.18.21-.57.21-1.06.15-1.18-.06-.12-.23-.19-.48-.31Z" />
      </svg>
      <span className="hidden text-xs font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
