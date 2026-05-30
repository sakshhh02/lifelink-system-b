import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Lock,
  ShieldCheck,
  Share2,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/vault', label: 'Vault', icon: Lock },
  { to: '/verify', label: 'Verify', icon: ShieldCheck },
  { to: '/share', label: 'Share', icon: Share2 },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[260px] flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-6 py-6">
        <h1 className="text-xl font-bold text-primary">LifeLink</h1>
        <p className="text-sm text-muted">Institutional Identity</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isActive
                  ? 'border-l-[3px] border-primary bg-accent pl-[9px] text-primary'
                  : 'border-l-[3px] border-transparent text-muted hover:bg-gray-50 hover:text-primary'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-3 py-4 space-y-1">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition duration-200 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Settings className="h-5 w-5" />
          Settings
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition duration-200 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <HelpCircle className="h-5 w-5" />
          Support
        </button>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger transition duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
