# Task Manager App

A React-based daily task manager with email reminders and progress tracking.

## Features

- ✅ Add daily and one-time tasks
- 📊 Track daily progress with visual progress bar
- 🔄 Daily tasks reset automatically each day
- 📧 Email reminders every 6 hours for pending tasks
- 💾 Local storage for task persistence
- 📱 Responsive Bootstrap design
- 🎨 Beautiful icons with React Icons

## Task Types

- **Daily Tasks**: Reset every day, allowing you to track daily habits
- **One-time Tasks**: Stay completed once finished

## Setup Instructions

### 1. Install Dependencies
```bash
cd /var/www/task-react
npm install
```

### 2. Configure Email (Optional)
Copy `.env.example` to `.env` and configure your email settings:
```bash
cp .env.example .env
```

Edit `.env` with your Gmail credentials:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note**: Use Gmail App Password, not your regular password.

### 3. Start the Application

#### Development Mode
```bash
# Start React app (port 3000)
npm start

# Start server for email reminders (port 5000)
npm run server
```

#### Production Build
```bash
npm run build
```

## Usage

1. **Add Tasks**: Use the form to add daily or one-time tasks
2. **Track Progress**: View your daily completion percentage
3. **Complete Tasks**: Check off tasks as you complete them
4. **Email Reminders**: Set your email to receive reminders every 6 hours
5. **Daily Reset**: Daily tasks automatically reset each day

## API Endpoints

- `POST /api/user-data` - Save user email and tasks
- `POST /api/send-reminders` - Manually trigger email reminders
- `GET /api/health` - Health check

## Technology Stack

- **Frontend**: React 18, Bootstrap 5, React Icons
- **Backend**: Express.js, Node.js
- **Email**: Nodemailer
- **Scheduling**: node-cron
- **Storage**: Local Storage (frontend), JSON file (backend)

## File Structure

```
/var/www/task-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   ├── ProgressBar.js
│   │   └── EmailSettings.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── server/
│   └── server.js
├── package.json
└── README.md
```