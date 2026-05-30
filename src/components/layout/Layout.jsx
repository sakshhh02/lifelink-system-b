import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div className="min-h-screen min-w-[1280px] bg-background">
      <Sidebar />
      <div className="ml-[260px]">
        <TopBar />
        <main className="animate-fade-in p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
