import * as React from 'react';
import "./Invitation.css";
import {TextField} from "@mui/material";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import InvitationFlowers from "../../Pictures/flowersnew.jpg";
import {useState} from "react";
import dayjs from 'dayjs';

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
                        <div>{coupleNames}</div>
                        <div>{details}</div>
                        <div>{invitationDate.isValid() ? invitationDate.format('DD/MM/YYYY').toString() : ""}</div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Invitation;