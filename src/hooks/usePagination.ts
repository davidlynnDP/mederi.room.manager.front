import { useNavigate, useSearchParams } from "react-router-dom";

interface PaginationOptions {
    defaultPage?: number;
    defaultLimit?: number;
    additionalParams?: Record<string, any>;
}

export const usePagination = ({ defaultPage = 1, defaultLimit = 10, additionalParams = {} }: PaginationOptions = {}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page") || defaultPage.toString(), 10);
    const limit = parseInt(searchParams.get("limit") || defaultLimit.toString(), 10);

    const params: Record<string, any> = {};
    Object.keys(additionalParams).forEach((key) => {
        params[key] = searchParams.get(key) || additionalParams[key];
    });

    const handlePageChange = (newPage: number) => {
        const queryParams = new URLSearchParams({
            page: newPage.toString(),
            limit: limit.toString(),
            ...params,
        })
        navigate(`?${queryParams.toString()}`);
        window.location.href = `?${queryParams.toString()}`;
    };

    return { page, limit, params, handlePageChange };
};
