import { useContext, useEffect, useState } from 'react';
import { MederiContext } from '../context';
import { Room } from '../domain/models';


export const useFetchRoom = (roomId: string) => {
  const { findRoomById } = useContext(MederiContext);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const fetchedRoom = await findRoomById(roomId);
        setSelectedRoom(fetchedRoom);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, []);

  return { loading, selectedRoom };
};
