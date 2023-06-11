import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import "./Checklist.css";
import {useEffect, useState} from "react";
import ChecklistItem from "./ChecklistItem";
import ChecklistProgress from "./ChecklistProgress";


export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Checklist = () => {
    const [month, setMonth] = useState('');
    const [task, setTask] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState(1);

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
            }).then(async (response) => {
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
        }).then(async (response) => {
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
        }).then(async (response) => {
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
        }).then(async (response) => {
            if (response.status === 200) {
                getChecklist()
            }
        })
    }

    const handleAddSubtask = (subtaskName, taskId) => {
        fetch('http://localhost:3001/createSubtask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: subtaskName, checklistId: taskId}),
        }).then(async (response) => {
            if (response.status === 200) {
                getChecklist()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }

    const handleDeleteSubtask = (subtaskId) => {
        fetch('http://localhost:3001/deleteSubtask', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: subtaskId}),
        }).then(async (response) => {
            if (response.status === 200) {
                getChecklist()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }

    const handleCheckSubtask = (itemId, isChecked, taskId) => {
        fetch('http://localhost:3001/setSubtask', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: itemId, isChecked, taskId}),
        }).then(async (response) => {
            if (response.status === 200) {
                getChecklist()
            }
        })
    }


    const handleChecklistSort = (item1, item2) => {
        if (selectedSortOption === 1) {
            const monthA = months.indexOf(item1.month);
            const monthB = months.indexOf(item2.month);
            return monthA - monthB;
        } else if (selectedSortOption === 2) {
            const valueA = item1.checked;
            const valueB = item2.checked;

            if (valueA === valueB) {
                return 0;
            }

            if (valueA) {
                return -1;
            }

            return 1;
        } else {
            const valueA = item1.checked;
            const valueB = item2.checked;

            if (valueA === valueB) {
                return 0;
            }

            if (valueA) {
                return 1;
            }

            return -1;
        }

    }


    return (
        <div className="checkListContainer">
            <ChecklistProgress checklist={checklist}/>
            <div className="checklistSeparator"/>
            <div className="sortTaskContainer">
                <h5 className="checklistTitles">Sort by</h5>
                <div className="checklistSortOptionsContainer">
                    <div
                        className={`checklistSortOption checklistLeftSortOption ${selectedSortOption === 1 ? 'checklistSelectedSortOption' : null}`}
                        onClick={() => setSelectedSortOption(1)}
                    >
                        Month
                    </div>
                    <div
                        className={`checklistSortOption ${selectedSortOption === 2 ? 'checklistSelectedSortOption' : null}`}
                        onClick={() => setSelectedSortOption(2)}
                    >
                        Completed
                    </div>
                    <div
                        className={`checklistSortOption checklistRightSortOption ${selectedSortOption === 3 ? 'checklistSelectedSortOption' : null}`}
                        onClick={() => setSelectedSortOption(3)}
                    >
                        To Do
                    </div>
                </div>

            </div>
            <div className="addTaskWrapper">
                <h5 className="checklistTitles">Create task</h5>
                <div className="addTaskContainer">
                    <TextField
                        onChange={handleTaskChange}
                        className="checkListTaskInput"
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
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                        </Select>
                    </FormControl>

                    <Button onClick={handleAddTask} className="checkListAddButton" variant="contained">Add task</Button>
                </div>
            </div>
            <div className="checklistSeparator"/>
            <div className="checkListTasksContainer">
                {
                    checklist
                        .sort(handleChecklistSort)
                        .map((task) => {
                            return <ChecklistItem
                                task={task}
                                handleCheckbox={handleCheckbox}
                                handleAddSubtask={handleAddSubtask}
                                handleCheckSubtask={handleCheckSubtask}
                                handleDeleteSubtask={handleDeleteSubtask}
                                handleDeleteTask={handleDeleteTask}/>
                        })
                }
            </div>
        </div>
    )
}

export default Checklist;