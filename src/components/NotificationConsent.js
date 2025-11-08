import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useNotifications } from '../hooks/useUI';
import { config } from '../config';

function NotificationConsent() {
  const [permission, setPermission] = useState('default');
  const { notify } = useNotifications();

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      throw error;
    }
  };

  const subscribeUserToPush = async (registration) => {
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: config.vapidPublicKey
      });
      
      // Send subscription to server
      await fetch(`${config.apiUrl}/api/push-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      throw error;
    }
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      notify('error', 'This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === 'granted') {
        const registration = await registerServiceWorker();
        await subscribeUserToPush(registration);
        notify('success', 'Push notifications enabled successfully');
        
        // Save preference
        localStorage.setItem('notificationsEnabled', 'true');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      notify('error', 'Failed to enable notifications');
    }
  };

  if (!('Notification' in window)) {
    return null;
  }

  if (permission === 'granted') {
    return (
      <div className="alert alert-success d-flex align-items-center" role="alert">
        <FaBell className="me-2" />
        Push notifications are enabled
      </div>
    );
  }

  return (
    <div className="alert alert-info d-flex align-items-center justify-content-between" role="alert">
      <div>
        <FaBell className="me-2" />
        Get notified about pending tasks
      </div>
      <button 
        className="btn btn-outline-primary btn-sm" 
        onClick={requestPermission}
      >
        Enable Notifications
      </button>
    </div>
  );
}

export default NotificationConsent;