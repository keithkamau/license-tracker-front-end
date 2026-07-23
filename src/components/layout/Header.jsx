import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { getInitials } from "../../utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { notificationService } from "../../services/notifications";

export const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: unreadData } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: () => notificationService.getUnreadCount(),
    refetchInterval: 30000,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6'>
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>
          Welcome, {user?.first_name}
        </h2>
      </div>

      <div className='flex items-center gap-4'>
        <Link
          to='/notifications'
          className='relative p-2 rounded-lg hover:bg-gray-50 text-gray-500'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
            />
          </svg>
          {unreadData?.unread_count > 0 && (
            <span className='absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
              {unreadData.unread_count}
            </span>
          )}
        </Link>

        <div className='relative' ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50'
          >
            <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
              <span className='text-white text-sm font-medium'>
                {getInitials(user?.first_name, user?.last_name)}
              </span>
            </div>
            <div className='text-left hidden sm:block'>
              <p className='text-sm font-medium text-gray-700'>
                {user?.first_name} {user?.last_name}
              </p>
              <p className='text-xs text-gray-500 capitalize'>{user?.role}</p>
            </div>
          </button>

          {isOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
              <button
                onClick={handleLogout}
                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
