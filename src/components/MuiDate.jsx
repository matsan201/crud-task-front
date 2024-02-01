// import React from 'react';
import { useState } from 'react';
import { TextField, Button, Stack} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useTaskStore  from '../store/TaskStore';
import Toast from './toast/Toast';
import MuiTable from './MuiTable';



const MuiDate = () => {
  // eslint-disable-next-line no-undef
  // const taskId = useTaskStore((state) => state.id);
  const title = useTaskStore((state) => state.title);
  const description = useTaskStore((state) => state.description);
  const setTitle = useTaskStore((state) => state.setTitle);
  const setDescription = useTaskStore((state) => state.setDescription);
  const { createTask } = useTaskStore();
  const { fetchTasks } = useTaskStore();
  // const { updateTask } = useTaskStore();
  

  const [toast, setToast] = useState(false)

  const addTask = async (event) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  }

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(false);
  }
  return (
    <div>
    <form noValidate onSubmit={addTask}>
        <Stack spacing={2} width={250}>
        <TextField
          id="outlined-basic"
          name="title"
          label="Title"
          variant="outlined"
          onChange={handleChange}
          value={title}
        />
         <TextField
          id="outlined-multiline"
          name="description"
          label="Description"
          multiline
          variant="outlined"
          onChange={handleChange}
          value={description}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Submit
        </Button>
        <Toast open={toast} handleClose={handleCloseToast}/>
        </Stack>
      </form>
      <MuiTable />
    </div>
  );
};

export default MuiDate;
