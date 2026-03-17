import React, { 
    useEffect,
    useState,
    useContext
} from 'react'

import {Spin} from 'antd'

import { Outlet } from 'react-router-dom'

import TopNav from '@components/TopNav';

import SideNav from '@components/SideNav'

import { AppContext } from '@context/AppContext';


const MainLayout: React.FC  = (): React.ReactElement => {
    const {
        isProcessing,
        setIsProcessing
    }
    = useContext(AppContext)

    return (
        <Spin spinning={isProcessing} size="large" description="Loading...">
            <div className="main-layout">
                <TopNav />
                <div className="main-content">
                    <SideNav />
                    <main className="main">
                        <Outlet />
                    </main>
                </div>
            </div>
        </Spin>
    )
}

export default MainLayout;