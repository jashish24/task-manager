import React, { useState } from 'react';
import { FaCheck, FaTrash, FaCalendarDay, FaClock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useConfirmation, useNotifications } from '../hooks/useUI';

function TaskItem({ task, onToggle, onDelete, onEdit, subjects }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const { confirm } = useConfirmation();
  const { notify } = useNotifications();

  const handleSave = () => {
    onEdit(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="list-group-item">
        <div className="mb-2">
          <input
            className="form-control form-control-sm mb-2"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            className="form-control form-control-sm"
            rows="2"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
          />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success btn-sm" onClick={handleSave}>
            <FaSave className="me-1" /> Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
            <FaTimes className="me-1" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`list-group-item ${task.completed ? 'bg-light' : ''}`}>
      <div className="d-flex align-items-center">
        <div className="form-check me-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
        </div>
        
        <div className="flex-grow-1">
          <h6 className={`mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {task.title}
          </h6>
          {task.description && (
            <p className={`mb-1 small ${task.completed ? 'text-muted' : 'text-secondary'}`}>
              {task.description}
            </p>
          )}
          <div className="d-flex align-items-center flex-wrap">
            <span className={`badge ${task.type === 'daily' ? 'bg-info' : 'bg-warning'} me-2 mb-1`}>
              {task.type === 'daily' ? <FaCalendarDay className="me-1" /> : <FaClock className="me-1" />}
              {task.type === 'daily' ? 'Daily' : 'One-time'}
            </span>
            {task.subjectId && (
              <span className="badge bg-secondary me-2 mb-1">
                {subjects.find(s => s.id === parseInt(task.subjectId))?.name || 'Unknown'}
              </span>
            )}
            {task.completed && (
              <span className="badge bg-success mb-1">
                <FaCheck className="me-1" />
                Completed
              </span>
            )}
          </div>
        </div>
        
        <div className="d-flex gap-1">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setIsEditing(true)}
            title="Edit task"
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={async () => {
              if (await confirm(`Are you sure you want to delete "${task.title}"?`)) {
                onDelete(task.id);
                notify('danger', `Task "${task.title}" has been deleted`);
              }
            }}
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;