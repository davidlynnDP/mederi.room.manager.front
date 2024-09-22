
enum ReservationStatus {
    CONFIRMADO = 'CONFIRMADO',
    CANCELADO = 'CANCELADO',
    PENDIENTE = 'PENDIENTE',
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    isAvailable?: boolean;
    status?: ReservationStatus;
};