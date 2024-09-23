import { useContext, useEffect, useState } from 'react';
import { MederiContext } from '../context';
import { Reservation } from '../domain/models';

export const useFetchReservation = (reservationId: string) => {
  const { getReservationById } = useContext(MederiContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | undefined>();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const fetchedReservation = await getReservationById(reservationId);
        setSelectedReservation(fetchedReservation);
      } finally {
        setLoading(false);
      }
    };

    if (reservationId) {
      fetchReservation();
    }
  }, []);

  return { loading, selectedReservation };
};
