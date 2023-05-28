import {Button, InputAdornment, TextField} from "@mui/material";
import "./Budget.css";
import * as React from "react";
import {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from "@mui/material/IconButton";
import Category from "./Category";
import SearchIcon from '@mui/icons-material/Search';
import music from "../../Pictures/category/music.png";
import food from "../../Pictures/category/food.png";
import clothes from "../../Pictures/category/clothes.png";
import other from "../../Pictures/category/other.png";

const Budget = () => {
    const [totalBudget, setTotalBudget] = useState("");
    const [isEditable, setIsEditable] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('');
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(1);

    useEffect(() => {
        loadBudget();
        loadCategories();
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

    const loadCategories = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getCategories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setCategories(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const handleNewCategoryNameChange = (event) => {
        setNewCategoryName(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const handleAddExpense = (expenseName, expenseCost, categoryId) => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        fetch('http://localhost:3001/createExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: expenseName, value: expenseCost, categoryId: categoryId}),
        }).then(async (response) => {
            if (response.status === 200) {
                setNewCategoryName("");
                loadCategories();
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }

    const handleAddCategory = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        fetch('http://localhost:3001/createCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: newCategoryName, userEmail: loggedInUser, iconNumber: selectedIcon}),
        }).then(async (response) => {
            if (response.status === 200) {
                setNewCategoryName("");
                loadCategories();
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
        }).then(async (response) => {
            if (response.status === 200) {
                loadCategories()
            }
        })
    }

    const handleDeleteCategory = (id) => {
        fetch('http://localhost:3001/deleteCategory', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        }).then(async (response) => {
            if (response.status === 200) {
                loadCategories()
            }
        })
    }

    const calculateTotalExpensesForCategory = (category) => {
        let total = 0;
        category.expenses.forEach(expense => {
            total = total + expense.value
        });

        return total;
    }

    const calculateExpense = () => {
        let totalExpenses = 0;

        categories.forEach(item => {
            totalExpenses = totalExpenses + calculateTotalExpensesForCategory(item);
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
        <div className="budgetContainer">
            <div className="budgetBanner">
                <h3>My budget planner</h3>
                <div className="budgetForm">
                    <div className="BudgetEdit">
                        <TextField
                            disabled={!isEditable}
                            value={totalBudget}
                            defaultValue={totalBudget}
                            onChange={handleTotalBudgetChange}
                            id="standard-disabled"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
                                ),
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            style={textFieldStyle}
                            label="Budget" variant="standard"/>
                    </div>
                    <TextField
                        id="standard-basic"
                        disabled={true}
                        label="Remaining"
                        value={calculateRemaining()}
                        defaultValue={calculateRemaining()}
                        variant="standard"
                        InputProps={{
                            ...inputPropsStyle,
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        style={textFieldStyle}/>
                    <TextField
                        id="standard-basic"
                        label="Spent so far"
                        disabled={true}
                        value={calculateExpense()}
                        defaultValue={calculateExpense()}
                        variant="standard"
                        InputProps={{
                            ...inputPropsStyle,
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        style={textFieldStyle}/>
                </div>
            </div>
            <div className="budgetContent">
                <div className="budgetCategories">
                    <div className="budgetSearchContainer">
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <IconButton size="small">
                                        <SearchIcon fontSize="small"/>
                                    </IconButton>
                                </InputAdornment>,
                            }}
                            style={{width: "100%"}}
                            onChange={handleSearchChange}
                            id="standard-basic"
                            label="Search..."
                            variant="standard"/>

                    </div>
                    <div className="budgetExpenseContainer">
                        {
                            categories
                                .filter(category => {
                                    return search ? category.expenses.filter(expense => expense.name.toLowerCase().includes(search)).length > 0 : true;
                                })
                                .map((category) => {
                                    return (<Category
                                            search={search}
                                            category={category}
                                            handleAddExpense={handleAddExpense}
                                            handleDeleteExpense={handleDeleteExpense}
                                            handleDeleteCategory={handleDeleteCategory}
                                        />
                                    )
                                })
                        }
                    </div>

                </div>
                <div className="addCategoryContainer">
                    <h3>Add new category</h3>
                    <div className="addCategoryFormContainer">
                        <TextField
                            fullWidth
                            size="small"
                            onChange={handleNewCategoryNameChange}
                            id="outlined-basic"
                            label="Name"
                            value={newCategoryName}
                            variant="outlined"/>
                        <div className="categoryIconsContainer">
                            <div
                                className={`categoryIconCard ${selectedIcon === 1 ? "categoryIconSelected" : ""}`}
                                onClick={() => setSelectedIcon(1)}
                            >
                                <img className="categoryIconCardImg" src={music}/>
                            </div>
                            <div
                                className={`categoryIconCard ${selectedIcon === 2 ? "categoryIconSelected" : ""}`}
                                onClick={() => setSelectedIcon(2)}>
                                <img className="categoryIconCardImg" src={food}/>
                            </div>
                            <div
                                className={`categoryIconCard ${selectedIcon === 3 ? "categoryIconSelected" : ""}`}
                                onClick={() => setSelectedIcon(3)}>
                                <img className="categoryIconCardImg" src={clothes}/>
                            </div>
                            <div
                                className={`categoryIconCard ${selectedIcon === 4 ? "categoryIconSelected" : ""}`}
                                onClick={() => setSelectedIcon(4)}>
                                <img className="categoryIconCardImg" src={other}/>
                            </div>
                        </div>
                        <div className="addCategoryButtonWrapper">
                            <Button style={{width: "100%"}} onClick={handleAddCategory} variant="contained">Add</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Budget;