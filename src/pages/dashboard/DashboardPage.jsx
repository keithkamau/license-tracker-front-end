import { useLicenseStats } from "../../hooks/useLicense";
import { StatsCard } from "../../components/shared/StatsCard";
import { StatsSkeleton } from "../../components/ui/Skeleton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useLicenses } from "../../hooks/useLicense";
import { formatDate } from "../../utils/helpers";

export const DashboardPage = () => {
  const { data: stats, isLoading: statsLoading } = useLicenseStats();
  const { data: licenses, isLoading: licensesLoading } = useLicenses({
    page_size: 5,
  });

  const statCards = [
    {
      label: "Total Agents",
      value: stats?.total || 0,
      color: "primary",
    },
    {
      label: "Compliant",
      value: stats?.by_status?.compliant || 0,
      subtext: stats
        ? `${Math.round((stats.by_status.compliant / stats.total) * 100)}% compliance`
        : "",
      color: "compliant",
    },
    {
      label: "Expiring Soon",
      value: stats?.by_status?.expiring_soon || 0,
      color: "expiring",
    },
    {
      label: "Expired",
      value: stats?.by_status?.expired || 0,
      color: "expired",
    },
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>Dashboard</h1>

      {statsLoading ? (
        <StatsSkeleton />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {statCards.map((card) => (
            <StatsCard key={card.label} {...card} />
          ))}
        </div>
      )}

      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Recent Licenses
        </h2>
        {licensesLoading ? (
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='h-12 bg-gray-100 rounded animate-pulse' />
            ))}
          </div>
        ) : (
          <div className='space-y-3'>
            {licenses?.results?.slice(0, 5).map((license) => (
              <div
                key={license.id}
                className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'
              >
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    {license.agent_name}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {license.license_number}
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-xs text-gray-500'>
                    {formatDate(license.expiry_date)}
                  </span>
                  <StatusBadge status={license.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
