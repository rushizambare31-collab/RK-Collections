import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setError('All fields are required'); return; }
    // Demo login
    dispatch({ type: 'LOGIN', payload: { name: form.email.split('@')[0], email: form.email } });
    navigate('/');
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-dark mb-2">Welcome Back</h1>
          <p className="text-sm text-muted">Sign in to your RK COLLECTIONS account</p>
        </div>
        <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 md:p-8">
          {error && <p className="text-sm text-error bg-error/10 p-3 rounded-lg mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 pr-10 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="Enter password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-burgundy text-white rounded-lg font-semibold hover:bg-maroon transition-colors">
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-muted mt-6">
            Don't have an account? <Link to="/signup" className="text-burgundy font-medium hover:underline">Create Account</Link>
          </p>
          <p className="text-[10px] text-muted text-center mt-4">Demo: Enter any email and password to sign in.</p>
        </div>
      </div>
    </div>
  );
}
