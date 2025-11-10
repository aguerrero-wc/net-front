// app/components/Clients/shared/EmailListManager.tsx
interface EmailListManagerProps {
  title: string;
  icon: React.ReactNode;
  emails: string[];
  newEmail: string;
  setNewEmail: (email: string) => void;
  onAdd: () => void;
  onRemove: (email: string) => void;
  placeholder: string;
  colorScheme: "blue" | "red";
}

export function EmailListManager({
  title,
  icon,
  emails,
  newEmail,
  setNewEmail,
  onAdd,
  onRemove,
  placeholder,
  colorScheme
}: EmailListManagerProps) {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200/50",
      emailBg: "bg-blue-50/80",
      emailText: "text-blue-900",
      buttonBg: "bg-blue-600",
      ring: "ring-blue-500/50",
      hover: "hover:bg-blue-100"
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-200/50",
      emailBg: "bg-red-50/80",
      emailText: "text-red-900",
      buttonBg: "bg-red-600",
      ring: "ring-red-500/50",
      hover: "hover:bg-red-100"
    }
  };

  const color = colors[colorScheme];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-9 h-9 ${color.bg} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="flex gap-2">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:${color.ring} focus:border-transparent transition-all`}
        />
        <button
          type="button"
          onClick={onAdd}
          disabled={!newEmail.trim()}
          className={`px-4 py-3 ${color.buttonBg} text-white rounded-2xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        {emails.map((email, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between backdrop-blur-sm ${color.emailBg} border ${color.border} rounded-2xl px-4 py-3 hover:shadow-md transition-all`}
          >
            <span className={`text-sm ${color.emailText} font-medium`}>{email}</span>
            <button
              type="button"
              onClick={() => onRemove(email)}
              className={`${color.text} hover:text-${colorScheme}-800 transition-colors p-1 rounded-lg ${color.hover}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        {emails.length === 0 && (
          <p className="text-sm text-gray-500 italic text-center py-4">
            No hay emails configurados
          </p>
        )}
      </div>
    </div>
  );
}