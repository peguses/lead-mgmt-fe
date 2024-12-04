import {
  Button,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Visibility } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUsersAsync, Users } from "../../shared/redux/users.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import CancelIcon from "@mui/icons-material/Cancel";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";

export const UsersListContainer: React.FC<any> = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<string>("");

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

  const handleDelete = () => {};

  const handleAdd = () => {
    navigate("/users/new-user");
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
                      key={row.userName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.firstName}
                      </TableCell>
                      <TableCell align="left">{row?.lastName}</TableCell>
                      <TableCell align="left">{row?.userName}</TableCell>
                      <TableCell align="left">{row?.role?.name}</TableCell>
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
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          {/* <Grid size={2}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                            //   setSelectedApplication(row?.applicationId || "");
                            //   setOpenAssign(true);
                            }}
                          >
                            <AssignmentIcon />
                          </IconButton>
                        </Grid> */}
                          <Grid size={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setSelectedUser(row?.userName || "");
                                setOpenDelete(true);
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
      <Modal
        open={openDelete}
        onClose={() => {}}
        aria-labelledby="Delete model"
        aria-describedby="Are you sure you want to delete this lead ?"
      >
        <Grid
          container
          sx={style}
          size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
        >
          <Grid size={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this lead ?
            </Typography>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 4, lg: 4, md: 3, sm: 3, xs: 1 }}
          >
            <Button
              onClick={() => {
                handleDelete();
              }}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Button
              onClick={() => {
                setOpenDelete(false);
              }}
              variant="outlined"
              fullWidth
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};
