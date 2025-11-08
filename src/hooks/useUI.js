import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  
  const withLoading = useCallback(async (operation) => {
    setIsLoading(true);
    try {
      await operation();
      return true;
    } catch (error) {
      console.error('Operation failed:', error);
      toast.error(error.message || 'Operation failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, withLoading };
}

export function useConfirmation() {
  const confirm = useCallback((message) => {
    return window.confirm(message);
  }, []);

  return { confirm };
}

export function useNotifications() {
  const notify = useCallback((type, message) => {
    const options = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (type) {
      case 'success':
        toast.success(message, { ...options, theme: 'colored' });
        break;
      case 'error':
        toast.error(message, { ...options, theme: 'colored' });
        break;
      case 'danger':
        toast(message, {
          ...options,
          theme: 'colored',
          style: { background: '#dc3545', color: 'white' },
          progressStyle: { background: '#fff' }
        });
        break;
      case 'info':
        toast.info(message, { ...options, theme: 'colored' });
        break;
      default:
        toast(message, options);
    }
  }, []);

  return { notify };
}