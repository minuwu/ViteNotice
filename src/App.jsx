import { useEffect, useState, useRef } from 'react';
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
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [selectedNav, setSelectedNav] = useState('all');

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('dark-mode'));
    if (savedTheme !== null) setDarkMode(savedTheme);
    
    const savedAdmin = JSON.parse(localStorage.getItem('admin-auth'));
    if (savedAdmin) setIsAdmin(savedAdmin);

    // Try to fetch from backend first
    axios.get('http://localhost:5000/notes')
      .then(response => {
        setNotes(response.data);
        setIsBackendAvailable(true);
      })
      .catch(error => {
        console.error('Backend not available, falling back to localStorage:', error);
        setIsBackendAvailable(false);
        // Failsafe: Load from localStorage if backend fails
        const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
        if (savedNotes) setNotes(savedNotes);
      });
  }, []);

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

    if (isBackendAvailable) {
      axios.post('http://localhost:5000/notes', updatedNotes)
        .then(() => console.log('Note added and saved to backend.'))
        .catch(error => console.error('Error saving notes to backend:', error));
    } else {
      localStorage.setItem('react-notes-app-data', JSON.stringify(updatedNotes));
      console.log('Note added and saved to localStorage.');
    }
  };

  const deleteNote = (id) => {
    if (isAdmin) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      if (isBackendAvailable) {
        axios.post('http://localhost:5000/notes', updatedNotes)
          .then(() => console.log('Note deleted and saved to backend.'))
          .catch(error => console.error('Error saving notes to backend:', error));
      } else {
        localStorage.setItem('react-notes-app-data', JSON.stringify(updatedNotes));
      }
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

      {selectedNav === 'facebook' && <FacebookPagePlugin />}
      
      <Footer/>
    </div>
  );
};

const FacebookPagePlugin = () => {
  const fbContainerRef = useRef(null);

  useEffect(() => {
    // Ensure the script is loaded only once
    if (window.FB) {
      window.FB.XFBML.parse(fbContainerRef.current);
    } else {
      const script = document.createElement('script');
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div ref={fbContainerRef} className="container py-4 my-4 justify-center items-center">
      <div id="fb-root"></div>
      <div className="fb-page" data-href="https://www.facebook.com/RMSTU.Official.Page/" data-tabs="timeline" data-width="500" data-height="40000" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
        <blockquote cite="https://www.facebook.com/RMSTU.Official.Page/" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/RMSTU.Official.Page/">Rangamati Science and Technology University</a>
        </blockquote>
      </div>
    </div>
  );
}

export default App;