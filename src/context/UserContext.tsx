import React, { useState, createContext, FC, Children } from "react";

export interface UserI {
  id?: number;
  name: string;
  email: string;
}

export type UserContextType = {
  users: UserI[];
  addUser: (user: UserI) => void;
  editUser: (id: number, user: UserI) => void;
  deleteUser: (id: number) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const UserProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<UserI[]>([]);

  const addUser = (user: UserI) => {
    setUsers([...users, { ...user, id: Math.random() }]);
  };

  const editUser = (id: number, user: UserI) => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx < 0) return;

    users[idx] = { id, ...user };
    setUsers(users);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
