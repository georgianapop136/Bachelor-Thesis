
import "./Overview.css"
import ChecklistChart from "./ChecklistChart";
import {useEffect, useState} from "react";

const Overview = () => {
    const [checklist, setChecklist] = useState(undefined);

    useEffect(() => {
        getChecklist()
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
            }).then(async(response) => {
                if (response.status === 200) {
                    const result = await response.json();
                    setChecklist(result);
                }
            })
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }


    if (checklist === undefined) {
        return null;
    }

    return (
       <ChecklistChart checklist={checklist}/>
   )
}
 export default Overview;



