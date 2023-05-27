import * as React from 'react';
import {useEffect, useState} from 'react';
import "./Invitation.css";
import {Button, TextField} from "@mui/material";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import NoAnimationRSVP from "../../RSVP/NoAnimationRSVP";
import flowers1 from "../../Pictures/theme/flowers1.jpeg";
import flowers2 from "../../Pictures/theme/flowers2.jpg";
import flowers3 from "../../Pictures/theme/flowers3.jpeg";

const Invitation = () => {
    const [invitationId, setInvitationId] = useState(undefined);
    const [invitationName, setInvitationName] = useState("");
    const [invitationDate, setInvitationDate] = useState(dayjs());
    const [invitationDescription, setInvitationDescription] = useState("")
    const [selectedTheme, setSelectedTheme] = useState(1)

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
                    setSelectedTheme(result.selected_theme || 1);
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

        fetch('http://localhost:3001/updateInvitation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: invitationName,
                id: invitationId,
                description: invitationDescription,
                weddingDate: invitationDate,
                selectedTheme
            }),
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
                        size="small"
                        style={{width: "90%"}}
                        id="outlined-basic"
                        label="Names of the happy couple!"
                    />
                    <div className="invitationThemeContainer">
                        <div
                            className={`invitationThemeCard ${selectedTheme === 1 ? "invitationThemeSelected" : ""}`}
                            onClick={() => setSelectedTheme(1)}
                        >
                            <img className="invitationThemeImg" src={flowers1}/>
                            <div className="invitationThemeCardText">
                                Flowers 1
                            </div>
                        </div>
                        <div
                            className={`invitationThemeCard ${selectedTheme === 2 ? "invitationThemeSelected" : ""}`}
                            onClick={() => setSelectedTheme(2)}>
                            <img className="invitationThemeImg" src={flowers2}/>
                            <div className="invitationThemeCardText">
                                Flowers 2
                            </div>
                        </div>
                        <div
                            className={`invitationThemeCard ${selectedTheme === 3 ? "invitationThemeSelected" : ""}`}
                            onClick={() => setSelectedTheme(3)}>
                            <img className="invitationThemeImg" src={flowers3}/>
                            <div className="invitationThemeCardText">
                                Flowers 3
                            </div>
                        </div>
                    </div>
                    <TextField
                        value={invitationDescription}
                        onChange={handleDetails}
                        sx={{
                            width: {sm: 230},
                            "& .MuiInputBase-root": {}
                        }}
                        style={{width: "90%"}}
                        label="Say something to your guests!"
                        multiline
                        rows={3}
                        inputProps={{style: {fontSize: 13}, maxLength: 250}}
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

                    <Button onClick={handleUpdateInvitation} variant="contained">Save</Button>

                </div>
                <div className="invitationLook flowers1">
                    <div className="invitationContent">
                        <NoAnimationRSVP nameOfTheHappyCouple={invitationName}
                                         selectedTheme={selectedTheme}
                                         weddingDate={invitationDate.isValid() ? invitationDate.format('DD/MM/YYYY').toString() : ""}
                                         weddingLocation={invitationDescription}/>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Invitation;