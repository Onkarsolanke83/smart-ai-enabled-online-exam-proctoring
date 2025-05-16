import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

interface AlertContextType {
  showAlert: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  alerts: Alert[];
  clearAlerts: () => void;
}

interface Alert {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    // Show toast notification
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
      case 'info':
        toast(message, {
          icon: type === 'warning' ? '⚠️' : 'ℹ️',
          style: {
            backgroundColor: type === 'warning' ? '#FFFBEB' : '#EFF6FF',
            color: type === 'warning' ? '#92400E' : '#1E40AF'
          }
        });
        break;
    }
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const value = {
    showAlert,
    alerts,
    clearAlerts
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};