import { NavLink } from "react-router-dom";
import { classNames } from "../../utils/helpers";
import useAuthStore from "../../store/authStore";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
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
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1'
        />
      </svg>
    ),
    roles: ["admin", "hr"],
  },
  {
    label: "Licenses",
    path: "/licenses",
    icon: (
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
          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        />
      </svg>
    ),
    roles: ["admin", "hr"],
  },
  {
    label: "Users",
    path: "/users",
    icon: (
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
          d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
        />
      </svg>
    ),
    roles: ["admin", "hr"],
  },
  {
    label: "My License",
    path: "/my-license",
    icon: (
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
          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        />
      </svg>
    ),
    roles: ["agent"],
  },
];

export const Sidebar = () => {
  const { user } = useAuthStore();

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(user?.role),
  );

  return (
    <aside className='w-64 bg-white border-r border-gray-200 min-h-screen'>
      <div className='p-6'>
        <h1 className='text-xl font-bold text-primary'>LicenseTracker</h1>
      </div>
      <nav className='px-3'>
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              classNames(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors duration-200",
                isActive
                  ? "bg-blue-50 text-primary font-medium"
                  : "text-gray-600 hover:bg-gray-50",
              )
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
