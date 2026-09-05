import { useCallback, useEffect, useState } from "react";
import apiClient from "../components/api/apiClient";

function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWallet = useCallback(async () => {
    const response = await apiClient.get("/wallet");

    setWallet(response.data.wallet);
  }, []);

  const fetchTransactions = useCallback(async () => {
    const response = await apiClient.get("/transactions");

    setTransactions(response.data.transactions);
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      await Promise.all([fetchWallet(), fetchTransactions()]);
    } finally {
      setLoading(false);
    }
  }, [fetchWallet, fetchTransactions]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    wallet,
    transactions,
    loading,
    refresh,
  };
}

export default useWallet;
