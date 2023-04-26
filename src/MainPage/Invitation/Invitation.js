import * as React from 'react';
import {useState} from 'react';
import "./Invitation.css";
import {TextField} from "@mui/material";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import NoAnimationRSVP from "../../RSVP/NoAnimationRSVP";

const Invitation = () => {

    const [coupleNames, setCoupleNames] = useState("");
    const [invitationDate, setInvitationDate] = useState(dayjs());
    const [details, setDetails] = useState("")

    const handleCoupleNamesChanged = (event) => {
        setCoupleNames(event.target.value)
    }

    const handleInvitationDate = (newValue) => {
        setInvitationDate(newValue)
    }

    const handleDetails = (event) => {
        setDetails(event.target.value)
    }

    return (
        <div className="invitationContainer">
            <div className="invitationBuilder">
                <div className="invitationCustomizer">
                    <div className="invitationCustomizerTitle">Build your own invitation here!</div>
                    <TextField
                        value={coupleNames}
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
                        value={details}
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
                </div>
                <div className="invitationLook flowers1">
                    <div className="invitationContent">
                        <NoAnimationRSVP nameOfTheHappyCouple={coupleNames} weddingDate={invitationDate.isValid() ? invitationDate.format('DD/MM/YYYY').toString() : ""} weddingLocation={details}/>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Invitation;