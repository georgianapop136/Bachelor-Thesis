import {Button, MenuItem, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from "@mui/material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import "./Category.css"
import music from "../../Pictures/category/music.png";
import food from "../../Pictures/category/food.png";
import clothes from "../../Pictures/category/clothes.png";
import other from "../../Pictures/category/other.png";

const ITEM_HEIGHT = 48;

const Category = ({search, handleAddExpense, category, handleDeleteCategory, handleDeleteExpense}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayAddExpense, setDisplayAddExpense] = useState(false);
    const [expenseName, setExpenseName] = useState("");
    const [expenseCost, setExpenseCost] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleIsOpen = () => {
        if (isOpen) {
            setDisplayAddExpense(false)
        }
        setIsOpen(open => !open);
    }

    const calculateAllExpenses = () => {
        let total = 0;
        category.expenses.forEach(expense => {
            total = total + expense.value;
        })

        return total;
    }

    const getIconForCategory = () => {
        if (category.icon_number === 1) {
            return <img className="categoryIconStyle" src={music}/>
        } else if (category.icon_number === 2) {
            return <img className="categoryIconStyle" src={food}/>
        } else if (category.icon_number === 3) {
            return <img className="categoryIconStyle" src={clothes}/>
        } else if (category.icon_number === 4) {
            return <img className="categoryIconStyle" src={other}/>
        }
    }

    return (
        <div className={`categoryItemContainer`}>
            <div className={`categoryStyle ${isOpen ? '' : 'categoryWithBorderBottom'}`}>
                <div className="categoryName">
                    {getIconForCategory()}
                    {category.name}
                </div>
                <div className="categoryActionContainer">
                    <div>
                        <IconButton
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={() => {
                                setDisplayAddExpense(true)
                                setIsOpen(true)
                                handleClose()
                            }}>
                                Add expense
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleDeleteCategory(category.id)
                                handleClose()
                            }}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className="categoryTotalExpense">
                        {`${calculateAllExpenses()} $`}
                    </div>
                    <IconButton size="small" onClick={handleIsOpen} color="primary">
                        {isOpen ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                    </IconButton>
                </div>
            </div>
            <div className={`heightTransition ${isOpen ? 'categoryExpenseContainer' : 'hiddenExpenseContainer'}`}>
                <p>Expenses</p>
                {
                    category.expenses.map(expense => {
                        return (
                            <div className="categoryExpenseStyle">
                                <div>{expense.name}</div>
                                <div className="categoryExpenseDetails">
                                    <div>{`${expense.value} $`}</div>
                                    <IconButton onClick={() => handleDeleteExpense(expense.id)} aria-label="delete"
                                                color="primary">
                                        <CloseIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        )
                    })
                }
                {category.expenses.length === 0 ? <p>No expenses to display</p> : null}
                {displayAddExpense ? <div className="categoryAddExpenseContainer">
                    <TextField
                        onChange={(e) => setExpenseName(e.target.value)}
                        className="categoryExpenseInput"
                        label="Name"
                        value={expenseName}
                        size="small"
                        variant="outlined"/>
                    <TextField
                        onChange={(e) => setExpenseCost(e.target.value)}
                        className="categoryExpenseInput"
                        label="Cost"
                        value={expenseCost}
                        size="small"
                        variant="outlined"/>

                    <Button onClick={() => {
                        handleAddExpense(expenseName, expenseCost, category.id)
                        setExpenseName("")
                        setExpenseCost("")
                        setDisplayAddExpense(false)
                    }} variant="contained">Add expense</Button>
                </div> : null}
            </div>
        </div>
    )
}

export default Category