import ExpenseItem from "./ExpenseItem";
import { Card, CardContent, Typography } from "@mui/material";

const ExpenseList = ({ expenses, deleteExpense, startEdit }) => {

return ( <Card className="rounded-2xl shadow-md"> <CardContent>

    <Typography variant="h6" className="mb-4">
      Expense List
    </Typography>

    {expenses.length === 0 && (
      <Typography color="text.secondary">
        No expenses added yet
      </Typography>
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
