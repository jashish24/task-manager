# Task Manager AI Development Guide

## Project Architecture

This React.js task management app uses a component-based architecture with Bootstrap for styling:

### Core Structure
- **Entry Point**: `src/App.js` - Root component and layout structure
- **Components**: `src/components/` - Reusable UI building blocks
- **State Management**: Custom hooks in `src/hooks/` handle business logic
- **Backend**: Express.js server for email notifications

### Component Organization
```
src/
├── components/           # Reusable UI components
│   ├── TaskForm.js      # Task creation form
│   ├── TaskList.js      # Task display and management
│   ├── ProgressBar.js   # Visual progress tracking
│   └── EmailSettings.js # Email preferences
├── hooks/               # Custom React hooks
│   ├── useTasks.js     # Task operations logic
│   └── useLocalStorage.js # Persistent storage
└── utils/              # Shared utilities
    └── storage.js      # Storage interface

### Key Patterns

1. **Task State Management**
   ```javascript
   // src/hooks/useTasks.js - Core task operations pattern
   const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
   ```

2. **Daily Reset Pattern**
   - Daily tasks auto-reset at midnight (see `useTasks.js`)
   - One-time tasks remain completed
   - Uses date-fns for date comparisons

3. **Storage Pattern**
   ```javascript
   // src/utils/storage.js - Standard storage interface
   storage.getTasks();
   storage.saveTasks(tasks);
   ```

## Development Workflow

### Setup Commands
```bash
cd /var/www/task-react
npm install
cp .env.example .env  # Configure email settings
```

### Development
```bash
npm start            # React app on port 3000
npm run server      # Email server on port 5000
```

### Key Files
- `src/App.js` - Main component structure
- `src/hooks/useTasks.js` - Task management logic
- `server/server.js` - Email reminder service
- `src/utils/storage.js` - Storage interface

## Integration Points

1. **Email Service**
   - Configure in `.env`: `EMAIL_USER`, `EMAIL_PASS` (Gmail app password)
   - Endpoints:
     - POST `/api/user-data` - Save user email/tasks
     - POST `/api/send-reminders` - Trigger reminders
     - GET `/api/health` - Service status

2. **Frontend-Backend Communication**
   - Frontend saves email in localStorage
   - Backend reads from `userData.json`
   - Scheduled reminders every 6 hours via node-cron

## Project Conventions

1. **Component Patterns**
   - Functional components with hooks (no class components)
   - Props destructuring at component top level
   - Each component in separate file under `components/`
   ```javascript
   // Component template with props destructuring
   function TaskItem({ task, onToggle, onDelete }) {
     return (/* component JSX */);
   }
   ```

2. **Styling Approach**
   - Bootstrap 5 for layout and components
   - Utility classes preferred over custom CSS
   - Common patterns:
     ```jsx
     // Layout classes
     <div className="container">
     <div className="row">
     <div className="col-lg-6">
     
     // Spacing utilities
     className="mb-4 mt-3 p-3"
     
     // Flexbox utilities
     className="d-flex justify-content-between align-items-center"
     ```
   - Custom CSS in `App.css` only for project-specific styles

3. **State Management**
   ```javascript
   // Always use functional updates
   setTasks(prev => prev.map(task => 
     task.id === id ? { ...task, ...updatedData } : task
   ));
   ```

4. **Error Handling**
   - Storage operations wrapped in try-catch
   - Email errors logged but don't crash server
   - Default values for missing localStorage data