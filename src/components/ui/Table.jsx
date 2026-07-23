import { TableSkeleton } from "./Skeleton";

export const Table = ({
  columns,
  data,
  isLoading,
  emptyMessage = "No data found",
}) => {
  if (isLoading) {
    return <TableSkeleton rows={5} cols={columns.length} />;
  }

  return (
    <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200 bg-gray-50'>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className='px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {data?.length > 0 ? (
              data.map((row, i) => (
                <tr key={row.id || i} className='hover:bg-gray-50'>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className='px-6 py-4 text-sm text-gray-700'
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-6 py-12 text-center text-gray-500'
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
