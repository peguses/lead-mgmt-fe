import {
  Button,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Visibility } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUsersAsync, Users } from "../../shared/redux/users.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
import { setUserManagementAction, UserManagedAction } from "../../shared/redux/managed.user.slice";

export const UsersListContainer: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  const users = useAppSelector((state): Users | undefined => {
    return state?.users;
  });

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleAdd = () => {
    dispatch(setUserManagementAction(UserManagedAction.CREATE_USER))
    navigate("/users/new-user");
  };

  const handleView = (userId: number) => {
      navigate(`/users/view-user/${userId}`);
  };

  const handleUpdate = (userId: number) => {
      navigate(`/users/view-user/${userId}`);
  };

  const handleDelete = (userId: number) => {
    navigate(`/users/view-user/${userId}`);
  };

  return (
    <Grid container size={12}>
      <Grid container justifyContent="flex-start" size={6}>
      <Grid size={{xl: 3, lg: 3, md: 3, sm: 6, xs: 6}}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container size={6} justifyContent="flex-end">
        <Grid size={{xl: 3, lg: 3, md: 6, sm: 6, xs: 6}}>
          <Button
            onClick={handleAdd}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<GroupIcon />}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      <Grid size={12} sx={{ marginTop: "10px" }}>
        {!users?.isLoading && (
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="lead table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>First Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="left">
                      Last Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="left">
                      User Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="left">
                      Roles
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.users?.map((row) => (
                    <TableRow
                      key={row.email}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.firstName}
                      </TableCell>
                      <TableCell align="left">{row?.lastName}</TableCell>
                      <TableCell align="left">{row?.email}</TableCell>
                      <TableCell align="left">{row?.role?.name}</TableCell>
                      <TableCell align="right">
                        <Grid container spacing={1} justifyContent="flex-end">
                          <Grid size={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                  dispatch(setUserManagementAction(UserManagedAction.VIEW_USER));
                                  handleView(row?.id);
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Grid>
                          <Grid size={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                dispatch(setUserManagementAction(UserManagedAction.UPDATE_USER))
                                handleUpdate(row?.id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid size={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                dispatch(setUserManagementAction(UserManagedAction.DELETE_USER))
                                handleDelete(row?.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users?.users.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
