import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../services/users";
import { Table } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { SearchInput } from "../../components/shared/SearchInput";
import { Pagination } from "../../components/shared/Pagination";
import { formatDate } from "../../utils/helpers";
import toast from "react-hot-toast";

export const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users", search, page],
    queryFn: () => userService.getAll({ search, page }),
  });

  const toggleStatus = useMutation({
    mutationFn: (id) => userService.toggleStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Status updated");
    },
  });

  const columns = [
    {
      key: "name",
      label: "User",
      render: (row) => (
        <div>
          <p className='font-medium'>
            {row.first_name} {row.last_name}
          </p>
          <p className='text-xs text-gray-500'>{row.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (row) => <Badge color='blue'>{row.role}</Badge>,
    },
    {
      key: "employee_id",
      label: "Employee ID",
      render: (row) => row.employee_id || "-",
    },
    {
      key: "date_joined",
      label: "Joined",
      render: (row) => formatDate(row.date_joined),
    },
    {
      key: "is_active",
      label: "Status",
      render: (row) => (
        <Badge color={row.is_active ? "green" : "red"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <Button
          size='sm'
          variant={row.is_active ? "danger" : "success"}
          onClick={() => toggleStatus.mutate(row.id)}
        >
          {row.is_active ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>Users</h1>

      <div className='mb-4'>
        <SearchInput onSearch={setSearch} placeholder='Search users...' />
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
