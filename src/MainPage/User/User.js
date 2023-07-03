import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {useNavigate} from "react-router";

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        sessionStorage.removeItem("loggedInUser")
        navigate("/authentication")
    };

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: "end",
                marginRight: "20px"
            }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        style={{backgroundColor: "#3C7391"}}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            style={{color: "white", backgroundColor: "#3C7391"}}
                            sx={{
                            width: 40,
                            height: 40
                        }}>{sessionStorage.getItem("loggedInUser")?.slice(0, 2)?.toUpperCase() || "G"}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >

                <MenuItem>
                    <div onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" size="small"/>
                        </ListItemIcon>
                        Logout
                    </div>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default AccountMenu;