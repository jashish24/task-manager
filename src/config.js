const isDevelopment = process.env.NODE_ENV === 'development';

export const config = {
  apiUrl: isDevelopment 
    ? 'http://localhost:5000' 
    : 'https://task-manager-xxxx.onrender.com', // Replace with your actual Render URL
  
  vapidPublicKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
};