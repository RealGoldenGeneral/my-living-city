import React, { createContext, useEffect, useState } from 'react'
import { useUserWithJwt } from '../hooks/useUserWithJwt';
import { IUser } from '../lib/types/data/user.type';
import { LoginWithEmailAndPass } from '../lib/types/input/loginWithEmailAndPass.input';
import { FetchError } from '../lib/types/types';
import { storeObjectInLocalStorage } from '../lib/utilityFunctions';

export interface IUserProfileContext {
  token: string | null;
  loading: boolean;
  errorOccured: boolean;
  error: FetchError | null;
  user: IUser | null;
  loginWithEmailAndPass?: (data: LoginWithEmailAndPass) => void,
  logout: () =>  void,
  setUser: (data: IUser) => void,
  setToken: (str: string) => void,
}


export const UserProfileContext = createContext<IUserProfileContext>({
  // Initial values 
  token: null,
  loading: false,
  errorOccured: false,
  error: null,
  user: null,
  loginWithEmailAndPass: () => { },
  logout: () => { },
  setUser: () => { },
  setToken: () => { }
})

const getUserFromLocalStorage = (): (IUser | null) => {
  const stringifiedUser = localStorage.getItem('logged-user');

  if (!stringifiedUser) {
    return null;
  }

  const loggedInUser = JSON.parse(stringifiedUser) as IUser
  return loggedInUser;
}

const UserProfileProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState<IUser | null>(getUserFromLocalStorage())
  const [fetchError, setFetchError] = useState<FetchError | null>(null);

  // Removes Token from global state and local storage
  const purgeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  // Removes User object from global state and local storage
  const purgeUser = () => {
    localStorage.removeItem('logged-user');
    setUser(null);
  }

  // Function to check if user should be refetched
  const shouldTriggerUserFetch = (): boolean => {
    return token !== null && user === null;
  }

  const { data, isLoading, isError, error } = useUserWithJwt(
    { jwtAuthToken: token!, shouldTrigger: shouldTriggerUserFetch()}
  )

  useEffect(() => {
    if (isError) {
      purgeUser()
      purgeToken()
      setFetchError({ message: error?.response?.data.message })
      return;
    }

    if (!isLoading && data && !isError) {
      setFetchError(null);
      setUser(data);
      storeObjectInLocalStorage('logged-user', data);
    }
  }, [data, isLoading, isError])


  const logout = () => {
    purgeUser();
    purgeToken();
  }

  return (
    <UserProfileContext.Provider
      value={{
        logout,
        setUser,
        setToken,
        loading: isLoading,
        errorOccured: isError,
        error: fetchError,
        user: user,
        token,
      }}
    >
      { children }
    </UserProfileContext.Provider>
  )
}

export default UserProfileProvider