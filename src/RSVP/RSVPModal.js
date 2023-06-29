import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import "./RSVPModal.css";
import PersonIcon from "@mui/icons-material/Person";

const RSVPModal = ({guest, userEmail, show, handleClose}) => {
    const [step, setStep] = useState(1);
    const [confirmed, setConfirmed] = useState(false);
    const [seats, setSeats] = useState([]);
    const [guestList, setGuestList] = useState([]);

    useEffect(() => {
        getSeats();
        loadGuestList();
    }, [])

    useEffect(() => {
        if (guest?.confirmed) {
            setStep(2);
            setConfirmed(true);
        }
    }, [guest])

    const getModalTitle = () => {
        if (step === 1) {
            return "Can you be present?";
        } else {
            if (confirmed) {
                return `Hello ${guest.name}, please select a seat (not mandatory)`;
            } else {
                return "Thank you anyway!";
            }
        }
    };

    const getSeats = () => {

        try {
            fetch('http://localhost:3001/getSeats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail}),
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

    const loadGuestList = () => {

        try {
            fetch('http://localhost:3001/getGuests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail}),
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

    const handleSelectSeat = (seatId) => {
        console.log("clickedddddd")
        try {
            fetch('http://localhost:3001/assignGuest', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({guestId: guest.id, seatingId: seatId}),
            }).then(async (response) => {
                if (response.status === 200) {
                    getSeats();
                    loadGuestList();
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const handleGuestConfirmation = (confirmation) => {
        try {
            fetch('http://localhost:3001/addGuestConfirmation', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({guestId: guest.id, confirmation}),
            }).then(async (response) => {
                if (response.status === 200) {
                    getSeats();
                    loadGuestList();
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const handleYes = () => {
        handleGuestConfirmation(true);
        setConfirmed(true);
        setStep(2);
    }

    const handleNo = () => {
        handleGuestConfirmation(false);
        setConfirmed(false);
        setStep(2);
    }

    return (
        <Dialog
            maxWidth="lg"
            open={show && guest}
            onClose={handleClose}
        >
            <DialogTitle>{getModalTitle()}</DialogTitle>
            <DialogContent>
                {
                    step === 1 ? <div className="confirmationActionsContainer">
                        <Button
                            onClick={handleYes}
                            style={{height: "50px"}}
                            variant="contained">
                            Yes
                        </Button>
                        <Button
                            onClick={handleNo}
                            style={{height: "50px"}}
                            variant="contained">
                            No
                        </Button>

                    </div> : null
                }
                {
                    step === 2 && confirmed ?
                        <div className="rsvpModalSeatsContainer">
                            <div className="rsvpSeatingCardsList">
                                {seats
                                    .map((table, index) => {
                                        return (
                                            <div className="rsvpSeatingCard">
                                                <div className="rsvpSeatingCardHeader">
                                                    <div>{`${table.name}`}</div>
                                                </div>
                                                <div className="rsvpSeatingCardBody">
                                                    <div className="rsvpSeatingCardBodyGuestList">
                                                        {
                                                            guestList
                                                                .filter(item => item.seating_id === table.id)
                                                                .map(item => {
                                                                    return <div className="rsvpSeatingGuest">
                                                                        <div className="rsvpSeatingGuestText">
                                                                            <PersonIcon/>
                                                                            {item.name}
                                                                        </div>
                                                                    </div>
                                                                })
                                                        }
                                                    </div>
                                                    <div className="rsvpSelectButton">
                                                        <Button
                                                            onClick={() => handleSelectSeat(table.id)}
                                                            style={{width: "100px", height: "40px"}}
                                                            variant="contained">Select</Button>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                            </div>
                        </div> : null
                }
            </DialogContent>
            <DialogActions>
                {step === 2 && confirmed ? <Button onClick={handleClose}>Done</Button> : null}
            </DialogActions>
        </Dialog>
    )
}

export default RSVPModal