import { Grid2 as Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Visibility } from "@mui/icons-material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { fetchUsersAsync, Users } from "../../shared/redux/users.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";

export const UsersListContainer: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchUsersAsync())
  }, []);

  const users = useAppSelector(
    (state): Users | undefined => {
      return state?.users;
    }
  );

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Grid container size={12}>
      <Grid size={3}>
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
      <Grid size={12} sx={{ marginTop: "10px" }}>
        { !users?.isLoading && (<Paper sx={{ width: "100%", mb: 2 }}>
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
                    role
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.users?.map((row) => (
                  <TableRow
                    key={row.userName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="left">
                       {row?.lastName}
                    </TableCell>
                    <TableCell align="left">{row.userName}</TableCell>
                    <TableCell align="left">{row.role.role}</TableCell>
                    <TableCell align="right">
                      <Grid container spacing={1} justifyContent="flex-end">
                        <Grid size={2}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                            //   handleNavigate(row?.applicationId || "")
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Grid>
                        <Grid size={2}>
                          <IconButton
                            color="primary"
                            onClick={() => alert("Home clicked!")}
                          >
                            <UpdateIcon />
                          </IconButton>
                        </Grid>
                        <Grid size={2}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                            //   setSelectedApplication(row?.applicationId || "");
                            //   setOpenAssign(true);
                            }}
                          >
                            <AssignmentIcon />
                          </IconButton>
                        </Grid>
                        <Grid size={2}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                            //   setSelectedApplication(row?.applicationId || "");
                            //   setOpenDelete(true);
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
