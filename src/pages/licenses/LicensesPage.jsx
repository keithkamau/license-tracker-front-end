import { useState } from "react";
import { useLicenses, useVerifyLicense } from "../../hooks/useLicense";
import { Table } from "../../components/ui/Table";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Button } from "../../components/ui/Button";
import { SearchInput } from "../../components/shared/SearchInput";
import { Pagination } from "../../components/shared/Pagination";
import { Badge } from "../../components/ui/Badge";
import { formatDate } from "../../utils/helpers";
import { licenseService } from "../../services/licenses";
import toast from "react-hot-toast";

export const LicensesPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [verified, setVerified] = useState("");
  const [expiryBefore, setExpiryBefore] = useState("");
  const [expiryAfter, setExpiryAfter] = useState("");
  const [page, setPage] = useState(1);

  const params = { search, status, page };
  if (verified) params.is_verified = verified === "true";
  if (expiryBefore) params.expiry_before = expiryBefore;
  if (expiryAfter) params.expiry_after = expiryAfter;

  const { data, isLoading } = useLicenses(params);
  const verifyLicense = useVerifyLicense();

  const handleExport = async (pendingOnly = false) => {
    try {
      const exportParams = {};
      if (pendingOnly) exportParams.pending_renewal = true;
      const blob = await licenseService.exportCSV(exportParams);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pendingOnly ? "pending_renewal.csv" : "licenses_export.csv";
      a.click();
      toast.success("CSV exported");
    } catch {
      toast.error("Export failed");
    }
  };

  const columns = [
    {
      key: "agent_name",
      label: "Agent",
      render: (row) => (
        <div>
          <p className='font-medium'>{row.agent_name}</p>
          <p className='text-xs text-gray-500'>{row.agent_email}</p>
        </div>
      ),
    },
    {
      key: "license_number",
      label: "License No.",
    },
    {
      key: "expiry_date",
      label: "Expiry",
      render: (row) => (
        <div>
          <p>{formatDate(row.expiry_date)}</p>
          <p className='text-xs text-gray-500'>{row.days_until_expiry} days</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "is_verified",
      label: "Verified",
      render: (row) => (
        <Badge color={row.is_verified ? "green" : "amber"}>
          {row.is_verified ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row) =>
        !row.is_verified && (
          <Button
            size='sm'
            variant='success'
            onClick={() =>
              verifyLicense.mutate({ id: row.id, data: { is_verified: true } })
            }
          >
            Verify
          </Button>
        ),
    },
  ];

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Licenses</h1>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => handleExport(true)}>
            Export Pending Renewal
          </Button>
          <Button onClick={() => handleExport(false)}>Export All</Button>
        </div>
      </div>

      <div className='bg-white rounded-xl border border-gray-200 p-4 mb-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3'>
          <SearchInput onSearch={setSearch} placeholder='Search...' />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg text-sm'
          >
            <option value=''>All Status</option>
            <option value='compliant'>Compliant</option>
            <option value='expiring_soon'>Expiring Soon</option>
            <option value='expired'>Expired</option>
            <option value='pending'>Pending</option>
          </select>
          <select
            value={verified}
            onChange={(e) => setVerified(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg text-sm'
          >
            <option value=''>All Verification</option>
            <option value='true'>Verified</option>
            <option value='false'>Unverified</option>
          </select>
          <input
            type='date'
            value={expiryAfter}
            onChange={(e) => setExpiryAfter(e.target.value)}
            placeholder='Expiry after'
            className='px-3 py-2 border border-gray-300 rounded-lg text-sm'
          />
          <input
            type='date'
            value={expiryBefore}
            onChange={(e) => setExpiryBefore(e.target.value)}
            placeholder='Expiry before'
            className='px-3 py-2 border border-gray-300 rounded-lg text-sm'
          />
        </div>
      </div>

      <Table columns={columns} data={data?.results} isLoading={isLoading} />
      <Pagination
        current={page}
        total={data?.count || 0}
        onPageChange={setPage}
      />
    </div>
  );
};
