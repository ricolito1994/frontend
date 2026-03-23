import React, {
    useMemo,
    useContext,
    useState
} from 'react';

import LogsService from "@services/LogsService";

import AuthenticationService from '@services/AuthenticationService';

import { AppContext } from '@context/AppContext';

import { UserLogin } from '@models/user.model';

import Datatable from '@components/commons/Datatable';

import UserDisplay from '@components/commons/UserDisplay';

const LogsPage: React.FC = () : React.ReactElement => {

    const {
        user,
        setUser
    } = useContext(AppContext)

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const logService = useMemo(() => new LogsService(
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

    
    const columnData = [
        {
            title : "Initiated By",
            dataIndex: 'done_by',
            key: 'done_by',
            sorter: (a:any, b:any) => a.done_by.localeCompare(b.done_by),
            render: (t: any, log: any) => <UserDisplay user_id={log.done_by} />
        },
        {
            title : "Activity",
            dataIndex: 'activity',
            key: 'activity',
            sorter: (a:any, b:any) => a.activity.localeCompare(b.activity),
        },
        {
            title : "Created",
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a:any, b:any) => a.created_at.localeCompare(b.created_at),
        },
    ];

    return (
        <div className="main-spa-container">
            <div className="page-title">
                LOGS
            </div>

            <div className="page-content">
                <Datatable <any>
                    key='datatable-logs'
                    columnData={columnData}
                    service={logService}
                    method={'index'}
                    props={{
                        page: 1,
                        data: {},
                        config: {}
                    }}
                    isDataTableLoading={isLoading}
                    setIsDataTableLoading={setIsLoading}
                >
                    <div className="datatable-filter-container">
                    </div>
                </Datatable>
            </div>
        </div>
    );
}

export default LogsPage;