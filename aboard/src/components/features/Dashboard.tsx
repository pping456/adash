import { Building2, CalendarCheck, Clock, AlertTriangle } from 'lucide-react';
import type { ScreenType } from '@/types';

interface DashboardProps {
  onNavigate: (screen: ScreenType) => void;
}

const StatCard = ({ icon: Icon, iconBg, value, label, sub, action, onAction }: {
  icon: React.ElementType; iconBg: string; value: string | number; label: string; sub?: string; action?: string; onAction?: () => void;
}) => (
  <div className="bg-white rounded-xl p-5 flex items-start gap-4" style={{ border: '1px solid #e5eaf2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
      <Icon size={22} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm font-medium text-slate-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      {action && onAction && (
        <button onClick={onAction} className="mt-2 text-xs font-semibold px-3 py-1 rounded-lg text-white transition-colors" style={{ background: '#3b82f6' }}>
          {action}
        </button>
      )}
    </div>
  </div>
);

const Dashboard = ({ onNavigate }: DashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Welcome back, Admin! 👋</h2>
        <p className="text-sm text-slate-500 mt-1">Here's an overview of today's room booking system.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Building2} iconBg="#6366f1" value={23} label="Total Rooms" sub="All Blocks" />
        <StatCard icon={CalendarCheck} iconBg="#3b82f6" value={18} label="Today's Bookings" sub="All Rooms" />
        <StatCard icon={Clock} iconBg="#f59e0b" value={7} label="Pending Requests" sub="Approval" action="View" onAction={() => onNavigate('booking-requests')} />
        <StatCard icon={AlertTriangle} iconBg="#ef4444" value={3} label="Conflicts" sub="Need Attention" action="View" onAction={() => onNavigate('booking-requests')} />
      </div>
    </div>
  );
};

export default Dashboard;
