import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { licenseService } from "../../services/licenses";
import { useCreateLicense } from "../../hooks/useLicense";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { FileUpload } from "../../components/shared/FileUpload";
import { EmptyState } from "../../components/shared/EmptyState";
import { formatDate } from "../../utils/helpers";
import useAuthStore from "../../store/authStore";

export const MyLicensePage = () => {
  const { user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [file, setFile] = useState(null);
  const createLicense = useCreateLicense();

  const { data: licenses, isLoading } = useQuery({
    queryKey: ["myLicense"],
    queryFn: () => licenseService.getAll(),
  });

  const myLicense = licenses?.results?.[0];

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("license_number", licenseNumber);
    formData.append("issue_date", issueDate);
    formData.append("expiry_date", expiryDate);
    if (file) formData.append("certificate_file", file);
    formData.append("agent", user.id);

    createLicense.mutate(formData, {
      onSuccess: () => setShowForm(false),
    });
  };

  if (isLoading) {
    return (
      <div className='max-w-2xl mx-auto'>
        <div className='animate-pulse space-y-4'>
          <div className='h-8 bg-gray-200 rounded w-1/3' />
          <div className='h-48 bg-gray-200 rounded' />
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>My License</h1>

      {myLicense ? (
        <div className='bg-white rounded-xl border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-lg font-semibold'>License Details</h2>
            <StatusBadge status={myLicense.status} />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-xs text-gray-500'>License Number</p>
              <p className='font-medium'>{myLicense.license_number}</p>
            </div>
            <div>
              <p className='text-xs text-gray-500'>Status</p>
              <p className='font-medium capitalize'>
                {myLicense.status?.replace("_", " ")}
              </p>
            </div>
            <div>
              <p className='text-xs text-gray-500'>Issue Date</p>
              <p className='font-medium'>{formatDate(myLicense.issue_date)}</p>
            </div>
            <div>
              <p className='text-xs text-gray-500'>Expiry Date</p>
              <p className='font-medium'>{formatDate(myLicense.expiry_date)}</p>
            </div>
          </div>

          {myLicense.days_until_expiry <= 30 && (
            <div className='mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg'>
              <p className='text-sm text-amber-800'>
                Your license{" "}
                {myLicense.days_until_expiry <= 0
                  ? "has expired"
                  : `expires in ${myLicense.days_until_expiry} days`}
                . Please renew and upload your new certificate.
              </p>
            </div>
          )}
        </div>
      ) : showForm ? (
        <form
          onSubmit={handleUpload}
          className='bg-white rounded-xl border border-gray-200 p-6'
        >
          <h2 className='text-lg font-semibold mb-4'>Upload License</h2>
          <Input
            label='License Number'
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
          <Input
            label='Issue Date'
            type='date'
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
          />
          <Input
            label='Expiry Date'
            type='date'
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Certificate (PDF/Image)
            </label>
            <FileUpload onFileSelect={setFile} />
          </div>
          <div className='flex gap-3'>
            <Button type='submit' isLoading={createLicense.isPending}>
              Upload
            </Button>
            <Button variant='outline' onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <EmptyState
          title='No license uploaded'
          description='Upload your IRA practicing certificate to get started'
          action={
            <Button onClick={() => setShowForm(true)}>Upload License</Button>
          }
        />
      )}
    </div>
  );
};
