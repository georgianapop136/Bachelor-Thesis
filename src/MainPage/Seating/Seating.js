import "./Seating.css";
import {Button, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const Seating = () => {

    const [seats, setSeats] = useState([]);
    const [table, setTable] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        getSeats();
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
            }).then(async(response) => {
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
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })

    }

    return (
        <div className="seatingContainer">
            <div className="seatingCards">
                {seats
                    .map((table, index) => {
                        return (
                            <div className="seatingCard">
                                <div className="seatingCardHeader">
                                    <div>{`${table.name}`}</div>
                                    <IconButton onClick={() => handleDeleteTable(table.id)} aria-label="delete" color="secondary">
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                                <div className="seatingCardBody">

                                </div>
                            </div>
                        )
                    })}

            </div>
            <div className="seatingAddTable"><Button onClick={handleShow} variant="outlined">Create new
                table</Button></div>


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
                                onChange = {(event) => setTable(event.target.value)}
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
    );

}
export default Seating;
