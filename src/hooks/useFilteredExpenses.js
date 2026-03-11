import { useMemo } from "react";
import filterExpenses from "../utils/filterExpenses";
import sortExpenses from "../utils/sortExpenses";

const useFilteredExpenses = (
  expenses,
  selectedCategory,
  searchTerm,
  selectedYear,
  selectedMonth,
  sortBy
) => {
  const filteredExpenses = useMemo(() => {
    return filterExpenses(
      expenses,
      selectedCategory,
      searchTerm,
      selectedYear,
      selectedMonth
    );
  }, [expenses, selectedCategory, searchTerm, selectedYear, selectedMonth]);

  const sortedExpenses = useMemo(() => {
    return sortExpenses(filteredExpenses, sortBy);
  }, [filteredExpenses, sortBy]);

  const totalExpense = useMemo(() => {
    return sortedExpenses.reduce((total, item) => total + item.amount, 0);
  }, [sortedExpenses]);

  return { sortedExpenses, totalExpense };
};

export default useFilteredExpenses;