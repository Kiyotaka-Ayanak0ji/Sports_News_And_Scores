import React, { Reducer, createContext, useState } from 'react'
import { User } from '../../types/user'
import { customFetch } from '../../utils/middleware';
import { API_KEY } from '../../config/constants';
import { UserActions } from './reducer';

interface UserContextProps{
    user: User | null,
    setUser: (user:User | null) => void;
} 

const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null
})


const fetchUser = async(setUser: (data: User) => void) => {
    
    try{
        const url = `${API_KEY}/users`;
        const data: User = await customFetch(url,'GET',true);
    
        console.log(data);
        setUser(data);
    }catch(err){
        console.log(err.message);
    }
}

const UserProvider:React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user,setUser,] = useState<User | null>(null);

    const valueToShare = {
        user,
        setUser
    }

    useState(() => {
        fetchUser(setUser);
    });

    return(
        <UserContext.Provider value={valueToShare}>
            { children }
        </UserContext.Provider>
    );
};

export default { UserContext , UserProvider };