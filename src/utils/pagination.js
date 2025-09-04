// frontend/src/hooks/usePagination.js
import { useState, useEffect } from 'react';

const usePagination = (apiFunction, initialPage = 1, initialLimit = 10) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (page = initialPage, limit = initialLimit) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(page, limit);
      setData(response.data);
      setPagination(response.pagination || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchData(page, pagination.limit);
    }
  };

  const changeLimit = (newLimit) => {
    fetchData(1, newLimit);
  };

  return {
    data,
    pagination,
    loading,
    error,
    goToPage,
    changeLimit,
    refresh: () => fetchData(pagination.current, pagination.limit),
  };
};

export default usePagination;