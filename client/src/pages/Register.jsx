import React, {useState} from 'react'
import axios from "axios";

const Register = () => {

    const [username,
        setUsername] = useState("");
    const [password,
        setPassword] = useState("");

    const handleRegister = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
              "https://fullstack-blog-app.onrender.com//api/auth/register",
              { username, password }
            );
            console.log(first)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='register' onSubmit={handleRegister}>
            <h1>Register</h1>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                placeholder="Username"/>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"/>
            <button>Register</button>
        </form>
    );
}

export default Register