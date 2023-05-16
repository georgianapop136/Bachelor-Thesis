import * as React from 'react';
import {useEffect, useState} from 'react';
import "./Invitation.css";
import {Button, TextField} from "@mui/material";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import NoAnimationRSVP from "../../RSVP/NoAnimationRSVP";

const Invitation = () => {

    const [invitationId, setInvitationId] = useState(undefined);
    const [invitationName, setInvitationName] = useState("");
    const [invitationDate, setInvitationDate] = useState(dayjs());
    const [invitationDescription, setInvitationDescription] = useState("")

    useEffect(() => {
        loadInvitation();
    }, [])

    const loadInvitation = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getInvitation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setInvitationId(result.id);
                    setInvitationName(result.name);
                    setInvitationDescription(result.description);
                    setInvitationDate(dayjs(result.wedding_date) || dayjs());
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const handleCoupleNamesChanged = (event) => {
        setInvitationName(event.target.value)
    }

    const handleInvitationDate = (newValue) => {
        setInvitationDate(newValue)
    }

    const handleDetails = (event) => {
        setInvitationDescription(event.target.value)
    }

    const handleUpdateInvitation = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        //     const {name, id, description, weddingDate} = req.body;
        fetch('http://localhost:3001/updateInvitation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: invitationName, id: invitationId, description: invitationDescription, weddingDate: invitationDate}),
        }).then(async (response) => {
            if (response.status === 200) {
                loadInvitation()
            }
        }).catch(error => {
            console.error('Error while fetching data', error);
        })
    }

    return (
        <div className="invitationContainer">
            <div className="invitationBuilder">
                <div className="invitationCustomizer">
                    <div className="invitationCustomizerTitle">Build your own invitation here!</div>
                    <TextField
                        value={invitationName}
                        onChange={handleCoupleNamesChanged}
                        sx={{
                            width: {sm: 230},
                            "& .MuiInputBase-root": {
                                height: 40
                            }
                        }}
                        inputProps={{style: {fontSize: 13}}}
                        id="outlined-basic"
                        label="Names of the happy couple!"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DateField
                                label="Choose your magical date!"
                                value={invitationDate}
                                onChange={handleInvitationDate}
                                format="DD/MM/YYYY"
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <TextField
                        value={invitationDescription}
                        onChange={handleDetails}
                        sx={{
                            width: {sm: 230},
                            "& .MuiInputBase-root": {}
                        }}
                        label="Say something to your guests!"
                        multiline
                        rows={3}
                        inputProps={{style: {fontSize: 13}, maxLength: 125}}
                    />
                    <Button onClick={handleUpdateInvitation} variant="contained">Save</Button>

                </div>
                <div className="invitationLook flowers1">
                    <div className="invitationContent">
                        <NoAnimationRSVP nameOfTheHappyCouple={invitationName} weddingDate={invitationDate.isValid() ? invitationDate.format('DD/MM/YYYY').toString() : ""} weddingLocation={invitationDescription}/>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Invitation;