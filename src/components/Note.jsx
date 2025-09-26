
import {MdDeleteSweep} from 'react-icons/md';
import calendarIcon from '/calendar.png';

const Note = ({id,text,date,handleDeleteNote,isAdmin} ) =>{
    return(
         <div className="note">
             <span>{text}</span>
             
              <div className='note-footer'>
              {/* <small className=''>Notice Id: {id}</small> */}
              
              </div>
              <div className="note-footer">
              <small><img className='inline pr-1 w-7 h-7' src= {calendarIcon} alt="logo" /> {date}</small>
                  {isAdmin && <MdDeleteSweep 
                    onClick={()=>handleDeleteNote(id)}
                    className='delete-icon' size='1.3em'
                      />}
                    
              </div>
           </div>
         );
}
export default Note;