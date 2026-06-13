import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import Dashboard from '@/components/features/Dashboard';
import RoomManagement from '@/components/features/RoomManagement';
import BookingRequests from '@/components/features/BookingRequests';
import UsersManagement from '@/components/features/UsersManagement';
import Departments from '@/components/features/Departments';
import TimetableManagement from '@/components/features/TimetableManagement';
import Analytics from '@/components/features/Analytics';
import Settings from '@/components/features/Settings';
import type { ScreenType } from '@/types';
import { BOOKING_REQUESTS } from '@/constants/data';

const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 64;

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const pendingCount = BOOKING_REQUESTS.filter(r => r.status === 'pending').length;

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <Dashboard onNavigate={setActiveScreen} />;
      case 'room-management': return <RoomManagement />;
      case 'booking-requests': return <BookingRequests />;
      case 'users': return <UsersManagement />;
      case 'departments': return <Departments />;
      case 'timetable': return <TimetableManagement />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      default: return <Dashboard onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#f4f6f9' }}>
      <Sidebar active={activeScreen} onNavigate={setActiveScreen} pendingCount={pendingCount} />
      <TopBar activeScreen={activeScreen} onNavigate={setActiveScreen} />

      {/* Main content */}
      <main
        className="min-h-screen"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          paddingTop: TOPBAR_HEIGHT,
        }}
      >
        <div className="p-6">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default Index;
