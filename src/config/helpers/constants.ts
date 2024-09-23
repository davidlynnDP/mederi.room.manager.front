interface PaginationParams {
    page?: number;
    limit?: number;
};

export const DEFECT_ALL: PaginationParams= { page: 1, limit: 999 }