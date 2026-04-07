import React, {
    useEffect,
    useState,
    useContext
} from 'react'

import { Helmet } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from '@context/AppContext'
import { useNavigate } from "react-router-dom"
import LoadingLayout from '@layouts/LoadingLayout'
import MainLayout from '@layouts/MainLayout'
import LoginLayout from '@layouts/LoginLayout'

import Dashboard from "@pages/Dashboard"
import IpManagerPage from "@pages/IpManagerPage"
import LogsPage from "@pages/LogsPage"

import '@styles/index.css';

const App = (): React.ReactElement => {

    const {
        isLoading,
        setIsLoading,
        user,
        setUser
    }
    = useContext(AppContext)

    const navigate = useNavigate();

    useEffect(() => {
        let t = setTimeout(() => {
           setIsLoading((prev: boolean) => !prev)
        }, 1000)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        if (user && user?.user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            // restore user from local storage if it exists
            let storedUser = localStorage.getItem('user');
            if (storedUser) {
                let parsed = JSON.parse(storedUser);

                if (parsed && parsed.user)
                    setUser(JSON.parse(storedUser))
            }
        }
        navigate('/')
    }, [user])

    const renderLayout: any = (): React.ReactElement => {
        let auth = localStorage.getItem('user');

        let parsed = auth ? JSON.parse(auth ?? '') : {};

        return (parsed && parsed.user) ? <MainLayout /> : <LoginLayout />
    }
    
    return (
        <div className="App">
            <Helmet>
                <title>IP APP</title>
            </Helmet>
            <LoadingLayout isLoading={isLoading}>
                <Routes>
                    <Route element={renderLayout()}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path='ipmanager' element={<IpManagerPage />} />
                        
                        {user?.user?.designation === 'Super Admin' ?
                            <Route path='logs' element={<LogsPage />} /> : <></>}
                        
                        <Route path="*" element={<>Not found</>} />
                    </Route>
                </Routes>
            </LoadingLayout>
        </div>
    )
}

export default App;