import "./MainPage.css"
import {useEffect, useState} from "react";
import Checklist from "./Checklist/Checklist";
import User from "./User/User";
import Budget from "./Budget/Budget";
import Invitation from "./Invitation/Invitation";
import GuestList from "./GuestList/GuestList";
import BudgetImg from "../Pictures/BudgetImg.png";
import ChecklistImg from "../Pictures/ChecklistImg.png";
import SeatingImg from "../Pictures/SeatingImg.png";
import InvitationImg from "../Pictures/InvitationImg.png";
import OverviewImg from "../Pictures/OverviewImg.png";
import GuestlistImg from "../Pictures/GuestlistImg.png";
import Seating from "./Seating/Seating";
import Overview from "./Overview/Overview";
import logo from "../Pictures/Beige Minimal Personal Make Up Artist Logo.png";

const MainPage = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getContent = () => {
        switch (selectedOption) {
            case 1:
                return <Overview/>;
            case 2:
                return <Checklist/>;
            case 3:
                return <Budget/>;
            case 4:
                return <Invitation/>;
            case 5:
                return <GuestList/>;
            case 6:
                return <Seating/>;
            default:
                return <Overview/>;
        }
    }

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="mainPageContainer">
            <div className={`mainPageNavigation ${isMenuOpen ? "mainPageNavigationOpen" : "mainPageNavigationClosed"}`}>
                <svg className={`mainPageSvg ham hamRotate ham1 ${isMenuOpen ? "active" : ""}`} viewBox="0 0 100 100"
                     width="55"
                     onClick={handleClick}>
                    <path
                        className="line top"
                        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"/>
                    <path
                        className="line middle"
                        d="m 30,50 h 40"/>
                    <path
                        className="line bottom"
                        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"/>
                </svg>

                <div className="navigationButtonStyle">
                    <div
                        className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"} ${selectedOption === 1 ? "isSelected" : null}`}
                        onClick={() => {
                            setSelectedOption(1)
                        }}>
                        <img className="imgStyles" src={OverviewImg}/>

                        <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Overview</span>
                    </div>

                    <div
                        className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"} ${selectedOption === 2 ? "isSelected" : null}`}
                        onClick={() => {
                            setSelectedOption(2)
                        }}>
                        <img className="imgStyles" src={ChecklistImg}/>
                        <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Checklist</span>

                    </div>

                    <div
                        className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"} ${selectedOption === 3 ? "isSelected" : null}`}
                        onClick={() => {
                            setSelectedOption(3)
                        }}>
                        <img className="imgStyles" src={BudgetImg}/>
                        <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Budget</span>
                    </div>

                    <div
                        className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"} ${selectedOption === 4 ? "isSelected" : null}`}
                        onClick={() => {
                            setSelectedOption(4)
                        }}>
                        <img className="imgStyles" src={InvitationImg}/>
                        <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Invitation</span>
                    </div>

                    <div
                        className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"} ${selectedOption === 5 ? "isSelected" : null}`}
                        onClick={() => {
                            setSelectedOption(5)
                        }}>
                        <img className="imgStyles" src={GuestlistImg}/>
                        <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Guest List</span>
                    </div>


                    <div
                        className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"} ${selectedOption === 6 ? "isSelected" : null}`}
                        onClick={() => {
                            setSelectedOption(6)
                        }}>
                        <img className="imgStyles" src={SeatingImg}/>
                        <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Seating</span>

                    </div>
                </div>

            </div>
            <div className="mainPageContent">
                <div className="mainPageHeader">
                    <div></div>
                    <div> <img className="logoStyle" src={logo}/></div>
                    <User/>
                </div>
                {getContent()}
            </div>
        </div>
    )
        ;
}

export default MainPage;