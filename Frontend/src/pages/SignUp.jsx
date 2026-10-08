import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('All fields are required'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    dispatch({ type: 'LOGIN', payload: { name: form.name, email: form.email } });
    navigate('/');
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-dark mb-2">Create Account</h1>
          <p className="text-sm text-muted">Join ABHI & ABHAY COLLECTIONS</p>
        </div>
        <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 md:p-8">
          {error && <p className="text-sm text-error bg-error/10 p-3 rounded-lg mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 pr-10 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="Create password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="Confirm password" />
            </div>
            <button type="submit" className="w-full py-3 bg-burgundy text-white rounded-lg font-semibold hover:bg-maroon transition-colors">
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-muted mt-6">
            Already have an account? <Link to="/signin" className="text-burgundy font-medium hover:underline">Sign In</Link>
          </p>
          <p className="text-[10px] text-muted text-center mt-4">Demo: Enter any details to create an account.</p>
        </div>
      </div>
    </div>
  );
}
