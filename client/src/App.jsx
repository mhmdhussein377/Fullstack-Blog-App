import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from './pages/Register';
import { useContext } from 'react';
import { userContext } from './context/UserContext/userContext';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost';

function App() {

    const {user} = useContext(userContext);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path='/login' element={user ? <Navigate to="/" /> : <Login />}/>
                <Route path='/register' element={user ? <Navigate to="/" /> : <Register />}/>
                <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/" />} />
                <Route path='/post/:id' element={user ? <SinglePost /> : <Navigate to="/" />} />
                <Route path="/edit/:id" element={user ? <EditPost /> : <Navigate to="/" />} />
            </Route>
        </Routes>
    );
}

export default App
