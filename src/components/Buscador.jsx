import { Search } from 'lucide-react';

export function Buscador({ placeholder = "Buscar...", value, onChange }) {
  return (
    <div className="mb-6">
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}