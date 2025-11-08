import React, { useState } from 'react';
import { FaPlus, FaTrash, FaTag } from 'react-icons/fa';
import { useConfirmation, useNotifications } from '../hooks/useUI';

function SubjectManager({ subjects, onAddSubject, onDeleteSubject }) {
  const [newSubject, setNewSubject] = useState('');
  const { confirm } = useConfirmation();
  const { notify } = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    onAddSubject(newSubject);
    setNewSubject('');
  };

  return (
    <div className="card mt-3">
      <div className="card-header bg-info text-white">
        <h6 className="mb-0">
          <FaTag className="me-2" />
          Subjects
        </h6>
      </div>
      <div className="card-body p-3">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Add subject"
            />
            <button type="submit" className="btn btn-info">
              <FaPlus />
            </button>
          </div>
        </form>
        
        <div className="d-flex flex-wrap gap-1">
          {subjects.map(subject => (
            <span key={subject.id} className="badge bg-secondary d-flex align-items-center">
              {subject.name}
              <button
                className="btn-close btn-close-white ms-2"
                style={{ fontSize: '0.6em' }}
                onClick={async () => {
                  if (await confirm(`Are you sure you want to delete subject "${subject.name}"?`)) {
                    onDeleteSubject(subject.id);
                    notify('danger', `Subject "${subject.name}" has been deleted`);
                  }
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubjectManager;