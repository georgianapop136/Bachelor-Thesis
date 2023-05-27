import "./RSVP.css";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {useSearchParams} from "react-router-dom";
import dayjs from "dayjs";
import theme1Photo from "../Pictures/theme/theme1/picture2.png";
import theme2Photo from "../Pictures/theme/theme2/picture2.jpg";
import theme3Photo from "../Pictures/theme/theme3/picture2.jpg";
import RSVPModal from "./RSVPModal";

const RSVP = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [invitationName, setInvitationName] = useState("");
    const [invitationDate, setInvitationDate] = useState(dayjs());
    const [invitationDescription, setInvitationDescription] = useState("")
    const [selectedTheme, setSelectedTheme] = useState(1)

    const [showModal, setShowModal] = useState(false)
    const [guest, setGuest] = useState(undefined)

    useEffect(() => {
        loadInvitation();
        loadGuestData();

        const animationElements = document.querySelectorAll('.animation-element');

        function checkIfInView() {
            const windowHeight = window.innerHeight;
            const windowTopPosition = window.scrollY;
            const windowBottomPosition = windowTopPosition + windowHeight;

            animationElements.forEach(element => {
                const elementHeight = element.offsetHeight;
                const elementTopPosition = element.offsetTop;
                const elementBottomPosition = elementTopPosition + elementHeight;

                // Check to see if this current container is within the viewport
                if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
                    element.classList.add('in-view');
                } else {
                    element.classList.remove('in-view');
                }
            });
        }

        window.addEventListener('scroll', checkIfInView);
        window.addEventListener('resize', checkIfInView);
        window.dispatchEvent(new Event('scroll'));
    }, [])

    const loadGuestData = () => {
        try {
            fetch('http://localhost:3001/getGuest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({guestId: searchParams.get("guestId")}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setGuest(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const getBackgroundImage1 = () => {
        if (selectedTheme === 1) {
            return 'theme1BackgroundImage';
        } else if (selectedTheme === 2) {
            return 'theme2BackgroundImage';
        } else if (selectedTheme === 3) {
            return 'theme3BackgroundImage';
        }
    }

    const getBackgroundImage3 = () => {
        if (selectedTheme === 1) {
            return 'backgroundImage3Theme1';
        } else if (selectedTheme === 2) {
            return 'backgroundImage3Theme2';
        } else if (selectedTheme === 3) {
            return 'backgroundImage3Theme3';
        }
    }

    const getWeddingDetailsPhoto = () => {
        if (selectedTheme === 1) {
            return theme1Photo;
        } else if (selectedTheme === 2) {
            return theme2Photo;
        } else if (selectedTheme === 3) {
            return theme3Photo;
        }
    }

    const loadInvitation = () => {
        try {
            fetch('http://localhost:3001/getInvitation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: searchParams.get("user")}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
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

    return (
        <>
            <div className="animation-element bounce-up">
                <div className={`rsvp2Paral rsvp2Paralsec rsvp2Jumbotron rsvp2Bounce-up ${getBackgroundImage1()}`} id="about">
                    <div className="rsvpDesc">
                        <span className="rsvpTitle">{invitationName}</span>
                    </div>
                </div>
            </div>

            <div className="rsvpDetails animation-element bounce-up">
                <div className="jumbotron container-fluid" style={{backgroundColor: "#fff"}}>
                    <div className="rsvpH1">Wedding details</div>
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={getWeddingDetailsPhoto()}
                                className="thumb"/>
                        </div>
                        <div className="col-md-6">
                            <p className="info">{invitationDescription}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="animation-element bounce-up">
                <div className={`rsvp2Paral rsvp2Paralsec1 rsvp2Jumbotron ${getBackgroundImage3()}`}>
                    <div className="rsvpDesc2" style={{backgroundColor: "rgba(1,1,1,.3)"}}>
                        <span className="title title2">Join us as we become one</span>
                        <hr className="rsvpHr"/>
                        <br/><br/>
                        <h2 style={{color: "#fff"}}>
                            {invitationDate.isValid() ? invitationDate.format('DD/MM/YYYY').toString() : ""}
                        </h2>
                        <p>
                            <button onClick={() => setShowModal(true)} className="rsvpButton">RSVP</button>
                        </p>
                    </div>
                </div>
            </div>
            <RSVPModal
                userEmail={searchParams.get("user")}
                guest={guest}
                show={showModal} handleClose={() => setShowModal(false)}/>
        </>
    )
}

export default RSVP;