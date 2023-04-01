import "./MainPage.css"
import {Button} from "@mui/material";
import {useState} from "react";
import Checklist from "./Checklist/Checklist";
import User from "./User/User";

function MainPage() {
    const [selectedOption, setSelectedOption] = useState(2);

    function getContent() {
        switch (selectedOption) {
            case 1:
                return "Overview";
            case 2:
                return <Checklist/>;
            case 3:
                return "Budget";
            case 4:
                return "Seating";
            default:
                return "Overview";
        }
    }

    return (
        <div className="mainPageContainer">
            <div className="mainPageNavigation">
                <Button className="navigationButton"
                        onClick={() => {
                            setSelectedOption(1)
                        }}
                        variant={selectedOption === 1 ? "contained" : "outlined"}>Overview</Button>
                <Button className="navigationButton"
                        onClick={() => {
                            setSelectedOption(2)
                        }}
                        variant={selectedOption === 2 ? "contained" : "outlined"}>Checklist</Button>
                <Button className="navigationButton"
                        onClick={() => {
                            setSelectedOption(3)
                        }}
                        variant={selectedOption === 3 ? "contained" : "outlined"}>Budget</Button>
                <Button className="navigationButton"
                        onClick={() => {
                            setSelectedOption(4)
                        }}
                        variant={selectedOption === 4 ? "contained" : "outlined"}>Seating</Button>
            </div>
            <div className="mainPageContent">
                <div><User/></div>
                {getContent()}
            </div>
        </div>
    );
}

export default MainPage;