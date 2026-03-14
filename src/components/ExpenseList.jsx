import ExpenseItem from "./ExpenseItem";
import { Card, CardContent, Typography } from "@mui/material";

const ExpenseList = ({ expenses, deleteExpense, startEdit }) => {

return ( <Card className="rounded-2xl shadow-md"> <CardContent>

    <Typography variant="h6" className="mb-4">
      Expense List
    </Typography>

    {expenses.length === 0 && (

    <div className="text-center py-10">

    <Typography variant="h6" color="text.secondary">
     No expenses yet
    </Typography>

    <Typography variant="body2" color="text.secondary">
    Add your first expense to start tracking
    </Typography>

    </div>

    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

      {expenses.map((item) => (
        <ExpenseItem
          key={item.id}
          expense={item}
          deleteExpense={deleteExpense}
          startEdit={startEdit}
        />
      ))}

    </div>

  </CardContent>
</Card>

);
};

export default ExpenseList;
