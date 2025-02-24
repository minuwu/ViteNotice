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
  const [selectedNav, setSelectedNav] = useState('all');
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) setNotes(savedNotes);

    const savedTheme = JSON.parse(localStorage.getItem('dark-mode'));
    if (savedTheme !== null) setDarkMode(savedTheme);
    
    const savedAdmin = JSON.parse(localStorage.getItem('admin-auth'));
    if (savedAdmin) setIsAdmin(savedAdmin);

    axios.get('http://localhost:5000/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error loading notes:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
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
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    axios.post('http://localhost:5000/notes', updatedNotes)
      .then(() => console.log('Note added successfully'))
      .catch(error => console.error('Error saving notes:', error));
  };

  const deleteNote = (id) => {
    if (isAdmin) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      axios.post('http://localhost:5000/notes', updatedNotes)
        .then(() => console.log('Note deleted successfully'))
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
      <Navbar setSelectedNav={setSelectedNav}/>
      {selectedNav==='all' && <>
          <div className="container pt-4 mt-4 justify-center items-center">
          <Header handleToggleDarkMode={setDarkMode} isAdmin={isAdmin}/>
          <button onClick={() => (isAdmin ? handleLogout() : setShowLoginModal(true))}>
            {isAdmin ? 'Logout' : 'Admin Login'}
          </button>
          {showLoginModal && <AdminLoginModal handleLogin={handleLogin} closeModal={() => setShowLoginModal(false)} />}
          <Search handleSearchNote={setSearchText} />

          <NotesList 
            className="pb-5 mb-5"
            notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            isAdmin={isAdmin}
          />
        </div>
        
      </>}

      {selectedNav==='facebook' && <>
        <div className="container py-4 my-4 justify-center items-center">
          <div id="fb-root"></div>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0"></script>

            <div class="fb-page" data-href="https://www.facebook.com/RMSTU.Official.Page/" data-tabs="timeline" data-width="500" data-height="40000" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/RMSTU.Official.Page/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/RMSTU.Official.Page/">Rangamati Science and Technology University</a></blockquote></div>
        </div>
        
      </>}
      
      <Footer/>
    </div>
  );
};

export default App;