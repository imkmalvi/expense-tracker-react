const filterExpenses = (
  expenses,
  selectedCategory,
  searchTerm,
  selectedYear,
  selectedMonth
) => {
  return expenses.filter((item) => {
    if (
      selectedCategory !== "All" &&
      item.category !== selectedCategory
    ) {
      return false;
    }

    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (!item.date) return false;

    const date = new Date(item.date);

    if (
      selectedYear !== "All" &&
      date.getFullYear() !== Number(selectedYear)
    ) {
      return false;
    }

    if (
      selectedMonth !== "All" &&
      date.getMonth() !== Number(selectedMonth)
    ) {
      return false;
    }

    return true;
  });
};

export default filterExpenses;