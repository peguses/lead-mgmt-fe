import {
  Backdrop,
  Button,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Visibility, WrapText } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUsersAsync, Users } from "../../shared/redux/users.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
import {
  setUserManagementAction,
  UserManagedAction,
} from "../../shared/redux/managed.user.slice";
import { User } from "../../shared/interfaces/user.interface";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchRolesAsync, Roles } from "../../shared/redux/role.slice";
import { findApplicationRole } from "../../shared/utils/find.application.role.util";
import FilterDropdown, { Filter } from "../../shared/components/TableFilter.dialog";

export const UsersListContainer: React.FC<any> = () => {

  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  const [users, setUsers] = useState<User[]>([]);

  const [filter, setFilter] = useState<Filter>();

  const [isUsersLoading, setUsersLoading] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, []);

  const roles = useAppSelector((state): Roles | undefined => {
    return state?.roles;
  });

  const referrerUrl = (referrerToken?: string) =>{
    return referrerToken ? `${window.location.origin}/?referrerToken=${referrerToken}` : "";
  }


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      maxWidth: '200px'
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersAsync({page: page, limit: rowsPerPage, key: filter?.key, value: filter?.value}));
  }, [dispatch,  page, rowsPerPage, filter]);

  const usersList = useAppSelector((state): Users | undefined => {
    return state?.users;
  });

  useEffect(() => {
    setUsers(usersList?.users || []);
    setUsersLoading(usersList?.isLoading);
  }, [usersList]);

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
    dispatch(setUserManagementAction(UserManagedAction.CREATE_USER));
    navigate("/users/user");
  };

  const handleView = (userId: number) => {
    navigate(`/users/user/${userId}`);
  };

  const handleUpdate = (userId: number) => {
    navigate(`/users/user/${userId}`);
  };

  const handleDelete = (userId: number) => {
    navigate(`/users/user/${userId}`);
  };

  const handleRefresh = () => {
    dispatch(fetchUsersAsync({page: page, limit: rowsPerPage}));
  };

  return (
    <>
      <Grid container size={12} spacing={2}>
        <Grid
          container
          justifyContent="flex-start"
          size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
        >
          <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
              Users
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
          justifyContent="flex-end"
        >
          <Grid
            container
            size={{ xl: 4, lg: 6, md: 6, sm: 12, xs: 12 }}
            spacing={{xl: 1, lg: 1, md: 1}}
          >
            <Grid size={{xl:8, lg: 8, md: 8, sm: 10, xs: 10}}>
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
            <Grid size={{xl:2, lg: 2, md: 2, sm: 1, xs: 1}}>
              <FilterDropdown onFilter={(data: Filter) => setFilter(data)}/>
            </Grid>
            <Grid size={{xl:2, lg: 2, md: 2, sm:1, xs: 1}}>
              <IconButton
                onClick={handleRefresh}
                sx={{
                  width: 36,
                  height: 36,
                  padding: 0,
                  border: "2px solid",
                  borderColor: "primary.main",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderColor: "#1E3A5F",
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} sx={{ marginTop: "10px" }}>
          {!isUsersLoading ?(
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="lead table">
                  <TableHead>
                    <StyledTableRow>
                      {!isSmallScreen && (
                        <StyledTableCell sx={{ fontWeight: 700 }}>
                          First Name
                        </StyledTableCell>
                      )}
                      {!isSmallScreen && (
                        <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                          Last Name
                        </StyledTableCell>
                      )}
                      <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                        User Name
                      </StyledTableCell>
                      {!isSmallScreen && (
                        <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                          Roles
                        </StyledTableCell>
                      )}
                      {!isSmallScreen && (
                        <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                          Referral Url
                        </StyledTableCell>
                      )}
                      <StyledTableCell
                        sx={{ fontWeight: 700, minWidth: { sm: "100px" } }}
                        align="right"
                      >
                        Actions
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {!isUsersLoading &&
                      users?.length !== 0 &&
                      users?.map((row) => (
                        <StyledTableRow
                          key={row.email}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {!isSmallScreen && (
                            <StyledTableCell component="th" scope="row">
                              {row.firstName}
                            </StyledTableCell>
                          )}
                          {!isSmallScreen && (
                            <StyledTableCell>{row?.lastName}</StyledTableCell>
                          )}
                          <StyledTableCell align="left">
                            {row?.email}
                          </StyledTableCell>
                          {!isSmallScreen && (
                            <StyledTableCell align="left">
                              {findApplicationRole(row?.role?.name, roles?.roles)?.name}
                            </StyledTableCell>
                          )}
                          {!isSmallScreen && (
                            <StyledTableCell align="left">
                              {referrerUrl(row?.referrerToken)}
                            </StyledTableCell>
                          )}
                          <StyledTableCell
                            align="right"
                            sx={{ minWidth: { sm: "100px" } }}
                          >
                            <Grid
                              container
                              spacing={1}
                              justifyContent="flex-end"
                            >
                              <Grid size={2}>
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    dispatch(
                                      setUserManagementAction(
                                        UserManagedAction.VIEW_USER
                                      )
                                    );
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
                                    dispatch(
                                      setUserManagementAction(
                                        UserManagedAction.UPDATE_USER
                                      )
                                    );
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
                                    dispatch(
                                      setUserManagementAction(
                                        UserManagedAction.DELETE_USER
                                      )
                                    );
                                    handleDelete(row?.id);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={usersList?.pagination?.total || 0}
                rowsPerPage={rowsPerPage || 10}
                page={Number(usersList?.pagination?.page || 0)}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          ) : (
            <Backdrop
              className="diagnose-loader"
              sx={{
                color: "primary.main",
                marginRight: "20%",
                position: "absolute",
                inset: "0",
                zIndex: "10",
                backgroundColor: "primary.contrastText",
              }}
              open={true}
            >
              <CircularProgress
                color="inherit"
                sx={{ marginLeft: "250px", textAlign: "center" }}
              />
            </Backdrop>
          )}
        </Grid>
      </Grid>
    </>
  );
};
