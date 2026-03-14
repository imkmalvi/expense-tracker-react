import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseItem = ({ expense, deleteExpense, startEdit }) => {

return ( <Card className="rounded-xl shadow hover:shadow-lg transition">

  <CardContent className="flex flex-col gap-2">

    <Typography fontWeight="bold">
      {expense.title}
    </Typography>

    <Typography variant="body2" color="text.secondary">
      {expense.category}
    </Typography>

    <Typography variant="body2" color="text.secondary">
      {new Date(expense.date).toLocaleDateString("en-IN")}
    </Typography>

    <div className="flex justify-between items-center mt-2">

      <Typography fontWeight="bold" color="green">
        ₹ {expense.amount.toLocaleString("en-IN")}
      </Typography>

      <div>

        <IconButton
          color="primary"
          onClick={() => startEdit(expense)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => {
            const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
            if (confirmDelete) {
              deleteExpense(expense.id);
            }
          }}
        >
          <DeleteIcon />
        </IconButton>

      </div>

    </div>

  </CardContent>

</Card>


);
};

export default ExpenseItem;
