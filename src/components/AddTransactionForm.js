import React, { useState } from "react";

function AddTransactionForm( {onAddTransaction}) {
  const [formData, setFormData] = useState({
      date : "",
      description: "",
      category : "",
      amount : "",
  }); //formData is set to an object
  //The formData object collects and organizes the data from the form before sending it to the server
  
  function updateTransactions(event)
  {
    const{name, value} = event.target; //goes through the .target method and aasigns name and value to the variables name,value
    setFormData({...formData,[name]:value});//having name in [] lets react know that 'name' is the key and 'value' is the value
  }
  function handleSubmit(event)
  {
    event.preventDefault();
    const transactionData = {
      date:formData.date,
      description: formData.description,
      category: formData.category,
      amount: formData.amount,
    }; //assigning empty strings to the keys which will later be overwritten by the data from the API

    fetch("http://localhost:8002/transactions",
    {
      method: "POST",
      headers: 
      {
        "Content-Type" :"application/json",
      },
      body: JSON.stringify(transactionData),
    })
    .then((response) => response.json())
    .then((newTransaction) => onAddTransaction(newTransaction)); 
    
  }
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={updateTransactions}/>
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={updateTransactions} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={updateTransactions}/>
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange={updateTransactions}/>
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
