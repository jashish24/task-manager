import React, { useState } from 'react';
import { FaPlus, FaTasks } from 'react-icons/fa';
import { useLoadingState, useNotifications } from '../hooks/useUI';

const PRIORITY_LEVELS = {
  high: { label: 'High', color: 'danger' },
  medium: { label: 'Medium', color: 'warning' },
  low: { label: 'Low', color: 'success' }
};

function TaskForm({ onAddTask, subjects }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('onetime');
  const [priority, setPriority] = useState('medium');
  const [subjectId, setSubjectId] = useState('');

  const { isLoading, withLoading } = useLoadingState();
  const { notify } = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      notify('error', 'Please enter a task title');
      return;
    }
    
    const success = await withLoading(async () => {
      await onAddTask({
        title: title.trim(),
        description: description.trim(),
        type,
        priority,
        subjectId: subjectId || null
      });
    });
    
    if (success) {
      notify('success', 'Task added successfully');
      setTitle('');
      setDescription('');
      setSubjectId('');
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <FaTasks className="me-2" />
          Add New Task
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description (optional)"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {Object.entries(PRIORITY_LEVELS).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Task Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="onetime">One-time</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Subject (Optional)</label>
            <select
              className="form-select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">No Subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Adding...
              </div>
            ) : (
              <>
                <FaPlus className="me-2" />
                Add Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;