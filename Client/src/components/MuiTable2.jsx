import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Button } from "@mui/material";
import useTaskStore from "../store/TaskStore";
import { useEffect, useState  } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiToastError from './toast/MuiToastError';

const MuiTable2 = () => {
    const { fetchTasks } = useTaskStore();
    const { updateTask } = useTaskStore();
    const { deleteTask } = useTaskStore();

    const [toast, setToast] = useState(false);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            await fetchTasks();
            console.log( useTaskStore.getState().tasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const handleUpdateTask = async (taskId) => {
        try {
            await updateTask(taskId)

            setToast(true)
            await fetchTasks();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            if(confirm('Are you sure you want to delete')){
                await deleteTask(taskId);
                console.log('Tarea eliminada');
                
                setToast(true);
                await fetchTasks();
            }
      
        } catch (error) {
          console.error('Error al eliminar la tarea:', error);
        }
    };


    const handleCloseMuiToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setToast(false);
      }

    return (
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        useTaskStore.getState().tasks.map(task => (
                            <TableRow key={task.id} sx={{ '&:last-child td, &: last-child th': { border: 0 } }}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDeleteTask(task._id)}
                                    >
                                    Delete        
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleUpdateTask(task._id)}
                                    >
                                    Update        
                                    </Button>
                                    <MuiToastError open={toast} handleClose={handleCloseMuiToast} />
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MuiTable2;
