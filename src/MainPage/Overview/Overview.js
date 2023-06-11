import "./Overview.css"
import {useEffect, useState} from "react";
import ChecklistProgressChart from "./ChecklistCharts/ChecklistProgressChart";
import BudgetCategoriesChart from "./BudgetCharts/BudgetCategoriesChart";
import Clock from "./WeddingTimerChart/WeddingDateTimer";
import dayjs from "dayjs";
import GuestsCharts from "./GuestCharts/GuestsCharts";

const Overview = () => {
    const [checklist, setChecklist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [invitationDate, setInvitationDate] = useState(dayjs());
    const [guestList, setGuestList] = useState([]);

    useEffect(() => {
        getChecklist()
        getCategories()
        loadInvitation()
        loadGuestList()
    }, []);

    const getChecklist = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getChecklist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setChecklist(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const getCategories = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getCategories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setCategories(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const loadInvitation = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getInvitation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setInvitationDate(dayjs(result.wedding_date) || dayjs());
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }

    const loadGuestList = () => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        try {
            fetch('http://localhost:3001/getGuests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: loggedInUser}),
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setGuestList(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }



    return (
        <div className="overviewContainer">
            <div className="overviewRow">
                <Clock deadline={invitationDate}/>
                <GuestsCharts guestList={guestList}/>
            </div>
            <div className="overviewRow">
                <ChecklistProgressChart checklist={checklist}/>
                <BudgetCategoriesChart categories={categories}/>
            </div>
        </div>
    )
}
export default Overview;



