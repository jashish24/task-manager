import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useChecklists() {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    setChecklists(storage.getChecklists());
  }, []);

  useEffect(() => {
    storage.saveChecklists(checklists);
  }, [checklists]);

  const addChecklist = (name, tasks) => {
    const newChecklist = {
      id: Date.now(),
      name: name.trim(),
      tasks: tasks.map((task, index) => ({
        id: Date.now() + index,
        title: task.trim(),
        completed: false
      })),
      createdAt: new Date().toISOString()
    };
    setChecklists(prev => [...prev, newChecklist]);
    return newChecklist;
  };

  const deleteChecklist = (id) => {
    setChecklists(prev => prev.filter(checklist => checklist.id !== id));
  };

  const editChecklist = (id, updatedData) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === id ? { ...checklist, ...updatedData } : checklist
    ));
  };

  return { checklists, addChecklist, deleteChecklist, editChecklist };
}