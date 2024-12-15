import {
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  IconButton,
  Backdrop,
  CircularProgress,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
import Paper from "@mui/material/Paper";
import Visibility from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Applications,
  dropApplicationAsync,
  fetchApplicationsAsync,
} from "../../shared/redux/applications.slice";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import Moment from "react-moment";
import {
  Application,
  fetchApplicationAsync,
  ManagedApplication,
  setReferrerId,
  updateApplicationAsync,
} from "../../shared/redux/application.slice";
import { findLatestStatus, findLatestStatusNote } from "../../shared/utils/find.application.status.util";
import { Users } from "../../shared/redux/users.slice";
import { IRole } from "../../shared/redux/role.slice";
import FilterDropdown, { Filter } from "../../shared/components/TableFilter.dialog";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { ApplicationUser } from "../../shared/redux/application.user.slice";
import { ApplicationFilters } from "../../shared/constants/UserFilters.constant";

export const ApplicationListContainer: React.FC<any> = () => {

  const dispatch = useAppDispatch();

  const isSmallScreen = useMediaQuery("(max-width: 900px)");

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    whiteSpace: "normal",
    wordWrap: "break-word",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>();

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [openAssign, setOpenAssign] = useState<boolean>(false);

  const [filter, setFilter] = useState<Filter>();

  const [selectedApplication, setSelectedApplication] = useState<number>();

  const [applications, setApplications] = useState<Application[]>([]);

  const [isApplicationsLoading, setIsApplicationsLoading] = useState<boolean | undefined>(
    false
  );

  const applicationsList = useAppSelector((state): Applications | undefined => {
    return state?.applications;
  });

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchApplicationsAsync({page: page, limit: rowsPerPage}));
    // dispatch(fetchUsersAsync());
    // dispatch(resetApplication());
  }, []);

  useEffect(() => {
    setApplications(applicationsList?.applications || []);
    setIsApplicationsLoading(applicationsList?.isLoading);
  }, [applicationsList]);

  useEffect(() => {
    dispatch(fetchApplicationsAsync({page: page, limit: rowsPerPage}));
  }, [dispatch,  page, rowsPerPage]);


  const managedApplication = useAppSelector(
    (state): ManagedApplication | undefined => {
      return state?.managedApplication;
    }
  );

  const currentUser = useAppSelector((state): ApplicationUser | undefined => {
    return state.applicationUser
  })

  const users = useAppSelector((state): Users | undefined => {
    return state?.users;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = (applicationId: number) => {
    dispatch(dropApplicationAsync(applicationId));
  };

  const handleAssign = (officer: any) => {
    const { processingOfficer } = officer;
    if (managedApplication) {
      dispatch(
        updateApplicationAsync({
          ...managedApplication.application,
          processingOfficerId: processingOfficer,
        })
      );
    }
  };

  const handleNavigate = (applicationId: number) => {
    navigate(`/applications/${applicationId}`);
  };

  useEffect(() => {
    if (
      !managedApplication?.isLoading &&
      !managedApplication?.loadingFailed
      // managedApplication?.loaded
    ) {
      setOpenAssign(true);
    }

    // if (!managedApplication?.loaded) {
    //   setOpenAssign(false);
    // }
  }, [
    managedApplication,
    managedApplication?.isLoading,
    managedApplication?.loadingFailed,
    // managedApplication?.loaded,
  ]);

  const handleRefresh = () => {
    dispatch(fetchApplicationsAsync({page: page, limit: rowsPerPage}));
  };

  const handleAdd = () => {
    dispatch(setReferrerId(currentUser?.user?.referrerToken))
    navigate(`/apply`);
  };

  return (
    <Grid container size={12}>
      <Grid container size={12} spacing={2}>
        <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
          <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
            Applications
          </Typography>
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
                startIcon={<CreditCardIcon />}
              >
                APPLICATION
              </Button>
            </Grid>
            <Grid size={{xl:2, lg: 2, md: 2, sm: 1, xs: 1}}>
              <FilterDropdown onFilter={(data: Filter) => setFilter(data)} filters={ApplicationFilters}/>
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
      </Grid>
      <Grid size={12} sx={{ marginTop: "10px" }}>
        {!isApplicationsLoading ? (
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="lead table">
                <TableHead>
                  <StyledTableRow>
                    {!isSmallScreen && (
                      <StyledTableCell sx={{ fontWeight: 700 }}>
                        Lead ID
                      </StyledTableCell>
                    )}
                    <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                      Lead Name
                    </StyledTableCell>
                    {!isSmallScreen && (
                      <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                        Referrer
                      </StyledTableCell>
                    )}
                    {!isSmallScreen && (
                      <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                        Processing Officer
                      </StyledTableCell>
                    )}
                    <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                      Status
                    </StyledTableCell>
                    {!isSmallScreen && (
                      <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                        Request Date
                      </StyledTableCell>
                    )}
                    <StyledTableCell sx={{ fontWeight: 700 }} align="left">
                      Notes
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ fontWeight: 700, minWidth: "200px" }}
                      align="right"
                    >
                      Actions
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {applications?.map((row) => (
                    <StyledTableRow
                      key={row?.applicationId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {!isSmallScreen && (
                        <StyledTableCell component="th" scope="row">
                          {row?.applicationId}
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="left">
                        {`${row?.primaryApplicant?.personalInformation?.firstName} ${row?.primaryApplicant?.personalInformation?.lastName}`}
                      </StyledTableCell>
                      {!isSmallScreen && (
                        <StyledTableCell align="left">
                          {row?.referrer}
                        </StyledTableCell>
                      )}
                      {!isSmallScreen && (
                        <StyledTableCell align="left">
                          {row?.processingOfficer}
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="left">
                        {findLatestStatus(row?.applicationStatus)}
                      </StyledTableCell>
                      {!isSmallScreen && (
                        <StyledTableCell align="left">
                          <Moment format="YYYY-MM-DD HH:MM">
                            {row?.createDateTime}
                          </Moment>
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="left">
                        {findLatestStatusNote(row?.applicationStatus)}
                      </StyledTableCell>
                      <StyledTableCell align="right" sx={{ minWidth: "200px" }}>
                        <Grid container spacing={1} justifyContent="flex-end">
                          <Grid size={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                handleNavigate(row?.applicationId || 0);
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Grid>
                          <Grid size={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setSelectedApplication(row?.applicationId || 0);
                                dispatch(
                                  fetchApplicationAsync({
                                    applicationId: row?.applicationId,
                                  })
                                );
                              }}
                            >
                              <AssignmentIcon />
                            </IconButton>
                          </Grid>
                          <Grid size={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setSelectedApplication(row?.applicationId || 0);
                                setOpenDelete(true);
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
              count={Number(applicationsList?.pagination?.total)}
              rowsPerPage={rowsPerPage}
              page={page}
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
      <Modal
        open={openDelete}
        onClose={() => {}}
        aria-labelledby="Delete model"
        aria-describedby="Are you sure you want to delete this lead ?"
      >
        <Grid
          container
          sx={style}
          size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
        >
          <Grid size={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this lead ?
            </Typography>
          </Grid>
          <Grid
            size={12}
            container
            justifyContent={"flex-start"}
            spacing={2}
            sx={{ marginTop: "10px" }}
          >
            <Grid
              size={{xl: 4, lg: 4, md: 4, sm: 12, xs: 12}}
            >
              <Button
                onClick={() => {
                  handleDelete(selectedApplication || 0);
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
               size={{xl: 4, lg: 4, md: 4, sm: 12, xs: 12}}
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
        </Grid>
      </Modal>

      <Modal
        open={openAssign}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          sx={style}
          size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
        >
          <Grid size={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assign to Officer
            </Typography>
          </Grid>
          <Grid size={12}>
            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.processingOfficer)}
            >
              <InputLabel
                htmlFor="processingOfficer-label"
                id="processingOfficer"
                shrink
              >
                Processing Officer
              </InputLabel>
              <Controller
                name="processingOfficer"
                control={control}
                defaultValue=""
                rules={{ required: "Processing Office is required" }}
                render={({ field }) => (
                  <Select
                    size="small"
                    labelId="employerState-label"
                    id="processingOfficer"
                    label="Processing Officer"
                    {...field}
                    displayEmpty
                    onChange={(e) => {
                      clearErrors("processingOfficer");
                      field.onChange(e);
                    }}
                  >
                    {users &&
                      !users?.isLoading &&
                      users.users
                        .filter((s) => s.role.role === IRole.processingOfficer)
                        .map((stateObj) => (
                          <MenuItem key={stateObj.email} value={stateObj.id}>
                            {`${stateObj.firstName} ${stateObj.lastName}`}
                          </MenuItem>
                        ))}
                    ;
                  </Select>
                )}
              />
              {errors.processingOfficer && (
                <FormHelperText>
                  {String(errors.processingOfficer?.message)}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={12} container justifyContent={"flex-start"} spacing={2} sx={{marginTop: "10px"}}>
          <Grid
           size={{xl: 4, lg: 4, md: 4, sm: 12, xs: 12}}
          >
            <Button
              onClick={handleSubmit(handleAssign)}
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isValid}
              startIcon={<AssignmentIcon />}
            >
              Assign
            </Button>
          </Grid>
          <Grid
            size={{xl: 4, lg: 4, md: 4, sm: 12, xs: 12}}
          >
            <Button
              onClick={() => {
                setOpenAssign(false);
              }}
              variant="outlined"
              fullWidth
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};
