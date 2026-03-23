import React, {
    useContext,
    useEffect,
    useState,
    useMemo
} from 'react';

import { AppContext } from '@context/AppContext';

import { Form, Input, Select, notification } from 'antd';

import { IPAddress } from '@models/ipaddress.model'
import { UserLogin } from '@models/user.model'

import IpManagerService from '@/app/services/IpManagerService';

import DialogBox from './DialogBox';

interface IpManagerModalProps {
    isOpen: boolean, 
    setIsOpen: Function,
    ipData?: IPAddress,
    setLoadingData: Function,
    setIpData: Function,
    modalTitle: string
}

const IpManagerDialog: React.FC <IpManagerModalProps> = ({
    isOpen, 
    setIsOpen,
    ipData,
    setLoadingData,
    setIpData,
    modalTitle
}): React.ReactElement => {

    const {
        user,
        setUser
    } = useContext(AppContext)

    const [ipAddressForm] = Form.useForm()

    
    const [api, contextHolder] = notification.useNotification();

    const ipManagerService = useMemo (() => new IpManagerService(
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

    const submitForm = async (values: any) => {
        try {
            setLoadingData(true)
            
            values = {
                ...values,
                created_by: user.user.id
            }

            if (! ipData?.id) {
                await ipManagerService.store(user.user.id, values)
            } else {
                await ipManagerService.update(ipData?.id, user.user.id, values)
            }

            setIsOpen(false)

            api.success({
                message: "Success",
                description: `IP Address ${ipData?.id ? 'updated' : 'added'} successfully.`,
                type: 'success'
            })
            
        } catch (e:any) {
            let errs = "";
            for (let i in e?.response?.data.errors) {
                errs += e?.response?.data.errors[i][0] + ' '
            }
            api.error({
                message: e?.response?.data.message,
                description: errs,
                type: 'error'
            })
        } 
    }

    useEffect(() => {
        ipAddressForm.setFieldsValue(ipData)
    }, [ipData])

    return (
        <>
        {contextHolder}
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle={modalTitle}
            form={ipAddressForm}
            handleClose={()=>{
                ipAddressForm.resetFields()
                setIpData(null)
            }}
        >
            <Form
                form = {ipAddressForm}
                onFinish={submitForm}
                // initialValues={ipData}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }} 
            >
                <Form.Item
                    label="Label"
                    name="label"
                    key="label"
                    /*rules={[{ required: true, message: 'Address name is required' }]}*/
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="IP Address"
                    name="ip_address"
                    key="ip_address"
                    rules={[{ required: true, message: 'IP Address is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="IP Version"
                    name="ip_version"
                    key="ip_version"
                    rules={[{ required: true, message: 'IP Address is required' }]}
                >
                    <Select
                        style={{width: "100%"}}
                        options={[
                            {value: 4, label: 'ipV4'},
                            {value: 6, label: 'ipV6'}
                        ]}
                    />
                </Form.Item>
            </Form>
        </DialogBox>
        </>
    )
}

export default IpManagerDialog;