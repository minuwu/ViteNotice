import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NoteList';
import Search from './components/Search';
import Header from './components/Header';
import AdminLoginModal from './components/AdminLoginModal';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import axios from 'axios';


const ADMIN_CREDENTIALS = { username: 'admin', password: 'password123' };

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    // if (savedNotes) setNotes(savedNotes);

    axios.get('http://localhost:5000/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error('Error loading notes:', error));
    
    const savedTheme = JSON.parse(localStorage.getItem('dark-mode'));
    if (savedTheme !== null) setDarkMode(savedTheme);
    
    const savedAdmin = JSON.parse(localStorage.getItem('admin-auth'));
    if (savedAdmin) setIsAdmin(savedAdmin);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error('Error loading notes:', error));
    // localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('admin-auth', JSON.stringify(isAdmin));
  }, [isAdmin]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString()
    };
    setNotes([...notes, newNote])
    axios.post('http://localhost:5000/notes', notes)
    .then(  )
    .catch(error => console.error('Error saving notes:', error));
  };

  const deleteNote = (id) => {
    if (isAdmin) {
      axios.post('http://localhost:5000/notes', notes)
      .then(setNotes(notes.filter((note) => note.id !== id)))
      .catch(error => console.error('Error saving notes:', error));
      
    }
  };

  const handleLogin = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      setShowLoginModal(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <Navbar/>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} isAdmin={isAdmin}/>
        <button onClick={() => (isAdmin ? handleLogout() : setShowLoginModal(true))}>
          {isAdmin ? 'Logout' : 'Admin Login'}
        </button>
      {showLoginModal && <AdminLoginModal handleLogin={handleLogin} closeModal={() => setShowLoginModal(false)} />}
        <Search handleSearchNote={setSearchText} />
        <NotesList 
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          isAdmin={isAdmin}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
