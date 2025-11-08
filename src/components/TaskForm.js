import React, { useState } from 'react';
import { FaPlus, FaTasks } from 'react-icons/fa';

function TaskForm({ onAddTask, subjects }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('daily');
  const [subjectId, setSubjectId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({
      title: title.trim(),
      description: description.trim(),
      type,
      subjectId: subjectId || null
    });
    
    setTitle('');
    setDescription('');
    setSubjectId('');
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
            <label className="form-label">Task Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="daily">Daily Task</option>
              <option value="onetime">One-time Task</option>
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
          
          <button type="submit" className="btn btn-primary w-100">
            <FaPlus className="me-2" />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;