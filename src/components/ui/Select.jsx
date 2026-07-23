export const Select = ({
  label,
  error,
  options = [],
  className = "",
  ...props
}) => {
  return (
    <div className='mb-4'>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      >
        <option value=''>Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
    </div>
  );
};
