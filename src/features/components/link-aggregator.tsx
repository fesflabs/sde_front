import { ClipboardCheck, Star, HeartHandshake } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SaaSButton({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative flex h-20 items-center px-6">
        <Icon
          size={100}
          strokeWidth={1}
          className="absolute -top-2 -right-4 rotate-5 stroke-slate-100 opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:rotate-8"
        />

        <span className="relative z-10 flex-grow text-left text-lg font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
          {label}
        </span>

        <span className="relative z-10 text-xl text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-700">
          →
        </span>
      </div>
    </a>
  );
}

export function LinkAggregator() {
  return (
    <div className="flex w-full flex-1 flex-col space-y-4">
      <SaaSButton
        href="https://forms.office.com/r/iMUPQsqJqP"
        icon={ClipboardCheck}
        label="Lista de Presença"
      />

      <SaaSButton href="https://forms.office.com/r/7JMx0XmVRX" icon={Star} label="Avaliação" />

      <SaaSButton
        href="https://forms.office.com/r/QL3UwtMTST"
        icon={HeartHandshake}
        label="Solicitação de Acolhimento"
      />
    </div>
  );
}
