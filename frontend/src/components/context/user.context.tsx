import React, { useState } from 'react'
import { IUser } from '../../lib/types/data.types';

export const UserContext = React.createContext(null);


export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <>
    </>
  );
}
