import "./NoAnimationRSVP.css";
import 'bootstrap/dist/css/bootstrap.css';
import theme1Photo from "../Pictures/theme/theme1/picture2.png";
import theme2Photo from "../Pictures/theme/theme2/picture2.jpg";
import theme3Photo from "../Pictures/theme/theme3/picture2.jpg";

const NoAnimationRSVP = ({selectedTheme, nameOfTheHappyCouple, weddingDate, weddingLocation}) => {

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


    return (
        <>
            <div>
                <div className={`rsvp2Paral rsvp2Paralsec rsvp2Jumbotron rsvp2Bounce-up ${getBackgroundImage1()}`} id="about">
                    <div className="rsvp2Desc">
                        <span className="rsvp2Title">{nameOfTheHappyCouple}</span>
                    </div>
                </div>
            </div>

            <div className="weddingDetailsContainer">
                <div className="rsvp2Jumbotron container-fluid" style={{backgroundColor: "#fff"}}>
                    <div className="rsvp2H1">Wedding Details</div>
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={getWeddingDetailsPhoto()}
                                className="thumb" />
                        </div>
                        <div className="col-md-6">
                            <p className="rsvp2Info"> {weddingLocation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className={`rsvp2Paral rsvp2Paralsec1 rsvp2Jumbotron ${getBackgroundImage3()}`}>
                    <div className="rsvp2Desc2" style={{backgroundColor: "rgba(1,1,1,.3)"}}>
                        <span className="rsvp2Title rsvp2Title2">Join us as we become one</span>
                        <hr className="rsvp2Hr"/>
                        <br /><br />
                        <h2 style={{color: "#fff"}}>{weddingDate}</h2>
                        <p>
                            <button className="rsvp2Button">RSVP</button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoAnimationRSVP;