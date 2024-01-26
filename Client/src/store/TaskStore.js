import { create } from 'zustand';
import axios from 'axios';

const useTaskStore = create((set) => ({
  tasks: [],
  title: '',
  description: '',
  setTitle: (newTitle) => set({ title: newTitle }),
  setDescription: (newDescription) => set({ description: newDescription }),
  fetchTasks: async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/task');
      set({ tasks: data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  getTaskByID: async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/task/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      throw error;
    }
  },
  createTask: async (taskData) => {
    try {
      await axios.post('http://localhost:3000/task', taskData);
      console.log('Task created');
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  updateTask: async (id, taskData) => {
    try {
      await axios.put(`http://localhost:3000/task/${id}`, taskData);
      console.log('Task updated');
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },
  deleteTask: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/task/${id}`);
      console.log('Task deleted');
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
}));

export default useTaskStore;
