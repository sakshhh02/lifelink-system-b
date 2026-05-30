import { useLocation } from 'react-router-dom';
import { Bell, HelpCircle, Search } from 'lucide-react';
import { getPageTitle } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function TopBar() {
  const { pathname } = useLocation();
  const { showToast } = useToast();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-6 border-b border-border bg-surface px-8">
      <h2 className="min-w-[200px] text-lg font-semibold text-text">
        {getPageTitle(pathname)}
      </h2>

      <div className="relative mx-auto max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="Search documents, shares..."
          onKeyDown={(e) => {
            if (e.key.length === 1 || e.key === 'Backspace') {
              showToast('Search available in full version', 'info');
            }
          }}
          className="w-full rounded-2xl border border-border bg-background py-2 pl-10 pr-4 text-sm text-text placeholder:text-muted transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-xl p-2 text-muted transition duration-200 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-xl p-2 text-muted transition duration-200 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white"
          title={user?.name}
        >
          {user?.initials || 'LL'}
        </div>
      </div>
    </header>
  );
}
