export default function SchoolDashboard() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
        <h1 className="text-2xl font-bold text-[#17395c]">Schools</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of registered schools and quick actions</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-b from-white to-slate-50 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-semibold">Total Schools</div>
            <div className="text-2xl font-extrabold text-[#17395c] mt-1">—</div>
          </div>
          <div className="p-4 bg-gradient-to-b from-white to-slate-50 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-semibold">Active</div>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">—</div>
          </div>
          <div className="p-4 bg-gradient-to-b from-white to-slate-50 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-semibold">Inactive</div>
            <div className="text-2xl font-extrabold text-rose-600 mt-1">—</div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-slate-500">Use the menu to view detailed school lists and manage entries.</p>
        </div>
      </div>
    </div>
  );
}