import { Button } from "../ui/Button";

export const Pagination = ({ current, total, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(total / 20); i++) {
    pages.push(i);
  }

  if (pages.length <= 1) return null;

  return (
    <div className='flex items-center justify-between mt-4'>
      <p className='text-sm text-gray-600'>
        Page {current} of {pages.length}
      </p>
      <div className='flex gap-1'>
        <Button
          variant='outline'
          size='sm'
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
        >
          Previous
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === current ? "primary" : "outline"}
            size='sm'
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant='outline'
          size='sm'
          disabled={current === pages.length}
          onClick={() => onPageChange(current + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
