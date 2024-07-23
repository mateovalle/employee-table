import React, {useEffect, useMemo} from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import EmployeeRow, {EmployeeRowData} from "./EmployeeRow";

type EmployeeTableProps = {
  employees: EmployeeRowData[];
};
const EmployeeTable = ({employees}: EmployeeTableProps) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage, employees])
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  const paginatedRows = useMemo(
    () => {
      return employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    },
    [employees, page, rowsPerPage]
  )

  const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'trackingStatus', label: 'Tracking Status', minWidth: 100},
    {id: 'teams', label: 'Teams', minWidth: 170},
    {id: 'accountsConnected', label: 'Accounts Connected', minWidth: 170},
    {id: 'view', label: '', minWidth: 70},
  ];

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((employee) => (
                <EmployeeRow employeeData={employee} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EmployeeTable;