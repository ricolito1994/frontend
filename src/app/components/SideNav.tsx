import React , { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '@context/AppContext';

const SideNav: React.FC = (): React.ReactElement => {

    const location = useLocation();

    const {user} = useContext(AppContext)

    const isActiveLink = (path: string): string => {
        return location.pathname.split('/')[1] === path ? 'active' : '';
    }
    
    return (
        <nav className="side-nav">
           <ul>
                <li><Link className={isActiveLink("")} to='/'>Dashboard</Link></li>
                <li><Link className={isActiveLink("ipmanager")} to="ipmanager">IP Manager</Link></li>
                { user?.user?.designation === 'Super Admin' ?
                    <li><Link className={isActiveLink("logs")} to="logs">Logs</Link></li>
                : "" }
           </ul>
        </nav>
    )
}

export default SideNav;