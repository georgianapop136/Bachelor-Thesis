import {Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./Checklist.css";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


const Checklist = () => {

    const [mockData, setMockData] = useState([
        {
            name: "Task 1",
            month: 10,
            checked: true,
        },
        {
            name: "Task 2",
            month: 3,
            checked: false,
        },
        {
            name: "Task 3",
            month: 7,
            checked: true,
        }
    ]);

    const [month, setMonth] = useState('');
    const [task, setTask] = useState('');

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleAddTask = () => {
        const newTask = {
            name: task,
            month: month,
            checked: false,
        }

        setMockData(current => [...current, newTask]);
        setTask("");
        setMonth("");
    }

    const handleDeleteTask = (index) => {
        const temp = [...mockData];
        temp.splice(index, 1);
        setMockData(temp);
    }

    return (
        <div className="checkListContainer">
            <div className="addTaskContainer">
                <TextField
                    onChange={handleTaskChange}
                    className="checkListTaskInput"
                    id="outlined-basic"
                    label="Task name"
                    value={task}
                    variant="outlined"/>
                <FormControl fullWidth className="checkListMonthSelector">
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        label="Month"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                </FormControl>

                <Button onClick={handleAddTask} className="checkListAddButton" variant="contained">Add task</Button>
            </div>
            <div className="checkListTasksContainer">
                {
                    mockData.map((task, index) => {
                        return (
                            <div className="checkListTaskStyle">
                                <FormControlLabel control={<Checkbox checked={task.checked}/>} label={task.name}/>

                                <IconButton onClick={() => handleDeleteTask(index)} aria-label="delete" color="primary">
                                    <DeleteIcon/>
                                </IconButton>


                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Checklist;