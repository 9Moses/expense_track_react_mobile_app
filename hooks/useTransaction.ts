import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
//const API_URL ="http://localhost:5001/api"

export const useTransaction = (userId: any) =>{
    const [transactons, setTransactions] = useState<any>([]);
    const [summary, setSummary] = useState<any>({
        balance: 0,
        income: 0,
        expense: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const getTransactions = useCallback(async () => {
        try {

          const response = await fetch(`${API_URL}/transactions/${userId}`);
          const data = await response.json();
          setTransactions(data);
      
        } catch (error) {
          console.error("Error fetching transactions:", error);
          
        }
      }, [userId]);
    
    const getSummary = useCallback(async () => {
        try {
          
          const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
          const data = await response.json();
          setSummary(data);
          
        } catch (error) {
          console.error("Error fetching transactions:", error);
         
        }
      }, [userId]);
    
    const loadData = useCallback(async () => {
       if(!userId) return;

       setIsLoading(true);
       try {
        await Promise.all([getTransactions(), getSummary()]);
       } catch (error) {
        console.error("Error fetching transactions:", error);
       }finally{
        setIsLoading(false);
       }
      }, [getTransactions, getSummary, userId]);


    const deleteTransaction = useCallback(async (id: any) => {
        try {
          const response = await fetch(`${API_URL}/transactions/${id}`, {
            method: "DELETE",
          });
          if(!response.ok) throw new Error("Failed to delete transaction");

          await loadData();
         // Alert.alert("Success", "Transaction deleted successfully");
        } catch (error:any) {
          console.error("Error deleting transaction:", error);
          Alert.alert("Error", error.message);
        }
      }, [loadData]);
    
    return { transactons, summary, isLoading, loadData, deleteTransaction };
}