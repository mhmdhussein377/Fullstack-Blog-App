import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { Logout } from '../../context/UserContext/userActions';
import { userContext } from '../../context/UserContext/userContext';

const Header = () => {

    let {user, dispatch} = useContext(userContext);

    const handleLogout = () => {
        dispatch(Logout());
    }

    return (
        <header>
            <Link to="/" className="logo">
                MyBlog
            </Link>
            <nav>
                {user
                    ? (
                        <React.Fragment>
                            <Link to="/create">Create new post</Link>
                            <a onClick={handleLogout}>Logout</a>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </React.Fragment>
                    )}
            </nav>
        </header>
    );
}

export default Header