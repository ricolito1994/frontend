import React, { 
  //  useEffect,
  //  useState,
  //  useContext
} from 'react'

import {Spin} from 'antd';

interface LoadingLayoutProps {
    isLoading: boolean,
    children: React.ReactNode
}

const LoadingLayout: React.FC <LoadingLayoutProps> = ({isLoading, children}): React.ReactElement => {
    return (<>
     {isLoading ? 
        <div className="main-loading-component">
            <Spin size="large" />
        </div> :
        <>{children}</>
     }
    </>)
}

export default LoadingLayout;