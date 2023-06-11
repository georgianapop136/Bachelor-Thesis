import "./Seating.css";
import {Button, List, ListItem, ListItemButton, ListItemText, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

const Seating = () => {

    const [seats, setSeats] = useState([]);
    const [table, setTable] = useState('');
    const [show, setShow] = useState(false);
    const [guestList, setGuestList] = useState([]);


    useEffect(() => {
        getSeats();
        loadGuestList();
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getSeats = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getSeats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setSeats(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }


    const handleAddTable = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        fetch('http://localhost:3001/createSeat ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: table, userEmail: loggedInUser}),
        }).then(async (response) => {
            if (response.status === 200) {
                setTable("");
                getSeats()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })

    }

    const handleDeleteTable = (tableId) => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        fetch('http://localhost:3001/deleteSeat ', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: tableId}),
        }).then(async (response) => {
            if (response.status === 200) {
                getSeats()
                loadGuestList()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })

    }

    const loadGuestList = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getGuests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setGuestList(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const onDragEnd = (data) => {
        if (!data.destination) {
            console.log('No destination found')
            return;
        }

        const guestId = +data.draggableId;
        const seatingId = +data.destination.droppableId;

        try {
            fetch('http://localhost:3001/assignGuest', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({guestId, seatingId}),
            }).then(async (response) => {
                if (response.status === 200) {
                    await loadGuestList();
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const removeGuestFromTable = (id) => {
        fetch('http://localhost:3001/removeGuestFromSeating ', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({guestId: id}),
        }).then(async (response) => {
            if (response.status === 200) {
                loadGuestList()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="seatingContainer">
                <div className="seatingCardsWrapper">
                    <div className="seatingCardsList">
                        {seats
                            .map((table, index) => {
                                return (
                                    <Droppable key={table.id} droppableId={table.id + ''}>
                                        {(provided) => (
                                            <div ref={provided.innerRef}
                                                 {...provided.droppableProps}
                                                 style={{
                                                     ...provided.droppableProps.style,
                                                     zIndex: -1,
                                                 }}
                                                 className="seatingCard">
                                                <div className="seatingCardHeader">
                                                    <div>{`${table.name}`}</div>
                                                    <IconButton onClick={() => handleDeleteTable(table.id)}
                                                                aria-label="delete"
                                                                color="secondary">
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </div>
                                                <div className="seatingCardBody">
                                                    {
                                                        guestList
                                                            .filter(item => item.seating_id === table.id)
                                                            .map(item => {
                                                                return <div className="seatingGuest">
                                                                    <div className="seatingGuestTitleAndDelete">
                                                                        <div className="seatingGuestText">
                                                                            <PersonIcon/>
                                                                            {item.name}
                                                                        </div>
                                                                        <div>
                                                                            <IconButton
                                                                                onClick={() => removeGuestFromTable(item.id)}
                                                                                aria-label="delete"
                                                                                color="primary">
                                                                                <CloseIcon fontSize="small"/>
                                                                            </IconButton>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="seatingGuestText">{item.confirmed ? "Confirmed" : "Awaiting confirmation"}</div>
                                                                </div>
                                                            })
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                )
                            })}
                    </div>
                    <div className="seatingAddTable"><Button onClick={handleShow} variant="outlined">Create new
                        table</Button></div>
                </div>


                <div>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div className="seatingGuestListContainer"
                                 ref={provided.innerRef} {...provided.droppableProps}>
                                <div className="seatingGuestListHeader">
                                    Guest List
                                </div>
                                <div className="seatingGuestListBody">
                                    <List>
                                        {guestList
                                            .filter(item => !item.seating_id)
                                            .map((guest, index) => (
                                                <Draggable key={guest.id} draggableId={guest.id + ''} index={index}>
                                                    {(draggableProvided) => (
                                                        <div
                                                            ref={draggableProvided.innerRef}
                                                            {...draggableProvided.draggableProps}
                                                            {...draggableProvided.dragHandleProps}
                                                            style={{
                                                                ...draggableProvided.draggableProps.style,
                                                                zIndex: 9999, // Modify the zIndex values as per your requirements
                                                            }}
                                                        >
                                                            <ListItem disablePadding>
                                                                <ListItemButton>
                                                                    <ListItemIcon>
                                                                        <PersonIcon/>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={guest.name}/>
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                    </List>
                                </div>

                            </div>
                        )}
                    </Droppable>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new table</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Table name:</Form.Label>
                                <Form.Control
                                    // type=""
                                    // placeholder=""
                                    autoFocus
                                    animation
                                    centered
                                    value={table}
                                    onChange={(event) => setTable(event.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            handleAddTable()
                            handleClose()
                        }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </DragDropContext>


    );

}
export default Seating;
