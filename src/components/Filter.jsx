import { categories } from "../constants/categories";
import { TextField, MenuItem } from "@mui/material";

const Filter = ({ selectedCategory, setSelectedCategory }) => {

return (
<TextField
select
label="Category"
value={selectedCategory}
onChange={(e) => setSelectedCategory(e.target.value)}
size="small"
className="min-w-[160px]"
>


  <MenuItem value="All">All</MenuItem>

  {categories.map((cat) => (
    <MenuItem key={cat.name} value={cat.name}>
      {cat.name}
    </MenuItem>
  ))}

</TextField>

);
};

export default Filter;
