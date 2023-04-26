import "./NoAnimationRSVP.css";
import 'bootstrap/dist/css/bootstrap.css';

const NoAnimationRSVP = ({nameOfTheHappyCouple, weddingDate, weddingLocation}) => {

    return (
        <>
            <div>
                <div className="paral paralsec jumbotron bounce-up" id="about">
                    <div className="rsvpDesc">
                        <span className="rsvpTitle">{nameOfTheHappyCouple}</span>
                    </div>
                </div>
            </div>

            <div >
                <div className="jumbotron container-fluid" style={{backgroundColor: "#fff"}}>
                    <div className="rsvpH1">About the Bride</div>
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src="https://images.unsplash.com/photo-1463097769237-a14ad08ff22b?ixlib=rb-0.3.5&s=d50252ca609fd8dac53c9782ba9f7795&auto=format&fit=crop&w=1489&q=80"
                                className="thumb" />
                        </div>
                        <div className="col-md-6">
                            <p className="info"> {weddingLocation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="jumbotron container-fluid">
                    <div className="rsvpH1">About the Groom</div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat
                                venenatis risus sit amet mattis. Sed sagittis accumsan dapibus. Quisque et justo non
                                massa efficitur consequat. Proin accumsan enim sed fermentum elementum. Quisque maximus
                                rutrum nunc, quis lacinia eros porta eu. Praesent odio orci, sollicitudin a mattis
                                vitae, commodo sit amet felis. Sed condimentum facilisis feugiat. Curabitur rhoncus
                                pharetra enim, vel vehicula ipsum ullamcorper eget.</p>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="https://images.unsplash.com/photo-1490006017569-465ccb897ba1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e669bc7ae2d5682aae15610470b44efb&auto=format&fit=crop&w=1350&q=80"
                                className="thumb" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="paral paralsec1 jumbotron">
                    <div className="rsvpDesc2" style={{backgroundColor: "rgba(1,1,1,.3)"}}>
                        <span className="title title2">Join us as we become one</span>
                        <hr className="rsvpHr"/>
                        <br /><br /><br />
                        <span style={{color: "#fff"}}>{weddingDate}</span>
                        <p>
                            <button className="rsvpButton">RSVP</button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoAnimationRSVP;