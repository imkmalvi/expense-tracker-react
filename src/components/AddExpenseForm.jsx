import { useState, useEffect } from "react";
import { categories } from "../constants/categories";
import { Card, CardContent, Typography, TextField, MenuItem, Button } from "@mui/material";

const AddExpenseForm = ({
addExpense,
editingExpense,
updateExpense,
cancelEdit,
}) => {

const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("Food");
const [date, setDate] = useState("");

const [errors, setErrors] = useState({});

useEffect(() => {
if (editingExpense) {
setTitle(editingExpense.title);
setAmount(editingExpense.amount);
setCategory(editingExpense.category);
setDate(editingExpense.date);
} else {
setTitle("");
setAmount("");
setCategory("Food");
setDate("");
}
}, [editingExpense]);

const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!title.trim()) {
    newErrors.title = "Title is required";
  }

  if (!amount || Number(amount) <= 0) {
    newErrors.amount = "Enter valid amount";
  }

  if (!date) {
    newErrors.date = "Date is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  const expenseData = {
    id: editingExpense ? editingExpense.id : Date.now(),
    title: title.trim(),
    amount: Number(amount),
    category,
    date,
  };

  editingExpense ? updateExpense(expenseData) : addExpense(expenseData);

  setTitle("");
  setAmount("");
  setCategory("Food");
  setDate("");
};

return ( <Card className="rounded-2xl shadow-md"> <CardContent className="space-y-6">


    <Typography variant="h6">
      {editingExpense ? "Edit Expense" : "Add Expense"}
    </Typography>

    <form onSubmit={handleSubmit} className="space-y-6">

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
      />

      <TextField
        label="Amount"
        type="number"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={!!errors.amount}
        helperText={errors.amount}
      />

      <TextField
        type="date"
        fullWidth
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={!!errors.date}
        helperText={errors.date}
      />

      <TextField
        select
        label="Category"
        fullWidth
        margin="normal"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <MenuItem key={cat.name} value={cat.name}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>

      <div className="flex gap-3 mt-4">

        <Button variant="contained" type="submit" sx={{ fontWeight: "bold" }}>
          {editingExpense ? "Update Expense" : "Add Expense"}
        </Button>

        {editingExpense && (
          <Button variant="outlined" onClick={cancelEdit}>
            Cancel
          </Button>
        )}

      </div>

    </form>

  </CardContent>
</Card>

);
};

export default AddExpenseForm;
