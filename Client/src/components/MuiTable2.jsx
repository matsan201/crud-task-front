import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper } from "@mui/material";
import useTaskStore from "../store/TaskStore";
import { useEffect } from "react";

const MuiTable2 = () => {
    const { fetchTasks } = useTaskStore();

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            await fetchTasks();
            console.log('Tasks loaded:', useTaskStore.getState().tasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

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
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MuiTable2;
