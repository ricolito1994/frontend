import React, {
    useEffect,
    useState,
} from 'react'

import { UserLogin } from '@models/user.model';

const AppContext = React.createContext<any>(null);

const AppContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [isProcessing, setIsProcessing] = useState<Boolean>(false);
    const [user, setUser] = useState<UserLogin | null>(null);
    return (
        <AppContext.Provider value={{
            isLoading,
            setIsLoading,
            user,
            setUser,
            isProcessing,
            setIsProcessing
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider }