export const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

export const CardSkeleton = () => {
  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6'>
      <div className='flex items-center gap-4 mb-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='flex-1'>
          <Skeleton className='h-4 w-3/4 mb-2' />
          <Skeleton className='h-3 w-1/2' />
        </div>
      </div>
      <Skeleton className='h-3 w-full mb-2' />
      <Skeleton className='h-3 w-5/6' />
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
      <div className='p-4 border-b border-gray-200'>
        <Skeleton className='h-8 w-full' />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className='flex gap-4 p-4 border-b border-gray-100'>
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className='h-4 flex-1' />
          ))}
        </div>
      ))}
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='bg-white rounded-xl border border-gray-200 p-6'>
          <Skeleton className='h-3 w-20 mb-3' />
          <Skeleton className='h-8 w-16 mb-2' />
          <Skeleton className='h-3 w-12' />
        </div>
      ))}
    </div>
  );
};
