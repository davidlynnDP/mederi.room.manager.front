import { useContext, useEffect, useState } from 'react';
import { AuthContext, MederiContext } from '../context';
import { User } from '../domain/models';
import { UserRole } from '../domain/enums';

export const useFetchUser = (userId: string) => {
  const { user } = useContext(AuthContext);
  const { findOneUser } = useContext(MederiContext);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user.data.role === UserRole.ADMINISTRADOR) {
          const fetchedUser = await findOneUser(userId);
          setSelectedUser(fetchedUser);
        } else {
          setSelectedUser(user.data as User);
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, []);

  return { loading, selectedUser };
};
