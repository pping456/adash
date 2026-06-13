import { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, CheckCheck } from 'lucide-react';
import { NOTIFICATIONS } from '@/constants/data';
import type { ScreenType } from '@/types';

interface TopBarProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

const screenLabels: Record<ScreenType, string> = {
  dashboard: 'Dashboard',
  'room-management': 'Room Management',
  'booking-requests': 'Booking Requests',
  users: 'Users Management',
  departments: 'Departments',
  timetable: 'Timetable Management',
  analytics: 'Analytics',
  settings: 'Settings',
};

const TopBar = ({ activeScreen, onNavigate }: TopBarProps) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const getNotifStyle = (type: string) => {
    if (type === 'conflict') return { bg: '#fef2f2', border: '#fca5a5', icon: '⚠️', iconBg: '#fee2e2' };
    if (type === 'room-status') return { bg: '#f0fdf4', border: '#86efac', icon: '🏢', iconBg: '#dcfce7' };
    return { bg: '#eff6ff', border: '#93c5fd', icon: '📋', iconBg: '#dbeafe' };
  };

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-6"
      style={{ left: 260, height: 64, background: '#fff', borderBottom: '1px solid #e5eaf2', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      {/* Left: Breadcrumb */}
      <div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Admin Panel</p>
        <h1 className="text-base font-semibold text-slate-800 leading-tight">{screenLabels[activeScreen]}</h1>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center gap-2 rounded-lg px-3 py-2 w-72" style={{ background: '#f4f6f9', border: '1px solid #e5eaf2' }}>
        <Search size={15} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none text-sm text-slate-600 placeholder-slate-400 w-full"
        />
      </div>

      {/* Right: Bell + Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setNotifOpen(v => !v)}
            className="relative flex items-center justify-center rounded-full w-9 h-9 transition-colors"
            style={{ background: notifOpen ? '#eff6ff' : '#f4f6f9', border: '1px solid #e5eaf2' }}
          >
            <Bell size={17} className="text-slate-600" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                style={{ background: '#ef4444', minWidth: 18, height: 18, padding: '0 4px' }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {notifOpen && (
            <div
              className="absolute right-0 mt-2 rounded-xl overflow-hidden"
              style={{ width: 380, background: '#fff', border: '1px solid #e5eaf2', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', top: '100%' }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #f0f4f8' }}>
                <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                  <CheckCheck size={13} /> Mark all read
                </button>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 380 }}>
                {notifications.map(n => {
                  const s = getNotifStyle(n.type);
                  return (
                    <div
                      key={n.id}
                      className="flex gap-3 px-4 py-3 transition-colors cursor-pointer"
                      style={{ background: n.read ? '#fff' : s.bg, borderBottom: '1px solid #f0f4f8' }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: s.iconBg }}>
                        {s.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 leading-snug">{n.message}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                      {!n.read && (
                        <span className="flex-shrink-0 w-2 h-2 rounded-full mt-1" style={{ background: '#3b82f6' }} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-3 text-center" style={{ borderTop: '1px solid #f0f4f8' }}>
                <button
                  onClick={() => { onNavigate('booking-requests'); setNotifOpen(false); }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer" style={{ background: '#f4f6f9', border: '1px solid #e5eaf2' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#071224' }}>
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 leading-none">Admin</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Super Administrator</p>
          </div>
          <ChevronDown size={13} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
