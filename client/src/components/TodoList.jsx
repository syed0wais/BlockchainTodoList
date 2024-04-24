import React , { useState } from 'react'
import useEth from "../contexts/EthContext/useEth"
import CustomButton from './CustomButton';
import { Card, Typography, Table, TableCell, TableHead, TableRow, TableBody, Box, TextField, Checkbox } from '@mui/material';
import setUsername from './UserRegistration'
import username from './UserRegistration'

function TodoList() {

    const{
        state: {contract,accounts}
    } = useEth();


const [description, setDescription] = useState('');
const [tasks, setTasks] =useState([]);

const getTaskRecords = async () => {
    try {
      const isRegistered = await contract.methods.isRegistered().call({ from: accounts[0] });
      if (isRegistered) {
        const taskCount = await contract.methods.getTaskCount().call({ from: accounts[0] });
        const taskArray = [];
        for (let i = 0; i < taskCount; i++) {
          const task = await contract.methods.getTask(i).call({ from: accounts[0] });
          taskArray.push({
            taskId: task[0],
            description: task[1],
            completed: task[2],
          });
        }
        setTasks(taskArray);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleAddNewTask = async () => {
    try {
      const isRegistered = await contract.methods.isRegistered().call({ from: accounts[0] });
      if (isRegistered) {
        await contract.methods.addTask(description).send({from:accounts[0]});
        setDescription('');
        alert('Task added successfully');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTaskCompletion = async (taskId) => {
    try {
      await contract.methods.markTaskCompleted(taskId).send({ from: accounts[0] });
      alert('Task completed successfully');
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleTaskDeletion = async (taskId) => {
    try {
      await contract.methods.deleteTask(taskId).send({ from: accounts[0] });
      alert('Task deleted');
    } catch (error) {
      console.log(error.message);
    }
  };

getTaskRecords();

return (
    <>
      <Card sx ={{borderRadius:'10px', width:'30%', padding:'20px', marginTop:'80px'}}>
        <div>
          <Typography variant="h5" mb={1} sx={{ textAlign: 'center', fontWeight: 500 }}>
            {username} TodoList
          </Typography>
        </div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Task ID</TableCell>
                    <TableCell>Task Description</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{
                tasks.map((task)=>(
                    <TableRow key = {task.taskId}>
                    <TableCell>{task.taskId}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
               
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(task.taskId)}
                    color="primary"
                  />
          
              </TableCell>
                    <TableCell>
                        <CustomButton text = {'Delete Task'} handleClick={()=> handleTaskDeletion(task.taskId)}/>
                    </TableCell>
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
        <Box sx ={{mt:2}}>
            <TextField
            label = " New Task"
            margin = "normal"
            value ={description}
            onChange ={(e)=> setDescription(e.target.value)}
            variant= "outlined"
            fullWidth
            InputProps ={{style:{fontSize:'15px'}}}
            InputLabelProps={{style:{fontSize:'15px'}}}/>
        </Box>
        <CustomButton text = {'Add new Task'} handleClick={()=>handleAddNewTask()}/>
      </Card>
    </>
  );
}

export default TodoList;