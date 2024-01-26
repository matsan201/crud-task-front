// import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import useTaskStore  from '../store/TaskStore';
import MuiToast from './toast/MuiToast';
import MuiTable2 from './MuiTable2';



const MuiTable = () => {
  // eslint-disable-next-line no-undef
  const taskId = useTaskStore((state) => state.id);
  const title = useTaskStore((state) => state.title);
  const description = useTaskStore((state) => state.description);
  const setTitle = useTaskStore((state) => state.setTitle);
  const setDescription = useTaskStore((state) => state.setDescription);
  const { createTask } = useTaskStore();
  const { fetchTasks } = useTaskStore();
  const { updateTask } = useTaskStore();
  

  const [toast, setToast] = useState(false)

  const addTask = async (event) => {
    if (taskId) {
      try {
        await updateTask(taskId, { title, description });
        console.log('Tarea actualizada');
        setToast(true);
        await fetchTasks();
        // Limpiar los campos después de la actualización
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
      }
    } else {
      event.preventDefault();

    try {
      await createTask({ title, description });
      console.log('Tarea creada');
      
      setTitle('')
      setDescription('')

      setToast(true)

      await fetchTasks()
      // eslint-disable-next-line no-undef
      set({ title: '', description: '' });
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  }

  const handleCloseMuiToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(false);
  }
  return (
    <>
    <Box
      component="form"
      onSubmit={addTask}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-basic"
          name="title"
          label="Title"
          variant="outlined"
          onChange={handleChange}
          value={title}
        />
        <TextField
          id="outlined-basic"
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
          value={description}
        />
      </div>
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
        Submit
      </Button>
      <MuiTable2 />
      <MuiToast open={toast} handleClose={handleCloseMuiToast} />
    </Box>
    </>
  );
};

export default MuiTable;
