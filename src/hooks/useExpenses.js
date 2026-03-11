import { useState, useEffect } from "react";

const useExpenses = () => {
  const [expenses, setExpenses] = useState(() => {
    const data = localStorage.getItem("expenses");
    return data ? JSON.parse(data) : [];
  });

  const [editingExpense, setEditingExpense] = useState(null);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const startEdit = (expense) => {
    setEditingExpense(expense);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item
      )
    );
    setEditingExpense(null);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const cancelEdit = () => {
  setEditingExpense(null)
  }

  return {
    expenses,
    addExpense,
    deleteExpense,
    startEdit,
    updateExpense,
    editingExpense,
    cancelEdit
  };
};

export default useExpenses;