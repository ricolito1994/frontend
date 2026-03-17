import React , {} from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideNav: React.FC = (): React.ReactElement => {

    const location = useLocation();

    const isActiveLink = (path: string): string => {
        return location.pathname.split('/')[1] === path ? 'active' : '';
    }
    
    return (
        <nav className="side-nav">
           <ul>
                <li><Link className={isActiveLink("")} to='/'>Dashboard</Link></li>
                <li><Link className={isActiveLink("ipmanager")} to="ipmanager">IP Manager</Link></li>
                <li><Link className={isActiveLink("logs")} to="logs">Logs</Link></li>
           </ul>
        </nav>
    )
}

export default SideNav;