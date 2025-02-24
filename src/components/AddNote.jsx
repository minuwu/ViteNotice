import { useState } from "react";

const AddNote = ({handleAddNote}) =>{
    const [noteText,setNoteText] = useState('');
    const characterLimit = 500;
    const handleChange = (event)=>{
        //   console.log(event.target.value);
          if(characterLimit -event.target.value.length>=0)// compare conditional rendering 
          setNoteText(event.target.value);
    };
    // from app to here to change state Addnote
    const handleSaveClick =() =>{    // saving note/update top state 
        if(noteText.trim().length>0){
            handleAddNote(noteText);
            setNoteText('');
        }
      
    };

    
    return( 
           <div className="note new">
            <textarea 
               cols="8"
               rows="10"
               placeholder="type to note"
               value={noteText}
               onChange={handleChange}
               ></textarea>
         <div className="note-footer">
            <small>{characterLimit-noteText.length}words left</small>
            <button className="save" onClick={handleSaveClick} >Save</button>
         </div>
         
           </div>
         );

};
export default AddNote;