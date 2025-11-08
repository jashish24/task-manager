import React, { useState, useMemo } from 'react';
import { FaPlus, FaTrash, FaList, FaDownload, FaEye, FaEdit, FaSave, FaTimes, FaClipboard, 
         FaHome, FaPlane, FaBriefcase } from 'react-icons/fa';
import { useConfirmation, useNotifications } from '../hooks/useUI';
import { templateChecklists, CATEGORY_ICONS } from '../utils/templateChecklists';

function ChecklistManager({ checklists, onAddChecklist, onDeleteChecklist, onEditChecklist, onAddToTasks }) {
  const [showForm, setShowForm] = useState(false);
  const [checklistName, setChecklistName] = useState('');
  const [tasks, setTasks] = useState(['']);
  const { confirm } = useConfirmation();
  const { notify } = useNotifications();
  const [viewingChecklist, setViewingChecklist] = useState(null);
  const [editingChecklist, setEditingChecklist] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTasks, setEditTasks] = useState([]);

  const loadTemplate = (templateKey) => {
    const template = templateChecklists[templateKey];
    setChecklistName(template.name);
    setTasks(template.tasks);
    setShowForm(true);
    notify('info', 'Template loaded - customize as needed');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checklistName.trim() || tasks.filter(t => t.trim()).length === 0) return;
    
    const validTasks = tasks.filter(t => t.trim());
    onAddChecklist(checklistName, validTasks);
    
    setChecklistName('');
    setTasks(['']);
    setShowForm(false);
  };

  const addTaskField = () => {
    setTasks([...tasks, '']);
  };

  const updateTask = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addChecklistToTasks = (checklist) => {
    checklist.tasks.forEach((task, index) => {
      onAddToTasks({
        title: `${checklist.name}: ${task.title}`,
        description: `From checklist: ${checklist.name}`,
        type: 'onetime'
      });
    });
  };

  const startEdit = (checklist) => {
    setEditingChecklist(checklist.id);
    setEditName(checklist.name);
    setEditTasks(checklist.tasks.map(t => t.title));
  };

  const saveEdit = () => {
    const validTasks = editTasks.filter(t => t.trim());
    onEditChecklist(editingChecklist, {
      name: editName,
      tasks: validTasks.map((title, index) => ({
        id: Date.now() + index,
        title: title.trim(),
        completed: false
      }))
    });
    setEditingChecklist(null);
  };

  const cancelEdit = () => {
    setEditingChecklist(null);
    setEditName('');
    setEditTasks([]);
  };

  const updateEditTask = (index, value) => {
    const newTasks = [...editTasks];
    newTasks[index] = value;
    setEditTasks(newTasks);
  };

  const addEditTask = () => {
    setEditTasks([...editTasks, '']);
  };

  const removeEditTask = (index) => {
    setEditTasks(editTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="card mt-3">
      <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
        <h6 className="mb-0">
          <FaList className="me-2" />
          Checklists
        </h6>
        <button 
          className="btn btn-light btn-sm"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus />
        </button>
      </div>
      <div className="card-body p-3">
        {!showForm && (
          <div className="mb-4">
            <h6 className="mb-3">Templates:</h6>
            <div className="row g-2">
              {Object.entries(
                Object.entries(templateChecklists).reduce((acc, [key, template]) => {
                  if (!acc[template.category]) {
                    acc[template.category] = [];
                  }
                  acc[template.category].push({ key, ...template });
                  return acc;
                }, {})
              ).map(([category, templates]) => {
                const Icon = {
                  'FaHome': FaHome,
                  'FaPlane': FaPlane,
                  'FaBriefcase': FaBriefcase
                }[CATEGORY_ICONS[category]] || FaClipboard;

                return (
                  <div key={category} className="col-md-6 col-lg-4">
                    <h6 className="mb-2 text-muted">
                      <Icon className="me-2" />
                      {category}
                    </h6>
                    <div className="d-grid gap-2">
                      {templates.map(template => (
                        <button 
                          key={template.key}
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => loadTemplate(template.key)}
                        >
                          <FaClipboard className="me-1" /> {template.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-3 border p-3 rounded bg-light">
            <div className="mb-3">
              <label className="form-label fw-bold">Checklist Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={checklistName}
                onChange={(e) => setChecklistName(e.target.value)}
                placeholder="Enter checklist name"
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold d-flex justify-content-between align-items-center">
                <span>Tasks</span>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-sm" 
                  onClick={addTaskField}
                >
                  <FaPlus className="me-1" /> Add Task
                </button>
              </label>
              <div className="ms-2 border-start ps-3">
                {tasks.map((task, index) => (
                  <div key={index} className="input-group input-group-sm mb-2">
                    <span className="input-group-text bg-white text-muted">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      value={task}
                      onChange={(e) => updateTask(index, e.target.value)}
                      placeholder="Enter task description"
                    />
                    {tasks.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => removeTask(index)}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="d-flex gap-2 justify-content-end mt-4">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Checklist
              </button>
            </div>
          </form>
        )}
        
        <div className="row">
          {checklists.map(checklist => (
            <div key={checklist.id} className="col-12 mb-2">
              {editingChecklist === checklist.id ? (
                <div className="border rounded p-3">
                  <input
                    className="form-control form-control-sm mb-2"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Checklist name"
                  />
                  {editTasks.map((task, index) => (
                    <div key={index} className="input-group input-group-sm mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={task}
                        onChange={(e) => updateEditTask(index, e.target.value)}
                        placeholder={`Task ${index + 1}`}
                      />
                      {editTasks.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeEditTask(index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm" onClick={addEditTask}>
                      <FaPlus /> Add Task
                    </button>
                    <button className="btn btn-success btn-sm" onClick={saveEdit}>
                      <FaSave /> Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border rounded p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{checklist.name}</strong>
                    <div>
                      <button
                        className="btn btn-info btn-sm me-1"
                        onClick={() => setViewingChecklist(viewingChecklist === checklist.id ? null : checklist.id)}
                        title="View checklist"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => startEdit(checklist)}
                        title="Edit checklist"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={async () => {
                          if (await confirm(`Add all tasks from "${checklist.name}" to your task list?`)) {
                            addChecklistToTasks(checklist);
                            notify('success', `Added ${checklist.tasks.length} tasks from "${checklist.name}"`);
                          }
                        }}
                        title="Add to tasks"
                      >
                        <FaDownload />
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={async () => {
                          if (await confirm(`Are you sure you want to delete checklist "${checklist.name}"?`)) {
                            onDeleteChecklist(checklist.id);
                            notify('danger', `Checklist "${checklist.name}" has been deleted`);
                          }
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <small className="text-muted">
                    {checklist.tasks.length} tasks
                  </small>
                  {viewingChecklist === checklist.id && (
                    <div className="mt-2 p-2 bg-light rounded">
                      <ul className="list-unstyled mb-0">
                        {checklist.tasks.map((task, index) => (
                          <li key={index} className="small">
                            • {task.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChecklistManager;