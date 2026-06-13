import { useState } from 'react';
import { Check, X, RefreshCw, Filter, Search } from 'lucide-react';
import { BOOKING_REQUESTS } from '@/constants/data';
import type { BookingRequest } from '@/types';
import { toast } from 'sonner';

const statusBadge = (status: string) => {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: '#fef3c7', color: '#d97706', label: 'Pending' },
    approved: { bg: '#dcfce7', color: '#16a34a', label: 'Approved' },
    rejected: { bg: '#fee2e2', color: '#dc2626', label: 'Rejected' },
    rescheduled: { bg: '#ede9fe', color: '#7c3aed', label: 'Rescheduled' },
  };
  const s = map[status] || map.pending;
  return <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
};

const BookingRequests = () => {
  const [requests, setRequests] = useState<BookingRequest[]>(BOOKING_REQUESTS);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = requests.filter(r => {
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.roomNo.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const approve = (id: number) => { setRequests(p => p.map(r => r.id === id ? { ...r, status: 'approved' as const } : r)); toast.success('Booking approved successfully'); };
  const reject = (id: number) => { setRequests(p => p.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r)); toast.error('Booking rejected'); };
  const reschedule = (id: number) => { setRequests(p => p.map(r => r.id === id ? { ...r, status: 'rescheduled' as const } : r)); toast.info('Booking marked for rescheduling'); };

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Booking Requests</h2>
        <p className="text-sm text-slate-500 mt-0.5">Manage all room reservation submissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', count: counts.all, color: '#6366f1', bg: '#eef2ff' },
          { label: 'Pending', count: counts.pending, color: '#d97706', bg: '#fef3c7' },
          { label: 'Approved', count: counts.approved, color: '#16a34a', bg: '#dcfce7' },
          { label: 'Rejected', count: counts.rejected, color: '#dc2626', bg: '#fee2e2' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-4 flex items-center gap-3" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
              <span className="text-lg font-bold" style={{ color }}>{count}</span>
            </div>
            <p className="text-sm font-semibold text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: '1px solid #f0f4f8' }}>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: '#f8fafc', border: '1px solid #e5eaf2' }}>
            <Search size={14} className="text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or room..." className="bg-transparent outline-none text-sm text-slate-600 placeholder-slate-400 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all" style={{ background: filterStatus === s ? '#071224' : '#f0f4f8', color: filterStatus === s ? '#fff' : '#475569', border: filterStatus === s ? '1px solid #071224' : '1px solid #e5eaf2' }}>
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['#', 'Requestor', 'Role', 'Room No', 'Purpose', 'Date', 'Time Slot', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-slate-400">No booking requests found.</td></tr>
              )}
              {filtered.map((r, i) => (
                <tr key={r.id} style={{ borderTop: '1px solid #f0f4f8' }} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5 text-sm text-slate-400">{i + 1}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">{r.name}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: r.role === 'Faculty' ? '#ede9fe' : '#dbeafe', color: r.role === 'Faculty' ? '#7c3aed' : '#1d4ed8' }}>{r.role}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold" style={{ color: '#3b82f6' }}>{r.roomNo}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600 max-w-[140px] truncate">{r.purpose}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600 whitespace-nowrap">{r.timeSlot}</td>
                  <td className="px-4 py-3.5">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3.5">
                    {r.status === 'pending' ? (
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => approve(r.id)} title="Approve" className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:scale-105" style={{ background: '#dcfce7' }}>
                          <Check size={13} className="text-green-700" />
                        </button>
                        <button onClick={() => reject(r.id)} title="Reject" className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:scale-105" style={{ background: '#fee2e2' }}>
                          <X size={13} className="text-red-700" />
                        </button>
                        <button onClick={() => reschedule(r.id)} title="Reschedule" className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:scale-105" style={{ background: '#ede9fe' }}>
                          <RefreshCw size={12} className="text-purple-700" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingRequests;
