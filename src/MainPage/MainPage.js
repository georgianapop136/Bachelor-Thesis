import "./MainPage.css"
import {useEffect, useState} from "react";
import Checklist from "./Checklist/Checklist";
import User from "./User/User";
import Budget from "./Budget/Budget";
import Invitation from "./Invitation/Invitation";
import GuestList from "./GuestList/GuestList";
import BudgetWhiteImg from "../Pictures/BudgetWhiteImg.png";
import ChecklistWhiteImg from "../Pictures/ChecklistWhiteImg.png";
import SeatingWhiteImg from "../Pictures/SeatingWhiteImg.png";
import InvitationWhiteImg from "../Pictures/InvitationWhiteImg.png";
import OverviewWhiteImg from "../Pictures/OverviewWhiteImg.png";
import GuestListWhiteImg from "../Pictures/GuestListWhiteImg.png";
import Seating from "./Seating/Seating";
import Overview from "./Overview/Overview";
import {useNavigate} from "react-router";

const MainPage = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(4);
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
                return <Seating/>;
            case 5:
                return <Invitation/>;
            case 6:
                return <GuestList/>;
            default:
                return <Overview />;
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


                <div className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"}`}
                     onClick={() => {
                         setSelectedOption(1)
                     }}>
                    <img className="imgStyles" src={OverviewWhiteImg}/>

                    <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Overview</span>
                </div>

                <div className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"}`}
                     onClick={() => {
                         setSelectedOption(2)
                     }}>
                    <img className="imgStyles" src={ChecklistWhiteImg}/>
                    <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Checklist</span>

                </div>

                <div className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"}`}
                     onClick={() => {
                         setSelectedOption(3)
                     }}>
                    <img className="imgStyles" src={BudgetWhiteImg}/>
                    <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Budget</span>
                </div>

                <div className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"}`}
                     onClick={() => {
                         setSelectedOption(4)
                     }}>
                    <img className="imgStyles" src={SeatingWhiteImg}/>
                    <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Seating</span>

                </div>

                <div className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"}`}
                     onClick={() => {
                         setSelectedOption(5)
                     }}>
                    <img className="imgStyles" src={InvitationWhiteImg}/>
                    <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Invitation</span>
                </div>

                <div className={`navigationButton ${isMenuOpen ? "navigationButtonOpen" : "navigationButtonClosed"}`}
                     onClick={() => {
                         setSelectedOption(6)
                     }}>
                    <img className="imgStyles" src={GuestListWhiteImg}/>
                    <span className={`navigationItem ${isMenuOpen ? "" : "navigationItemHidden"}`}>Guest List</span>
                </div>

            </div>
            <div className="mainPageContent">
                <div className="mainPageHeader"><User/></div>
                {getContent()}
            </div>
        </div>
    );
}

export default MainPage;