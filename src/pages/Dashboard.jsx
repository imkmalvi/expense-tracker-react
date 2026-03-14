import { useState, useRef } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filter from "../components/Filter";
import Chart from "../components/Chart";
import useExpenses from "../hooks/useExpenses";
import useFilteredExpenses from "../hooks/useFilteredExpenses";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button
} from "@mui/material";

const Dashboard = () => {

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const formRef = useRef(null);

  const {
    expenses,
    addExpense,
    deleteExpense,
    startEdit,
    updateExpense,
    editingExpense,
    cancelEdit
  } = useExpenses();

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false
    }));
  };

  const handleAddExpense = (expense) => {
    addExpense(expense);

    setSnackbar({
      open: true,
      message: "Expense added successfully",
      severity: "success"
    });
  };

  const handleUpdateExpense = (expense) => {
    updateExpense(expense);

    setSnackbar({
      open: true,
      message: "Expense updated",
      severity: "info"
    });
  };

  const handleDeleteExpense = (id) => {
    deleteExpense(id);

    setSnackbar({
      open: true,
      message: "Expense deleted",
      severity: "warning"
    });
  };

  const { sortedExpenses, totalExpense } = useFilteredExpenses(
    expenses,
    selectedCategory,
    searchTerm,
    selectedYear,
    selectedMonth,
    sortBy
  );

  const years = [
    ...new Set(
      expenses
        .filter((item) => item.date)
        .map((item) => new Date(item.date).getFullYear())
    ),
  ].sort((a, b) => b - a);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setSortBy("none");
    setSelectedMonth("All");
    setSelectedYear("All");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto space-y-6">

        <div className="text-center">
          <Typography variant="h4" fontWeight="bold">
            Expense Tracker
          </Typography>

          <Typography variant="h6" className="italic">
            Total Expense
            <span style={{ fontWeight: "bold", color: "green", marginLeft: "8px" }}>
              ₹ {totalExpense.toLocaleString("en-IN")}
            </span>
          </Typography>
        </div>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="flex flex-wrap gap-4 items-center">

            <TextField
              select
              label="Sorting"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="small"
              className="min-w-[160px]"
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="amountLow">Amount Low → High</MenuItem>
              <MenuItem value="amountHigh">Amount High → Low</MenuItem>
              <MenuItem value="dateNew">Newest</MenuItem>
              <MenuItem value="dateOld">Oldest</MenuItem>
            </TextField>

            <Filter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <TextField
              select
              label="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              size="small"
              className="min-w-[120px]"
            >
              <MenuItem value="All">All</MenuItem>

              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              size="small"
              className="min-w-[120px]"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="0">Jan</MenuItem>
              <MenuItem value="1">Feb</MenuItem>
              <MenuItem value="2">Mar</MenuItem>
              <MenuItem value="3">Apr</MenuItem>
              <MenuItem value="4">May</MenuItem>
              <MenuItem value="5">Jun</MenuItem>
              <MenuItem value="6">Jul</MenuItem>
              <MenuItem value="7">Aug</MenuItem>
              <MenuItem value="8">Sep</MenuItem>
              <MenuItem value="9">Oct</MenuItem>
              <MenuItem value="10">Nov</MenuItem>
              <MenuItem value="11">Dec</MenuItem>
            </TextField>

            <TextField
              label="Search"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button
              variant="contained"
              onClick={clearFilters}
              sx={{ fontWeight: "bold" }}
            >
              Clear
            </Button>

          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">

          <div ref={formRef}>
            <AddExpenseForm
              addExpense={handleAddExpense}
              editingExpense={editingExpense}
              updateExpense={handleUpdateExpense}
              cancelEdit={cancelEdit}
            />
          </div>

          <Chart expenses={sortedExpenses} />

        </div>

        <ExpenseList
          expenses={sortedExpenses}
          deleteExpense={handleDeleteExpense}
          startEdit={(expense) => {
            startEdit(expense);

            setTimeout(() => {
              formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >

          <Alert
            severity={snackbar.severity}
            variant="filled"
            onClose={handleCloseSnackbar}
          >
            {snackbar.message}
          </Alert>

        </Snackbar>

      </div>

    </div>
  );
};

export default Dashboard;
