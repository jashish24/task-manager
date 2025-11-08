import React, { useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask, subjects }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const filteredTasks = selectedSubject 
    ? tasks.filter(task => task.subjectId === selectedSubject)
    : tasks;
  if (tasks.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <FaTasks className="text-muted mb-3" size={48} />
          <h5 className="text-muted">No tasks for today</h5>
          <p className="text-muted">Add your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">Today's Tasks ({filteredTasks.length}{selectedSubject ? ` of ${tasks.length}` : ''})</h5>
      </div>
      <div className="card-body">
        <TaskFilter 
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
        />
        <div className="list-group list-group-flush">
          {filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={onToggleTask} 
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              subjects={subjects} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;