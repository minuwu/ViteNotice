import React from "react";
import dayAndNight from '/day-and-night.png';

const Header = ({handleToggleDarkMode, isAdmin}) =>{
    return(
        <div className="header text-center my-4">
            {!isAdmin && <h1 className="text-5xl font-bold">RMSTU Notice Board</h1>}
            {isAdmin && <h1>Manage Notices</h1>}
            
            <button onClick={() => handleToggleDarkMode(
                (previousDarkMode) => !previousDarkMode
                )
            }
                 className="save flex gap-2 justify-center items-center">Switch<img className='w-5 h-5' src={dayAndNight} alt="logoDN" /></button>
                  

        </div>
    )
}

export default Header;