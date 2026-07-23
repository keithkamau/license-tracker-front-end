import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import useAuthStore from "../../store/authStore";
import { Skeleton } from "../ui/Skeleton";

export const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className='flex h-screen'>
        <div className='w-64 bg-white border-r border-gray-200 p-6'>
          <Skeleton className='h-8 w-40 mb-8' />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-10 w-full mb-2' />
          ))}
        </div>
        <div className='flex-1 p-6'>
          <Skeleton className='h-16 w-full mb-6' />
          <div className='grid grid-cols-4 gap-4 mb-6'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-24' />
            ))}
          </div>
          <Skeleton className='h-64 w-full' />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-y-auto p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
