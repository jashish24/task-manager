const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Email configuration
let transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Store user data (in production, use a proper database)
const dataFile = path.join(__dirname, 'userData.json');

function loadUserData() {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  return { users: {} };
}

function saveUserData(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
}

// API endpoint to save user email and tasks
app.post('/api/user-data', (req, res) => {
  const { email, tasks } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  const userData = loadUserData();
  userData.users[email] = {
    email,
    tasks: tasks || [],
    lastUpdated: new Date().toISOString()
  };
  
  saveUserData(userData);
  res.json({ success: true });
});

// Function to send reminder email
async function sendReminderEmail(email, pendingTasks) {
  if (pendingTasks.length === 0) return;
  
  const taskList = pendingTasks.map(task => 
    `• ${task.title} (${task.type})`
  ).join('\n');
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your-email@gmail.com',
    to: email,
    subject: `Task Reminder - ${pendingTasks.length} Pending Tasks`,
    text: `Hello!\n\nYou have ${pendingTasks.length} pending tasks:\n\n${taskList}\n\nDon't forget to complete them!\n\nBest regards,\nTask Manager`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
}

// Function to check and send reminders
function checkAndSendReminders() {
  const userData = loadUserData();
  
  Object.values(userData.users).forEach(user => {
    const pendingTasks = user.tasks.filter(task => {
      if (task.type === 'onetime') {
        return !task.completed;
      } else if (task.type === 'daily') {
        // For daily tasks, check if completed today
        if (!task.lastCompleted) return true;
        const lastCompleted = new Date(task.lastCompleted);
        const today = new Date();
        return lastCompleted.toDateString() !== today.toDateString();
      }
      return false;
    });
    
    if (pendingTasks.length > 0) {
      sendReminderEmail(user.email, pendingTasks);
    }
  });
}

// Schedule email reminders every 6 hours
cron.schedule('0 */6 * * *', () => {
  console.log('Running scheduled email reminders...');
  checkAndSendReminders();
});

// Manual trigger for testing
app.post('/api/send-reminders', (req, res) => {
  checkAndSendReminders();
  res.json({ success: true, message: 'Reminders sent' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Email reminders scheduled every 6 hours');
});