import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser, clearError } from '../../store/slices/authSlice';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(s => s.auth);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    dispatch(registerUser(userData));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account 🛒</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">First Name</label>
              <input className="input-field" type="text" placeholder="John"
                {...register('first_name', { required: 'First name required' })} />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Last Name</label>
              <input className="input-field" type="text" placeholder="Doe"
                {...register('last_name', { required: 'Last name required' })} />
              {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input className="input-field" type="email" placeholder="john@example.com"
              {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input className="input-field" type="password" placeholder="Min. 8 characters"
              {...register('password', { required: 'Password required', minLength: { value: 8, message: 'Min. 8 characters' } })} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Confirm Password</label>
            <input className="input-field" type="password" placeholder="Repeat password"
              {...register('confirmPassword', { required: 'Please confirm', validate: v => v === watch('password') || 'Passwords do not match' })} />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}