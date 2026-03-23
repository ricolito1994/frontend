import React, {useState, useEffect, useMemo, useContext} from 'react'

import { AppContext } from '@context/AppContext';

import { UserLogin } from '@models/user.model';

import { Spin } from 'antd'

import AuthenticationService from '@services/AuthenticationService';

const UserDisplay: React.FC<{user_id: number}> = ({user_id}) : React.ReactElement => {
    
    const {user, setUser} = useContext(AppContext)

    const [name, setName] = useState<any>("")

    const [loading, setLoading] = useState<boolean>(false)

    const userService = useMemo(() => new AuthenticationService(
            user?.access_token ?? null, 
            null, 
            user?.refresh_token,
            (data: UserLogin) => {
                setUser((prev: UserLogin) => ({
                    ...prev,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token
                }))
            }
        ), [user, setUser])

    const getUser = async (userId: number) => {
        try {
            setLoading(true)
            let userData = await userService.findUser(userId, {}, {})
            setName(userData?.name)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser(user_id)
    }, [user_id])

    return (
        <Spin spinning={loading} >
            {name}
        </Spin>
    )
}

export default UserDisplay;