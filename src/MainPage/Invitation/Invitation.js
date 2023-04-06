import * as React from 'react';
import "./Invitation.css";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {TextField} from "@mui/material";

const Invitation = () => {
    return (
        <div className="invitationContainer">
            <div className="invitationBuilder">
                <div className="invitationCustomizer">
                    <TextField
                        sx={{
                            width: { sm: 100 },
                            "& .MuiInputBase-root": {
                                height: 30
                            }
                        }}
                        inputProps={{style: {fontSize: 12}}}
                        id="outlined-basic"
                        variant="outlined"/>
                </div>
                <div className="invitationLook"></div>
            </div>
        </div>

    );
}
export default Invitation;