import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let name = sessionStorage.getItem('name');
            if (name === '' || name === null) {
                usenavigate('/');
            } else {
                displayusernameupdate(name);
            }
        }

    }, [location])
    return (
        <div>
            {showmenu &&
                <div className="header">
                    <Link to={'/emplist'}>Welcome <b>{displayusername}</b></Link>
                    <Link style={{ float: 'right' }} to={'/'}>Logout</Link>
                </div>
            }
        </div>
    );
}

export default Appheader;