import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { PageCustom } from '../ui-components/PageCustom';
import { IReport } from '@shared';
import { useAppContext } from '../../context/appStateContextProvider';
import { observer } from 'mobx-react';

const TableList: React.FC = () => {
  const appContext = useAppContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (property: keyof IReport) => {
    const isAsc =
      appContext.tableOrderBy === property &&
      appContext.tableSortOrder === 'asc';
    appContext.setSortOrder(isAsc ? 'desc' : 'asc');
    appContext.setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedReports = [...appContext.getFilteredReports()].sort((a, b) => {
    if (appContext.tableSortOrder === 'asc') {
      return a[appContext.tableOrderBy] < b[appContext.tableOrderBy] ? -1 : 1;
    } else {
      return a[appContext.tableOrderBy] > b[appContext.tableOrderBy] ? -1 : 1;
    }
  });

  return (
    <PageCustom title="Table list">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ height: '50px' }}>
                <TableCell>
                  <TableSortLabel
                    active={appContext.tableOrderBy === 'id'}
                    direction={appContext.tableSortOrder}
                    onClick={() => handleSort('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={appContext.tableOrderBy === 'clientId'}
                    direction={appContext.tableSortOrder}
                    onClick={() => handleSort('clientId')}
                  >
                    Client ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={appContext.tableOrderBy === 'countryId'}
                    direction={appContext.tableSortOrder}
                    onClick={() => handleSort('countryId')}
                  >
                    Country ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={appContext.tableOrderBy === 'category'}
                    direction={appContext.tableSortOrder}
                    onClick={() => handleSort('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={appContext.tableOrderBy === 'creationDate'}
                    direction={appContext.tableSortOrder}
                    onClick={() => handleSort('creationDate')}
                  >
                    Creation Date
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedReports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.clientId}</TableCell>
                    <TableCell>{report.countryId}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{report.creationDate.toISOString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={appContext.getFilteredReports().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </PageCustom>
  );
};
export default observer(TableList);
