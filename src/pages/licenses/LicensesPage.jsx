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
  const [page, setPage] = useState(1);
  const { data, isLoading } = useLicenses({ search, status, page });
  const verifyLicense = useVerifyLicense();

  const handleExport = async () => {
    try {
      const blob = await licenseService.exportCSV();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "licenses_export.csv";
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
        <Button onClick={handleExport}>Export CSV</Button>
      </div>

      <div className='flex gap-3 mb-4'>
        <div className='flex-1'>
          <SearchInput
            onSearch={setSearch}
            placeholder='Search agents or licenses...'
          />
        </div>
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
