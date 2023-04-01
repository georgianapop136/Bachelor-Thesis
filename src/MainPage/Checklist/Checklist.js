import {Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./Checklist.css";
import {useState} from "react";

const MockData = [
    {
        id: 1,
        name: "Task 1",
        month: 10,
        checked: true,
    },
    {
        id: 2,
        name: "Task 2",
        month: 3,
        checked: false,
    },
    {
        id: 3,
        name: "Task 3",
        month: 7,
        checked: true,
    }
]

function Checklist() {
    const [month, setMonth] = useState('');

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    return (
        <div className="checkListContainer">
            <div className="addTaskContainer">
                <TextField className="checkListTaskInput" id="outlined-basic" label="Task name" variant="outlined"/>
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

                <Button className="checkListAddButton" variant="contained">Add task</Button>
            </div>
            <div className="checkListTasksContainer">
                {
                    MockData.map((task, index) => {
                        return (
                            // <div className="checkListTask" key={index}>
                            //     <div className="checkListTaskName">{task.name}</div>
                            //     <div className="checkListTaskMonth">{task.month}</div>
                            // </div>
                            <div className="checkListTaskStyle">
                            <FormControlLabel control={<Checkbox checked = {task.checked} />} label={task.name} />
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Checklist;