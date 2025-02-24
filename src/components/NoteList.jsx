import Note from "./Note";
import AddNote from "./AddNote";
const NotesList = ({ notes ,handleAddNote,handleDeleteNote, isAdmin}) =>{
    return (

            <div className='notes-list'>
              {isAdmin && <AddNote handleAddNote={handleAddNote}/>}
              
               {notes.map((note)=> (
                 <Note 
                 id={note.id}
                  text ={note.text} 
                  date={note.date}
                  handleDeleteNote = {handleDeleteNote}
                  isAdmin={isAdmin}
                  />
                ))}
                
                 
             </div>
    );
};
export default NotesList;