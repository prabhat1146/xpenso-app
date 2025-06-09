import { CheckCircle, X, XCircle } from "lucide-react";

const Alert = ({ message, success, visible, onClose }) => {
  if (!visible || !message) return null;
  const Icon = success ? CheckCircle : XCircle;
  const colorClasses = success
    ? "bg-green-50 border-green-400 text-green-800"
    : "bg-red-50 border-red-400 text-red-800";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-md border shadow-lg max-w-md w-full ${colorClasses}`}
        role="alert"
      >
        <Icon className="w-6 h-6 flex-shrink-0" />
        <span className="flex-1 text-sm">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded hover:bg-black/10 transition"
          aria-label="Close alert"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
