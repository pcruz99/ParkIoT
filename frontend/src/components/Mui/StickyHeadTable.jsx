import * as React from 'react';
import PropTypes from 'prop-types';

//MUI
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'date', label: 'Fecha', minWidth: 170 },
  { id: 'time_entry', label: 'Hora de Entrada', minWidth: 100 },
  {
    id: 'time_departure',
    label: 'Hora de Salida',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'user',
    label: 'Usuario',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'vehicle',
    label: 'Placa de Vehículo',
    minWidth: 170
    // align: 'right',
    // format: (value) => new String(value).toUpperCase()
  },
  {
    id: 'active',
    label: 'Activo',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'guard',
    label: 'Guardia',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US')
  }
];

function createData(data) {
  let active = '';
  data.is_active ? (active = 'SI') : (active = 'NO');
  return { active, ...data };
}

// const rows = [];

export default function StickyHeadTable({ registers }) {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setData(registers);
  }, [registers]);

  React.useEffect(() => {
    if (data) {
      const r = [];
      if (r.length === 0) {
        data.forEach((i) => {
          r.push(createData(i));
        });
        setRows(r);
      }
    }
  }, [data]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

StickyHeadTable.propTypes = {
  registers: PropTypes.array
};
