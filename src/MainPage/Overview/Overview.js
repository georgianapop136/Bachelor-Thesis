import "./Overview.css"
import {useEffect, useState} from "react";
import ChecklistProgressChart from "./ChecklistCharts/ChecklistProgressChart";
import BudgetCategoriesChart from "./BudgetCharts/BudgetCategoriesChart";
import Clock from "./WeddingTimerChart/WeddingDateTimer";
import dayjs from "dayjs";
import GuestsCharts from "./GuestCharts/GuestsCharts";
import UpcomingChecklistChart from "./ChecklistCharts/UpcomingChecklistChart";
import MyBudgetChart from "./BudgetCharts/MyBudgetChart";

const Overview = () => {
    const [checklist, setChecklist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [invitationDate, setInvitationDate] = useState(dayjs());
    const [guestList, setGuestList] = useState([]);
    const [budget, setBudget] = useState(0);

    useEffect(() => {
        getChecklist()
        getCategories()
        loadInvitation()
        loadGuestList()
        loadBudget()
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

    const loadBudget = () => {
        try {
            const userEmail = sessionStorage.getItem("loggedInUser");

            fetch('http://localhost:3001/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: userEmail}),
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (data.user.budget !== null) {
                            setBudget(data.user.budget)
                        }
                    })
                }
            });
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }



    return (
        <div className="overviewContainer">
            <h1 className="overviewChartsTitles">Overview</h1>
            <div className="overviewSeparator" />
            <div className="overviewRow">
                <Clock deadline={invitationDate}/>
                <GuestsCharts guestList={guestList}/>
            </div>
            <div className="overviewRow">
                <ChecklistProgressChart checklist={checklist}/>
                <BudgetCategoriesChart categories={categories}/>
            </div>
            <div className="overviewRow">
                <UpcomingChecklistChart checklist={checklist}/>
                <MyBudgetChart categories={categories} budget={budget}/>
            </div>
        </div>
    )
}
export default Overview;



