import { useState, useEffect, useCallback } from "react";
import { usePagination } from "./usePagination";
import { Meta } from "../domain/interfaces";

interface FetchDataOptions<T> {
  fetchFunction: (...args: any[]) => Promise<{ data: T[]; meta: Meta }>;
  additionalParams?: Record<string, any>;
  fetchArgs?: any[];
}

export const useFetchMultipleData = <T>({
  fetchFunction,
  additionalParams = {},
  fetchArgs = [],
}: FetchDataOptions<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { page, limit, params, handlePageChange } = usePagination({
    additionalParams,
  });

  const fetchData = useCallback(async () => {

    try {
      const { data, meta } = await fetchFunction(...fetchArgs, { page, limit, ...params });
      setData(data);
      setMeta(meta);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    meta,
    isLoading,
    
    page,
    limit,
    params,
    handlePageChange,
  };
};
