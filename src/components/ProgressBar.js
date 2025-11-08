import React from 'react';
import { FaChartLine, FaTrophy } from 'react-icons/fa';

function ProgressBar({ progress, completed, total }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">
            <FaChartLine className="me-2 text-primary" />
            Daily Progress
          </h5>
          <div className="text-end">
            <span className="h4 text-primary">{Math.round(progress)}%</span>
            <div className="small text-muted">{completed} of {total} tasks</div>
          </div>
        </div>
        
        <div className="progress mb-3" style={{ height: '12px' }}>
          <div
            className="progress-bar bg-gradient"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        
        {progress === 100 && total > 0 && (
          <div className="alert alert-success mb-0">
            <FaTrophy className="me-2" />
            Congratulations! You've completed all tasks for today!
          </div>
        )}
        
        {progress === 0 && total > 0 && (
          <div className="alert alert-info mb-0">
            <span>Ready to start your day? Complete your first task!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;