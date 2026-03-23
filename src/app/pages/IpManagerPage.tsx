import React, {
    useContext,
    useState,
    useEffect,
    useMemo,
} from 'react';

import {
    Button,
    notification
} from 'antd'

import { AppContext } from '@context/AppContext';

import Datatable from '@components/commons/Datatable'

import IpManagerService from '@/app/services/IpManagerService'

import { UserLogin } from "@models/user.model"

import { IPAddressData, IPAddress } from '@models/ipaddress.model';

import { PlusOutlined } from '@ant-design/icons';

import IpManagerDialog from '@components/DialogBox/IpManagerDialog'

import UserDisplay from '@components/commons/UserDisplay';

const IpManager: React.FC = () : React.ReactElement => {

    const {
        loading,
        setLoading,
        user,
        setUser
    }
    = useContext(AppContext);

    const [isDataTableLoading, setIsDataTableLoading] = useState<boolean>(true)

    const [isOpenIpManagerModal, setIsOpenIpManagerModal] = useState<boolean>(false)

    const [ipData, setIpData] = useState<IPAddress|undefined>(undefined)
    
    const ipManagerService = useMemo(() => new IpManagerService(
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

    const [api, contextHolder] = notification.useNotification();
    
    const columnData = [
        {
            title : "Ip Address",
            dataIndex: 'ip_address',
            key: 'ip_address',
            sorter: (a:any, b:any) => a.ip_address.localeCompare(b.ip_address),
        },
        {
            title : "Version",
            dataIndex: 'ip_version',
            key: 'ip_version',
            sorter: (a:any, b:any) => a.ip_version.localeCompare(b.ip_version),
        },
        {
            title : "Label",
            dataIndex: 'label',
            key: 'label',
            sorter: (a:any, b:any) => a.label.localeCompare(b.label),
        },
        {
            title : "Created By",
            dataIndex: 'created_by',
            key: 'created_by',
            sorter: (a:any, b:any) => a.created_by.localeCompare(b.created_by),
            render: (a:any, b:any) => <UserDisplay user_id={b.created_by} />
        },
        {
            title : "Created At",
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a:any, b:any) => a.created_at.localeCompare(b.created_at),
        },
        {
            title : "Actions",
            key: 'action',
            render: (text: any, ip: IPAddress) => (
                <>
                    <span>
                        <Button type="primary" onClick={() => openIPAddressDialog(ip.id)}>Edit</Button>&nbsp;
                    </span>
                    <span>
                        <Button type="primary" onClick={() => deleteIpAddress(ip.id)} danger>Delete</Button>&nbsp;
                    </span>
                </>
            ),
        },
    ]
    
    const deleteIpAddress = async (id: number) => {
        if (id) {
            if (confirm("Are you sure?")) {
                try {
                    setIsDataTableLoading(true)
                    await ipManagerService.kill(id, user.user.id,{data : {
                        user_designation: user?.user?.designation
                    }});
                    api.success({
                        message: "Success",
                        description: `IP Address deleted successfully.`,
                        type: 'success'
                    })
                } catch (e: any) {
                    api.error({
                        message: e?.response?.data.message,
                        description: e?.response?.data.reason,
                        type: 'error'
                    })
                }
            }
        }
    }

    const openIPAddressDialog = async (id: number|null = null) => {
        if (id) {
            let ipData = await ipManagerService.show(id, {}, {})
            setIpData(ipData.data)
            setIsOpenIpManagerModal(true)
        }
    }

    return (
        <div className="main-spa-container">
            {contextHolder}
            <IpManagerDialog 
                isOpen={isOpenIpManagerModal}
                setIsOpen={setIsOpenIpManagerModal}
                ipData={ipData}
                setIpData={setIpData}
                setLoadingData={setIsDataTableLoading}
                modalTitle={'IP Address Modal'}
            />
            <div className="page-title">
                IP MANAGER
            </div>

            <div className="page-content">
                <Datatable <IPAddressData>
                    key='datatable-ip-address'
                    columnData={columnData}
                    service={ipManagerService}
                    method={'index'}
                    props={{
                        page: 1,
                        data: {},
                        config: {}
                    }}
                    isDataTableLoading={isDataTableLoading}
                    setIsDataTableLoading={setIsDataTableLoading}
                >
                    <div className="datatable-filter-container">
                        <Button type={"primary"} onClick={() => setIsOpenIpManagerModal(true)}><PlusOutlined />New IP Address</Button>
                    </div>
                </Datatable>
            </div>
        </div>
    );
}

export default IpManager;