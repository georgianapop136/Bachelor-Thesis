import {Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./Checklist.css";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


const Checklist = () => {
    const [month, setMonth] = useState('');
    const [task, setTask] = useState('');
    const [checklist, setChecklist] = useState([]);

    useEffect(() => {
       getChecklist()
    }, []);

    const getChecklist = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getChecklist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async(response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setChecklist(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleAddTask = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        fetch('http://localhost:3001/createChecklist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: task, month: month, userEmail: loggedInUser}),
        }).then(async(response) => {
            if (response.status === 200) {
                setTask("");
                setMonth("")
                getChecklist()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }

    const handleDeleteTask = (itemId) => {
        fetch('http://localhost:3001/deleteChecklist', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: itemId}),
        }).then(async(response) => {
            if (response.status === 200) {
                getChecklist()
            }
        })
    }

    const handleCheckbox = (itemId, isChecked) => {
        fetch('http://localhost:3001/setChecklist', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: itemId, isChecked}),
        }).then(async(response) => {
            if (response.status === 200) {
                getChecklist()
            }
        })
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
                    checklist.map((task) => {
                        return (
                            <div className="checkListTaskStyle">
                                <FormControlLabel control={<Checkbox
                                    onClick={() => handleCheckbox(task.id, !task.checked)} checked={task.checked}/>} label={task.name}/>

                                <IconButton onClick={() => handleDeleteTask(task.id)} aria-label="delete" color="primary">
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