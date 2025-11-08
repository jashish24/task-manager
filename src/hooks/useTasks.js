import { useState, useEffect } from 'react';
import { isToday } from 'date-fns';
import { storage } from '../utils/storage';

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = storage.getTasks();
    const resetTasks = savedTasks.map(task => 
      task.type === 'daily' && task.lastCompleted && !isToday(new Date(task.lastCompleted))
        ? { ...task, completed: false, lastCompleted: null }
        : task
    );
    setTasks(resetTasks);
  }, []);

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now() + Math.random(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      lastCompleted: null
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, lastCompleted: !task.completed ? new Date().toISOString() : null }
        : task
    ));
  };

  const deleteTask = async (id) => {
    try {
      setTasks(prev => prev.filter(task => task.id !== id));
      storage.saveTasks(tasks.filter(task => task.id !== id));
      return true;
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error('Failed to delete task. Please try again.');
    }
  };

  const editTask = (id, updatedData) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    ));
  };

  const todayTasks = tasks.filter(task => 
    task.type === 'daily' || task.type === 'onetime'
  );

  return { tasks: todayTasks, addTask, toggleTask, deleteTask, editTask };
}