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
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            // restore user from local storage if it exists
            let storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser))
            }
        }
        navigate('/')
    }, [user])

    const renderLayout: any = (): React.ReactElement => {
        let auth = localStorage.getItem('user');
        return auth ? <MainLayout /> : <LoginLayout />
    }
    
    return (
        <div className="App">
            <Helmet>
                <title>IP APP</title>
            </Helmet>
            <LoadingLayout isLoading={isLoading}>
                <Routes>
                    <Route element={renderLayout()}>
                        <Route path="/" element={<>Dkc</>} />
                        <Route path='ipmanager' element={<>ip</>} />
                        <Route path='logs' element={<>logs</>} />
                    </Route>
                    <Route path="*" element={<>Not found</>} />
                </Routes>
            </LoadingLayout>
        </div>
    )
}

export default App;