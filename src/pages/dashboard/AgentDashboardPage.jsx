import { useQuery } from "@tanstack/react-query";
import { licenseService } from "../../services/licenses";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Button } from "../../components/ui/Button";
import { CardSkeleton } from "../../components/ui/Skeleton";
import { formatDate } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export const AgentDashboardPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["agentDashboard"],
    queryFn: () => licenseService.getAll(),
  });

  const license = data?.results?.[0];

  if (isLoading) {
    return (
      <div className='max-w-2xl mx-auto'>
        <CardSkeleton />
      </div>
    );
  }

  if (!license) {
    return (
      <div className='max-w-2xl mx-auto text-center py-12'>
        <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <svg
            className='w-10 h-10 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          No License Found
        </h2>
        <p className='text-gray-500 mb-6'>
          Upload your IRA practicing certificate to get started
        </p>
        <Button onClick={() => navigate("/my-license")}>Upload License</Button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "compliant":
        return "border-green-500 bg-green-50";
      case "expiring_soon":
        return "border-amber-500 bg-amber-50";
      case "expired":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getMessage = () => {
    const days = license.days_until_expiry;
    if (days <= 0)
      return {
        text: "Your license has expired. Please renew immediately.",
        color: "text-red-700",
        bg: "bg-red-50 border-red-200",
      };
    if (days <= 30)
      return {
        text: `Your license expires in ${days} days. Prepare for renewal.`,
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200",
      };
    return {
      text: "Your license is up to date.",
      color: "text-green-700",
      bg: "bg-green-50 border-green-200",
    };
  };

  const message = getMessage();

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>My Dashboard</h1>

      <div
        className={`border rounded-xl p-6 mb-6 ${message.bg} ${message.color}`}
      >
        <p className='font-medium'>{message.text}</p>
      </div>

      <div
        className={`bg-white rounded-xl border-2 ${getStatusColor(license.status)} p-6`}
      >
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-semibold'>License Details</h2>
          <StatusBadge status={license.status} />
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wider'>
              License Number
            </p>
            <p className='font-medium mt-1 font-mono text-sm'>
              {license.license_number}
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wider'>
              Status
            </p>
            <p className='font-medium mt-1 capitalize'>
              {license.status?.replace("_", " ")}
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wider'>
              Issue Date
            </p>
            <p className='font-medium mt-1'>{formatDate(license.issue_date)}</p>
          </div>
          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wider'>
              Expiry Date
            </p>
            <p className='font-medium mt-1'>
              {formatDate(license.expiry_date)}
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wider'>
              Days Remaining
            </p>
            <p
              className={`font-medium mt-1 font-mono ${license.days_until_expiry <= 30 ? "text-red-600" : "text-green-600"}`}
            >
              {license.days_until_expiry} days
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wider'>
              Verification
            </p>
            <p className='font-medium mt-1'>
              {license.is_verified ? "✅ Verified" : "⏳ Pending"}
            </p>
          </div>
        </div>

        {license.days_until_expiry <= 30 && (
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <Button onClick={() => navigate("/my-license")}>
              Renew License
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
