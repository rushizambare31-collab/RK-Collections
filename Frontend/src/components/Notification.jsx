import { useStore } from '../store/StoreContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Notification() {
  const { state, dispatch } = useStore();

  if (!state.notification) return null;

  const icons = {
    success: <CheckCircle size={18} className="text-success" />,
    error: <AlertCircle size={18} className="text-error" />,
    info: <Info size={18} className="text-burgundy" />,
  };

  const bgColors = {
    success: 'bg-success/10 border-success/20',
    error: 'bg-error/10 border-error/20',
    info: 'bg-burgundy/10 border-burgundy/20',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] animate-slide-up">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl backdrop-blur-sm ${bgColors[state.notification.type] || bgColors.info}`}>
        {icons[state.notification.type] || icons.info}
        <p className="text-sm font-medium text-dark">{state.notification.message}</p>
        <button
          onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
          className="p-0.5 text-muted hover:text-dark ml-2"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
