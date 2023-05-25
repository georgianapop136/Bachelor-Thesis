import "./GuestList.css";
import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {Button, TextField} from "@mui/material";

const GuestList = () => {
    const [guestList, setGuestList] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        loadGuestList();
    }, [])

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

    const handleAddGuest = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        fetch('http://localhost:3001/createGuest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, userEmail: loggedInUser}),
        }).then(async (response) => {
            if (response.status === 200) {
                setName("");
                loadGuestList()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }


    const handleDeleteGuest = (guestId) => {
        fetch('http://localhost:3001/deleteGuest', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: guestId}),
        }).then(async (response) => {
            if (response.status === 200) {
                loadGuestList()
            }
        })
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div className="guestContainer">
            <div>
                <TextField
                onChange={handleNameChange}
                className="checkListTaskInput"
                id="outlined-basic"
                label="Guest name"
                value={name}
                variant="outlined"/>

                <Button onClick={handleAddGuest} className="guestListAddButton" variant="contained">Add guest</Button>

            </div>

            <div className="guestTable">
                <Table striped>
                    <thead>
                    <tr>
                        <th>Nr.</th>
                        <th>Name</th>
                        <th>Confirmed</th>
                        <th>Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        guestList.map((guest, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{guest.name}</td>
                                    <td>{guest.confirmed ? "Yes" : "No"}</td>
                                    <td>
                                        <a href={"http://localhost:3000/RSVP?name=" + encodeURIComponent(guest.name)}
                                           target="_blank"> Link to invitation </a>
                                    </td>
                                    <td>
                                        <IconButton onClick={() => handleDeleteGuest(guest.id)} aria-label="delete"
                                                    color="primary">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        </div>

    );
}

export default GuestList;