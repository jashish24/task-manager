import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useSubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    setSubjects(storage.getSubjects());
  }, []);

  useEffect(() => {
    storage.saveSubjects(subjects);
  }, [subjects]);

  const addSubject = (name) => {
    const newSubject = {
      id: Date.now(),
      name: name.trim(),
      createdAt: new Date().toISOString()
    };
    setSubjects(prev => [...prev, newSubject]);
    return newSubject;
  };

  const deleteSubject = (id) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  return { subjects, addSubject, deleteSubject };
}