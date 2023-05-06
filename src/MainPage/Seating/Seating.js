import "./Seating.css";
import {Button, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

const Seating = () => {

    const [mockData, setMockData] = useState([
        {
            name: "First table",
        },
        {
            name: "Second table",
        },
        {
            name: "Third table",
        }
    ]);

    const [table, setTable] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleAddTable = () => {
        const newTable = {
            name: table
        }
        setMockData(current => [...current, newTable]);
        setTable("");
    }

    return (
        <div className="seatingContainer">
            <div className="seatingCards">
                {mockData
                    .map((table, index) => {
                        return (
                            <div className="seatingCard">
                                <div className="seatingCardHeader">
                                    <div>{`Table: ${table.name}`}</div>
                                </div>
                                <div className="seatingCardBody">
                                    <TextField
                                        sx={{
                                            width: {sm: 200},
                                            "& .MuiInputBase-root": {
                                                height: 40
                                            }
                                        }}
                                        inputProps={{style: {fontSize: 5}}}
                                        id="outlined-basic"
                                        label="Enter guest name"
                                    />
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
