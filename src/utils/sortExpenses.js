const sortExpenses = (expenses, sortBy) => {
  const sorted = [...expenses];

  if (sortBy === "amountLow") {
    sorted.sort((a, b) => a.amount - b.amount);
  } else if (sortBy === "amountHigh") {
    sorted.sort((a, b) => b.amount - a.amount);
  } else if (sortBy === "dateNew") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === "dateOld") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return sorted;
};

export default sortExpenses;