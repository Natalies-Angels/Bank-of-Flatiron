import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search"; 

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8002/transactions")
      .then((response) => response.json())
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.error("Error fetching transactions: ", error));
  }, []);

  function addNewTransaction(newTransaction) 
  {
    setTransactions([...transactions, newTransaction]); 
  }

  
  function handleSearch(searchInput) {
    setSearchTerm(searchInput);
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const description = transaction.description || ""; //the empty string handles the empty descriptions
    return description.toLowerCase().includes(searchTerm.toLowerCase()); //toLowerCase() removes case insensitivity
  });

  return (
    <div>
      <h2>Transaction List</h2>
      <Search onSearch={handleSearch} /> 
      <AddTransactionForm onAddTransaction={addNewTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
