import axios from 'axios';
import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import { LoginFailure, LoginStart, LoginSuccess } from '../context/UserContext/userActions';
import { userContext } from '../context/UserContext/userContext';

const Login = () => {

    const [username,
        setUsername] = useState("");
    const [password,
        setPassword] = useState("");
    const navigate = useNavigate();
    const {dispatch, error, isFetching} = useContext(userContext);

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            dispatch(LoginStart());
            const res = await axios.post("http://localhost:8800/api/auth/login", {username, password});
            console.log(res.data);
            dispatch(LoginSuccess(res.data));
            navigate("/");
        } catch (error) {
            dispatch(LoginFailure(error));
        }
    }

    return (
        <form className="login" onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"/>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"/>
            {error && <p style={{color: "red"}}>Wrong username or password</p>}
            {isFetching ? <button>Loading</button> : <button>Login</button>}
        </form>
    );
}

export default Login