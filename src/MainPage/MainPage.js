import "./MainPage.css"
import {useState} from "react";
import Checklist from "./Checklist/Checklist";
import User from "./User/User";
import Budget from "./Budget/Budget";
import Invitation from "./Invitation/Invitation";

const MainPage = () => {
    const [selectedOption, setSelectedOption] = useState(5);

    const getContent = () => {
        switch (selectedOption) {
            case 1:
                return "Overview";
            case 2:
                return <Checklist/>;
            case 3:
                return <Budget/>;
            case 4:
                return "Seating";
            case 5:
                return <Invitation/>;
            default:
                return "Overview";
        }
    }

    return (
        //     <div className="mainPageContainer">
        //         <div className="mainPageNavigation">
        //             <Button className="navigationButton"
        //                     onClick={() => {
        //                         setSelectedOption(1)
        //                     }}
        //                     variant={selectedOption === 1 ? "contained" : "outlined"}>Overview</Button>
        //             <Button className="navigationButton"
        //                     onClick={() => {
        //                         setSelectedOption(2)
        //                     }}
        //                     variant={selectedOption === 2 ? "contained" : "outlined"}>Checklist</Button>
        //             <Button className="navigationButton"
        //                     onClick={() => {
        //                         setSelectedOption(3)
        //                     }}
        //                     variant={selectedOption === 3 ? "contained" : "outlined"}>Budget</Button>
        //             <Button className="navigationButton"
        //                     onClick={() => {
        //                         setSelectedOption(4)
        //                     }}
        //                     variant={selectedOption === 4 ? "contained" : "outlined"}>Seating</Button>
        //             <Button className="navigationButton"
        //                     onClick={() => {
        //                         setSelectedOption(5)
        //                     }}
        //                     variant={selectedOption === 5 ? "contained" : "outlined"}>Invitation</Button>
        //         </div>
        //         <div className="mainPageContent">
        //             <div><User/></div>
        //             {getContent()}
        //         </div>
        //     </div>
        // );

        <div className="navigationBar">
            <input type="checkbox" id="ham-menu"/>
            <label htmlFor="ham-menu">
                <div className="hide-des">
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>

                </div>
            </label>
            <div className="full-page-green"></div>
            <div className="ham-menu">
                <ul className="centre-text bold-text">
                    <button className="navigationButton"
                            onClick={() => {
                                setSelectedOption(1)
                            }}>Overview
                    </button>
                    <button className="navigationButton"
                            onClick={() => {
                                setSelectedOption(2)
                            }}>Checklist
                    </button>
                    <button className="navigationButton"
                            onClick={() => {
                                setSelectedOption(3)
                            }}>Budget
                    </button>
                    <button className="navigationButton"
                            onClick={() => {
                                setSelectedOption(4)
                            }}>Seating
                    </button>
                    <button className="navigationButton"
                            onClick={() => {
                                setSelectedOption(5)
                            }}>Invitation
                    </button>
                </ul>
            </div>

            <div className="mainPageContent">
                <div><User/></div>
                {getContent()}
            </div>
        </div>

    );
}

export default MainPage;