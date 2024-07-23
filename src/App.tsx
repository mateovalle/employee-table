import React, {useMemo} from 'react';
import './App.css';
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import employeesJson from './employees.json';
import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEmployeeTableStore} from "./hooks/employeeTable/useEmployeeTableStore";
import AddFilterButton from "./components/EmployeeTable/filters/AddFilterButton";
import {applyFilters} from "./utlis/filters/applyFilters";
import {Employee} from "./types/Employee";
import {employeeRow} from "./utlis/table/employeeRow";
import {
  employeeTableFilters,
  nameFilter
} from "./utlis/table/employeeTableFilters";
import EmployeeDrawer from "./components/EmployeeDrawer/EmployeeDrawer";

function App() {
  const {searchValue, setSearchValue, activeFilters, filters} = useEmployeeTableStore();
  const employees: Employee[] = employeesJson.data.employees;

  const filteredEmployees = useMemo(() => {
    const employeeRows = employees.map((employee) => (employeeRow(employee)))
    return applyFilters(employeeRows,
    [
      nameFilter(searchValue),
      ...activeFilters.map((activeFilter) => employeeTableFilters[activeFilter](filters[activeFilter])),
    ]);
  }, [employees, activeFilters, filters, searchValue]);

  return (
    <Box padding={4} display={"flex"} gap={2} flexDirection={"column"}>
      <TextField
        variant={"outlined"}
        label={"Search employee"}
        fullWidth
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <AddFilterButton />
      <EmployeeDrawer />
      <EmployeeTable employees={filteredEmployees} />
    </Box>
  );
}

export default App;
