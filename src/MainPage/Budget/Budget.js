import {InputAdornment, TextField} from "@mui/material";
import "./Budget.css";
import {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from "@mui/material/IconButton";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Stack from '@mui/material/Stack';

const Budget = () => {
    const [totalBudget, setTotalBudget] = useState("");
    const [isEditable, setIsEditable] = useState(false)
    const [expense, setExpense] = useState('');
    const [cost, setCost] = useState('');
    const [search, setSearch] = useState('');
    const [expenseList, setExpenseList] = useState([]);


    useEffect(() => {
        loadBudget();
        loadExpenses();
    }, [])

    const inputPropsStyle = {style: {height: "50px"}};
    const textFieldStyle = {width: "200px", height: "50px"};

    const loadBudget = () => {
        try {
            const userEmail = sessionStorage.getItem("loggedInUser");

            fetch('http://localhost:3001/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: userEmail}),
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (data.user.budget !== null) {
                            setTotalBudget(data.user.budget)
                        }
                    })
                }
            });
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const loadExpenses = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getExpenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async(response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setExpenseList(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

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
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        fetch('http://localhost:3001/createExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: expense, value: cost, userEmail: loggedInUser}),
        }).then(async(response) => {
            if (response.status === 200) {
                setExpense("");
                setCost("");
                loadExpenses();
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }

    const handleDeleteExpense = (id) => {
        fetch('http://localhost:3001/deleteExpense', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        }).then(async(response) => {
            if (response.status === 200) {
                loadExpenses()
            }
        })
    }

    const calculateExpense = () => {
        let totalExpenses = 0;

        expenseList.forEach(item => {
            totalExpenses = totalExpenses + item.value;
        })

        return totalExpenses;
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

    const handleSaveBudget = () => {
        const userEmail = sessionStorage.getItem("loggedInUser");

        fetch('http://localhost:3001/updateBudget', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: userEmail, budget: totalBudget}),
        }).then(() => {
            setIsEditable(false)
        })
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
                                        <IconButton onClick={handleSaveBudget} size="small">
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
                        expenseList
                            .filter(item => {
                                return item.name.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((expense) => {
                                return (
                                    <div className="budgetExpenseStyle">
                                        <div className="budgetExpenseName">{expense.name}</div>
                                        <div>{expense.value}</div>
                                        <IconButton onClick={() => handleDeleteExpense(expense.id)} aria-label="delete"
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