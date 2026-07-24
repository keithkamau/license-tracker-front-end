import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/users";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
    role: "agent",
    phone_number: "",
    employee_id: "",
  });

  const registerMutation = useMutation({
    mutationFn: (data) => userService.create(data),
    onSuccess: () => {
      toast.success("User created successfully");
      navigate("/users");
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Registration failed";
      toast.error(msg);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      toast.error("Passwords do not match");
      return;
    }
    registerMutation.mutate(formData);
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8'>
      <div className='max-w-md w-full'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-primary'>LicenseTracker</h1>
          <p className='text-gray-500 mt-2'>Create a new user account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'
        >
          <div className='grid grid-cols-2 gap-4'>
            <Input
              label='First Name'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <Input
              label='Last Name'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label='Email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Select
            label='Role'
            name='role'
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: "agent", label: "Agent" },
              ...(user?.role === "admin"
                ? [
                    { value: "hr", label: "HR" },
                    { value: "admin", label: "Admin" },
                  ]
                : []),
            ]}
          />

          <Input
            label='Phone Number'
            name='phone_number'
            value={formData.phone_number}
            onChange={handleChange}
            placeholder='+254XXXXXXXXX'
          />

          <Input
            label='Employee ID'
            name='employee_id'
            value={formData.employee_id}
            onChange={handleChange}
          />

          <Input
            label='Password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label='Confirm Password'
            type='password'
            name='password_confirm'
            value={formData.password_confirm}
            onChange={handleChange}
            required
          />

          <Button
            type='submit'
            className='w-full mt-2'
            isLoading={registerMutation.isPending}
          >
            Create Account
          </Button>

          <p className='text-center text-sm text-gray-500 mt-4'>
            Already have an account?{" "}
            <Link to='/login' className='text-primary hover:underline'>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
