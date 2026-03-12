import { businessInfo } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <p className="font-medium text-slate-900">{businessInfo.brand}</p>
        <p>{businessInfo.tagline}</p>
        <p>
          Zona de cobertura: {businessInfo.serviceArea} · WhatsApp: {businessInfo.phoneDisplay}
        </p>
      </div>
    </footer>
  );
}
