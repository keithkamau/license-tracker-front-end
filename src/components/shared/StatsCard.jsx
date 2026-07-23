import { classNames } from "../../utils/helpers";

export const StatsCard = ({
  label,
  value,
  subtext,
  icon,
  color = "primary",
}) => {
  const colorClasses = {
    primary: "bg-blue-50 text-primary",
    compliant: "bg-green-50 text-compliant",
    expiring: "bg-amber-50 text-expiring",
    expired: "bg-red-50 text-expired",
  };

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-sm text-gray-500'>{label}</p>
        {icon && (
          <div className={classNames("p-2 rounded-lg", colorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
      <p className='text-2xl font-bold text-gray-900'>{value}</p>
      {subtext && <p className='mt-1 text-xs text-gray-500'>{subtext}</p>}
    </div>
  );
};
