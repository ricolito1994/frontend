import React, { 
    useEffect,
    useState,
    useContext
} from 'react'

import {
    Form,
    Button,
    Input,
    Card,
    Spin,
    notification
} from 'antd'

import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons'

import AuthenticationService from '../services/AuthenticationService'
import {AppContext} from '@context/AppContext'
import {UserLogin} from '@models/user.model'

interface ProcessAuthenticationModel {
    username: string,
    password: string,
}

const LoginLayout: React.FC <any> = (): React.ReactElement => {
    const [processLogin, setProcessLogin] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();

    const {
        user,
        setUser
    }
    = useContext(AppContext)

    const auth = new AuthenticationService(null);

    const authenticate = async (values: ProcessAuthenticationModel) => {
        try {
            setProcessLogin(true);
            let loginData = await auth.login<UserLogin>(values)
            setUser(loginData)
        } catch (e: any) {
            api.open({
                message: e?.response.data.message,
                description: e?.response.data.reason,
                type: 'error'
            })
        } finally {
            setProcessLogin(false);
        }
    }

    return (
        <Spin spinning={processLogin} size="large" description="Loading...">
            {contextHolder}
            <div className="login-container">
                <Card title="Login" className="login-card">
                    <Form
                        name="login"
                        onFinish={authenticate}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: "Please enter username" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter password" }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    )
}

export default LoginLayout;