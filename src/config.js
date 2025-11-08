const isDevelopment = process.env.NODE_ENV === 'development';

export const config = {
  apiUrl: isDevelopment 
    ? 'http://localhost:5000' 
    : 'https://your-api-url.herokuapp.com', // Update this with your production server URL
  
  vapidPublicKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
};