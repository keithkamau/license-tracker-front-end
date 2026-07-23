import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='max-w-md w-full'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-primary'>LicenseTracker</h1>
          <p className='text-gray-500 mt-2'>Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'
        >
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />
          <Input
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />
          <Button type='submit' className='w-full mt-2' isLoading={loading}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};
