import {useEffect, useState} from "react";
import GeneralPage from "./GeneralPage";
import StartPage from "./StartPage";

const MainPage = () => {
    
    const[inSystem, setInSystem] = useState(false);
    
    const check = () => {
        
        if(sessionStorage.getItem('token') != null)
        {
            setInSystem(true);
        }
        else
        {
            setInSystem(false);
        }
    }

    useEffect(() => {
        check();
    }, []);
    
    
    return (
        <div>
            {inSystem && <GeneralPage/>}
            {!inSystem && <StartPage/>}
        </div>
    )
    
}

export default MainPage;
