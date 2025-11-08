import React from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

function TaskSummary({ tasks }) {
  const completed = tasks.filter(task => task.completed);
  const pending = tasks.filter(task => !task.completed);

  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="card border-success">
          <div className="card-header bg-success text-white">
            <h6 className="mb-0">
              <FaCheckCircle className="me-2" />
              Completed ({completed.length})
            </h6>
          </div>
          <div className="card-body p-2">
            {completed.length === 0 ? (
              <p className="text-muted mb-0 small">No completed tasks</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {completed.map(task => (
                  <li key={task.id} className="small text-success mb-1">
                    ✓ {task.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card border-warning">
          <div className="card-header bg-warning text-dark">
            <h6 className="mb-0">
              <FaClock className="me-2" />
              Pending ({pending.length})
            </h6>
          </div>
          <div className="card-body p-2">
            {pending.length === 0 ? (
              <p className="text-muted mb-0 small">All tasks completed!</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {pending.map(task => (
                  <li key={task.id} className="small text-dark mb-1">
                    ○ {task.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskSummary;