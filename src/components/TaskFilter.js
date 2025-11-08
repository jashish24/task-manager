import React from 'react';
import { FaFilter } from 'react-icons/fa';

function TaskFilter({ subjects, selectedSubject, onSubjectChange }) {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <FaFilter className="me-2 text-muted" />
        <select
          className="form-select form-select-sm"
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
        >
          <option value="">All Tasks</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;