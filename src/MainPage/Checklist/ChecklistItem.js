import {Button, Checkbox, FormControlLabel, MenuItem, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useEffect, useState} from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from "@mui/material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

const ITEM_HEIGHT = 48;

const ChecklistItem = ({
                           handleCheckSubtask,
                           handleDeleteSubtask,
                           handleAddSubtask,
                           task,
                           handleCheckbox,
                           handleDeleteTask
                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayAddSubtask, setDisplayAddSubtask] = useState(false);
    const [subtaskName, setSubtaskName] = useState("");

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
            setDisplayAddSubtask(false)
        }
        setIsOpen(open => !open);
    }

    const isCompleted = task.checked ||
        (task.subtasks.length > 0 && task.subtasks.filter(subtask => subtask.checked).length === task.subtasks.length);

    useEffect(() => {
        let widthPercentage = 0;

        if (task.subtasks.length > 0 || task.checked) {
            const elementPercentage = 100 / task.subtasks.length;
            const checkedSubtasks = task.subtasks.filter(subtask => subtask.checked).length;
            widthPercentage = task.checked ? 100 : elementPercentage * checkedSubtasks;
        }

        const subtaskPercentage = document.getElementById('subtaskPercentage_' + task.id);
        subtaskPercentage.style.width = `${widthPercentage}%`;

    }, [task, task.subtasks, task.checked])

    return (
        <div className={`checklistItemContainer`}>
            <div className={`checkListTaskStyle ${isOpen ? '' : 'withBorderBottom'}`}>
                <div id={"subtaskPercentage_" + task.id}
                     className={`subtaskPercentageStyle ${isCompleted ? 'completedChecklist withBorderTopRight' : ''} ${!isOpen && isCompleted ? 'withBorderBottomRight' : ''}`}/>
                <FormControlLabel control={
                    <Checkbox
                        onClick={() => handleCheckbox(task.id, !task.checked)}
                        checked={task.checked}/>}
                                  label={<div className={`${isCompleted ? 'completedTextDecoration' : ''}`}>
                                      {task.name}
                                  </div>}/>
                <div className="checklistDate">{task.month}</div>
                <div className="checklistActionContainer">
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
                                setDisplayAddSubtask(true)
                                setIsOpen(true)
                                handleClose()
                            }}>
                                Add subtask
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleDeleteTask(task.id)
                                handleClose()
                            }}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className="subtaskStatus">
                        {`${task.subtasks.filter(subtask => subtask.checked).length}/${task.subtasks.length}`}
                    </div>
                    <IconButton size="small" onClick={handleIsOpen} color="primary">
                        {isOpen ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                    </IconButton>
                </div>
            </div>

            <div className={`heightTransition ${isOpen ? 'subtaskContainer' : 'hiddenSubtaskContainer'}`}>
                <p>Subtasks</p>
                {
                    task.subtasks.map(subtask => {
                        return (
                            <div className="subtaskStyle">
                                <FormControlLabel control={
                                    <Checkbox
                                        onClick={() => handleCheckSubtask(subtask.id, !subtask.checked, task.id)}
                                        checked={subtask.checked}/>}
                                                  label={subtask.name}/>
                                <IconButton onClick={() => handleDeleteSubtask(subtask.id)} aria-label="delete"
                                            color="primary">
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        )
                    })
                }
                {task.subtasks.length === 0 ? <p>No subtasks to display</p> : null}
                {displayAddSubtask ? <div className="addSubtaskContainer">
                    <TextField
                        onChange={(e) => setSubtaskName(e.target.value)}
                        className="subtaskInput"
                        label="Subtask name"
                        value={subtaskName}
                        size="small"
                        variant="outlined"/>

                    <Button onClick={() => {
                        handleAddSubtask(subtaskName, task.id)
                        setSubtaskName("")
                        setDisplayAddSubtask(false)
                    }} variant="contained">Add subtask</Button>
                </div> : null}
            </div>
        </div>
    )
}

export default ChecklistItem