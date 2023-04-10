import {InputAdornment, TextField} from "@mui/material";
import "./Budget.css";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from "@mui/material/IconButton";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const Budget = () => {
    const [totalBudget, setTotalBudget] = useState('10000');

    const [isEditable, setIsEditable] = useState(false)
    // const handleBudgetEdit = () => {
    //     const newTask = {
    //         name: "",
    //         budget: "",
    //         remaining: "",
    //         spent: ""
    //     }

    const inputPropsStyle = {style: {height: "50px"}};
    const textFieldStyle = {width: "200px", height: "50px"};


    const [mockData, setMockData] = useState([
        {
            name: "First expense",
            cost: 325,
        },
        {
            name: "Second expense",
            cost: 463,
        },
        {
            name: "Third expense",
            cost: 721,
        }
    ]);


    const [expense, setExpense] = useState('');
    const [cost, setCost] = useState('');
    const [search, setSearch] = useState('');

    const handleExpenseChange = (event) => {
        setExpense(event.target.value);
    };

    const handleCostChange = (event) => {
        setCost(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const handleAddExpense = () => {
        const newExpense = {
            name: expense,
            cost: parseInt(cost, 10),
        }

        setMockData(current => [...current, newExpense]);
        setExpense("");
        setCost("");
    }

    const handleDeleteExpense = (index) => {
        const temp = [...mockData];
        temp.splice(index, 1);
        setMockData(temp);
    }

    const calculateExpense = () => {
        let total = 0;
        mockData.forEach(item => {
            total = total + item.cost;
        })

        return total;
    }

    const handleTotalBudgetChange = (event) => {
        if (event.target.value === undefined) {
            setTotalBudget("")
        } else {
            setTotalBudget(event.target.value);
        }

    }

    const calculateRemaining = () => {
        if (!totalBudget) {
            return "-"
        }
        return parseInt(totalBudget, 10) - calculateExpense()

    }


    return (
        <div className="BudgetContainer">
            <h3>My budget planner</h3>
            <div className="BudgetForm">
                <div className="BudgetEdit">
                    <TextField
                        disabled={!isEditable}
                        value={totalBudget}
                        defaultValue={totalBudget}
                        onChange={handleTotalBudgetChange}
                        id="outlined-disabled"
                        InputProps={{
                            style: {height: "50px"},
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isEditable === false ?
                                        <IconButton onClick={() => setIsEditable(true)} size="small">
                                            <EditIcon fontSize="small"/>
                                        </IconButton> :
                                        <IconButton onClick={() => setIsEditable(false)} size="small">
                                            <SaveIcon fontSize="small"/>
                                        </IconButton>}
                                </InputAdornment>
                            )
                        }}
                        style={textFieldStyle}
                        label="Budget" variant="outlined"/>


                </div>
                <TextField
                    id="outlined-basic"
                    disabled={true}
                    label="Remaining"
                    value={calculateRemaining()}
                    defaultValue={calculateRemaining()}
                    variant="outlined"
                    InputProps={inputPropsStyle}
                    style={textFieldStyle}/>
                <TextField
                    id="outlined-basic"
                    label="Spent so far"
                    disabled={true}
                    value={calculateExpense()}
                    defaultValue={calculateExpense()}
                    variant="outlined"
                    InputProps={inputPropsStyle}
                    style={textFieldStyle}/>
            </div>
            <h3>Add Expense</h3>
            <div className="addExpenseContainer">
                <TextField
                    onChange={handleExpenseChange}
                    className="budgetExpenseInput"
                    id="outlined-basic"
                    label="Name"
                    value={expense}
                    variant="outlined"/>

                <TextField
                    onChange={handleCostChange}
                    className="budgetCostInput"
                    id="outlined-basic"
                    label="Cost"
                    value={cost}
                    type="number"
                    variant="outlined"/>


                <Button onClick={handleAddExpense} className="budgetAddButton" variant="contained">Add</Button>
            </div>
            <div>
                <Stack spacing={2} sx={{width: 300}}>

                    <TextField
                        onChange={handleSearchChange}
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"/>

                </Stack>
                <div className="budgetExpenseContainer">
                    {
                        mockData
                            .filter(item => {
                                return item.name.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((expense, index) => {
                                return (
                                    <div className="budgetExpenseStyle">
                                        <div className="budgetExpenseName">{expense.name}</div>
                                        <div>{expense.cost}</div>
                                        <IconButton onClick={() => handleDeleteExpense(index)} aria-label="delete"
                                                    color="primary">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </div>
                                )
                            })
                    }
                </div>

            </div>
        </div>
    )
}


export default Budget;