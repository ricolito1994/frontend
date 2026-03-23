import React , {useEffect, useState, useContext} from 'react'

import { AppContext } from '../context/AppContext';

import {
    Button, Form, notification
}
from 'antd';

import {
    LogoutOutlined
} from '@ant-design/icons'

import { UserLogin } from '@models/user.model';

import AuthenticationService from '../services/AuthenticationService';

const TopNav: React.FC <any> = (): React.ReactElement => {
    const APP_NAME = import.meta.env.NAME;
    const {
        user,
        setUser,
        setIsProcessing
    }
    = useContext(AppContext)

    const [api, contextHolder] = notification.useNotification();


    const onRefreshToken = (data: UserLogin) => {
        setUser((prev: UserLogin) => ({
            ...prev,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }))
    }

    const logoutService = new AuthenticationService(
        user?.access_token ?? null, 
        null, 
        user?.refresh_token,
        onRefreshToken
    )

    useEffect(()=> {
        
    }, [])

    const logout = async () => {
        try {
            setIsProcessing(true)
            await logoutService.logout({
                "user_id" : user.user.id
            })
            setUser(null)
            localStorage.removeItem('user')
        } catch (e:any) {
            api.open({
                message: e.response.data.message ?? "Failed",
                description : e.response.data.reason ?? e.response.data.status,
                type : "error"
            })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <header className="top-nav">
            {contextHolder}
            <div className="title">IP MANAGER</div>
            <div className="user-actions">
                <span className="username">{user ? user?.user?.name: ''}</span>
                <Form
                    name="logout"
                    onFinish={logout}
                    layout="vertical"
                >
                    <Button type="primary" htmlType="submit" block>
                        <LogoutOutlined /> Log out
                    </Button>
                </Form>
            </div>
        </header>
    )
}

export default TopNav;