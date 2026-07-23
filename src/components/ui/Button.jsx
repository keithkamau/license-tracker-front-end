import { classNames } from "../../utils/helpers";

const variants = {
  primary: "bg-primary text-white hover:bg-blue-700",
  success: "bg-compliant text-white hover:bg-green-600",
  warning: "bg-expiring text-white hover:bg-amber-600",
  danger: "bg-expired text-white hover:bg-red-600",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-600 hover:bg-gray-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className='animate-spin -ml-1 mr-2 h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
