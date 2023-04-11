import './style.css';
import './responsive.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './components/Home';
import Analytics from './components/Analytics';
import CrewMembers from './components/CrewMembers';
import UploadVideo from './components/UploadVideo';
import ErrorPage from './pages/ErrorPage';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/uploadvideo" element={<UploadVideo />} />
                <Route exact path="/analytics" element={<Analytics />} />
                <Route exact path="/crewmembers" element={<CrewMembers />} />
                <Route exact path="/pagenotfound" element={<ErrorPage />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;