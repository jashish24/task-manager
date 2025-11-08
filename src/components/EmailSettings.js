import React, { useState } from 'react';
import { FaEnvelope, FaSave, FaBell } from 'react-icons/fa';

function EmailSettings({ email, setEmail }) {
  const [tempEmail, setTempEmail] = useState(email);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setEmail(tempEmail);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="card mt-4">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">
          <FaBell className="me-2" />
          Email Reminders
        </h5>
      </div>
      <div className="card-body">
        <p className="card-text small text-muted mb-3">
          Get email reminders for pending tasks every 6 hours
        </p>
        
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">
              <FaEnvelope className="me-2" />
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          
          <button 
            type="submit" 
            className={`btn w-100 ${saved ? 'btn-success' : 'btn-warning'}`}
            disabled={!tempEmail || tempEmail === email}
          >
            <FaSave className="me-2" />
            {saved ? 'Saved!' : 'Save Email'}
          </button>
        </form>
        
        {email && (
          <div className="alert alert-info mt-3 mb-0">
            <small>
              Reminders will be sent to: <strong>{email}</strong>
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailSettings;