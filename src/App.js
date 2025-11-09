import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import ProgressBar from './components/ProgressBar';
import EmailSettings from './components/EmailSettings';
import NotificationConsent from './components/NotificationConsent';
import SubjectManager from './components/SubjectManager';
import ChecklistManager from './components/ChecklistManager';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { useTasks } from './hooks/useTasks';
import { useSubjects } from './hooks/useSubjects';
import { useChecklists } from './hooks/useChecklists';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const { subjects, addSubject, deleteSubject } = useSubjects();
  const { checklists, addChecklist, deleteChecklist, editChecklist } = useChecklists();
  const [email, setEmail] = useLocalStorage('userEmail', '');

  const completedToday = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedToday / tasks.length) * 100 : 0;

  return (
    <div className="min-vh-100 bg-light">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <header className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 mb-2">Daily Task Manager</h1>
            <p className="lead mb-0">
              <FaCalendarAlt className="me-2" />
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </p>
          </div>
        </div>
      </header>
      
      <div className="container mb-3">
        <NotificationConsent />
      </div>
      
      <main className="container pb-5">
        <div className="row mb-4">
          <div className="col-12">
            <ProgressBar progress={progress} completed={completedToday} total={tasks.length} />
          </div>
        </div>
        
        <TaskSummary tasks={tasks} />
        
        <div className="row">
          <div className="col-lg-6 mb-4">
            <TaskForm onAddTask={addTask} subjects={subjects} />
            <SubjectManager 
              subjects={subjects}
              onAddSubject={addSubject}
              onDeleteSubject={deleteSubject}
            />
            <ChecklistManager 
              checklists={checklists}
              onAddChecklist={addChecklist}
              onDeleteChecklist={deleteChecklist}
              onEditChecklist={editChecklist}
              onAddToTasks={addTask}
            />
            <EmailSettings email={email} setEmail={setEmail} />
          </div>
          
          <div className="col-lg-6">
            <TaskList 
              tasks={tasks} 
              onToggleTask={toggleTask} 
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              subjects={subjects} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;