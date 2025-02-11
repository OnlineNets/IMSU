import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransaction } from 'src/redux/action/modal';
import { addTransactions, deleteTransactions } from 'src/redux/action/information';
import axios from 'axios';
import { BACKEND_URL } from 'src/Constant';
import { useEffect } from 'react';

export const TransactionsTable = (props) => {
  const {
    count = 0,
    //items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  const items = useSelector(state=>state.transactions.transactions);

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  let MyInfor = JSON.parse(localStorage.getItem("user"));
 
  useEffect(()=>{
    //console.log(items)
  },[])
  const dispatch = useDispatch();
  const handleModal=(action, transaction, index)=>{
    let tran = {
      text: action,
      open: true,
      ...transaction
    }
    dispatch(updateTransaction(tran));
  }
  const deleteHandle=async(index)=>{
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/transactions/${index}`);
                  
      // console.log("object")
      const employees = res.data;

      dispatch(addTransactions(employees));
    }
    catch(err) {
        if(!err) console.log(err);
      };
  }
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(items)} */}
              {items.map((Transaction, index) => {
                const isSelected = selected.includes(Transaction.id);
                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(Transaction.id);
                          } else {
                            onDeselectOne?.(Transaction.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {Transaction.date}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {Transaction.type}
                    </TableCell>
                    <TableCell>
                      {'$'+Transaction.amount}
                    </TableCell>
                    
                    <TableCell
                      style={{
                        paddingRight: "5px",
                        marginRight: "5px"
                      }}
                      >
                      <Button
                        variant="contained"
                        sx={{
                          display: 'inline-flex',
                          height: 32,
                          width: 0,
                        }}
                        style={{
                          padding: "0px",
                          margin: "5px"
                        }}
                        onClick={()=>handleModal("view", Transaction,index+page*rowsPerPage)}
                      >
                            View
                      </Button>
                      {MyInfor!=null? MyInfor.role != "Normal" ? <Button
                        variant="contained"
                        sx={{
                          display: 'inline-flex',
                          height: 32,
                          width: 0,
                          padding: "5px"
                        }}
                        style={{
                          padding: "0px",
                          margin: "5px"
                        }}
                        onClick={()=>handleModal("update", Transaction,index+page*rowsPerPage)}
                      >
                            Update
                      </Button>:"":''}
                    {MyInfor!=null? MyInfor.role == "Admin" ? <Button
                        variant="contained"
                        sx={{
                          display: 'inline-flex',
                          height: 32,
                          width: 0,
                          padding: "5px"
                        }}
                        style={{
                          padding: "0px",
                          margin: "5px"
                        }}
                        onClick={()=>deleteHandle(Transaction._id)}
                      >
                            Delete
                      </Button>:"":''}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

TransactionsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
