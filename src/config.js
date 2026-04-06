const isDevelopment = process.env.NODE_ENV === 'development';

export const config = {
  apiUrl: isDevelopment 
    ? 'http://localhost:5000' 
    : 'https://task-manager-m6sy.onrender.com',
  
  vapidPublicKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
};
