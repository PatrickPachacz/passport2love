import './App.css';
import './viewmatches.scss'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import ChatPage from './Pages/Chatpage';
import Dashboard from './Pages/Dashboard';
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";


function App() {

  return (
    <div>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/chats' element={<ChatPage />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/EditProfile/:id" element={<EditProfile />} />
        </Routes>
      
    </div>
  );
}

export default App;
