import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([
    {
        bankName: "HDFC Bank",
        cardType: "Credit",
        amount: "1000",
        date: "8/28/2025 5.08.11 PM",
    },
     {
        bankName: "HDFC Bank",
        cardType: "Credit",
        amount: "1000",
        date: "8/28/2025 5.08.11 PM",
    },
     {
        bankName: "HDFC Bank",
        cardType: "Credit",
        amount: "1000",
        date: "8/28/2025 5.08.11 PM",
    },
     {
        bankName: "HDFC Bank",
        cardType: "Credit",
        amount: "1000",
        date: "8/28/2025 5.08.11 PM",
    },
  ]);
   const [evTransactions, setEvTransactions] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
    const [seeEVAll, setSeeEVAll] = useState(false);

  return(
    <AppContext.Provider
    value={{
        balance,
        setBalance,
        transactions,
        setTransactions,
        evTransactions,
        setEvTransactions,
        seeAll,
        setSeeAll,
        seeEVAll,
        setSeeEVAll,
    }}
    >
      {children}  
    </AppContext.Provider>
  )
};
