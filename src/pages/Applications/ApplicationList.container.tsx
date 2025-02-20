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
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  assignOfficeAsync,
  fetchApplicationAsync,
  ManagedApplication,
  resetApplication,
  setReferrerId,
} from "../../shared/redux/application.slice";
import {
  findLatestStatus,
  findLatestStatusNote,
} from "../../shared/utils/find.application.status.util";
import { fetchUsersAsync, Users } from "../../shared/redux/users.slice";
import FilterDropdown, {
  Filter,
} from "../../shared/components/TableFilter.dialog";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { ApplicationUser } from "../../shared/redux/application.user.slice";
import { ApplicationFilters } from "../../shared/constants/UserFilters.constant";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import usePermission from "../../shared/hooks/usePermission";
import { Permission } from "../../shared/redux/role.slice";

export const ApplicationListContainer: React.FC<any> = () => {

  const StyledGrid = styled(Grid)({
    wordWrap: "break-word",
    overflowWrap: "break-word",
    alignContent: "center",
  });

  const StyledCell = styled("span")({
    padding: "5px",
    fontSize: "12px",
    fontWeight: 400,
  });

  const dispatch = useAppDispatch();

  const { hasPermission } = usePermission();

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

  const [canAssign, setCanAssign] = useState<boolean>(false);

  const [canDelete, setCanDelete] = useState<boolean>(false);

  const [isApplicationsLoading, setIsApplicationsLoading] = useState<
    boolean | undefined
  >(false);

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
    setCanAssign(hasPermission([Permission.ASSIGN_APPLICATION]));
    setCanDelete(hasPermission([Permission.DELETE_APPLICATION]));
  }, [hasPermission]);

  useEffect(() => {
    dispatch(fetchApplicationsAsync({ page: page, limit: rowsPerPage }));
    dispatch(resetApplication());
  }, []);

  useEffect(() => {
    setApplications(applicationsList?.applications || []);
    setIsApplicationsLoading(applicationsList?.isLoading);
  }, [applicationsList]);

  useEffect(() => {
    dispatch(fetchApplicationsAsync({ page: page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const managedApplication = useAppSelector(
    (state): ManagedApplication | undefined => {
      return state?.managedApplication;
    }
  );

  const currentUser = useAppSelector((state): ApplicationUser | undefined => {
    return state.applicationUser;
  });

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
    dispatch(
      assignOfficeAsync({
        applicationId: managedApplication?.application.applicationId,
        processingOfficerId: processingOfficer,
      })
    ).then((error: any) => {
      dispatch(fetchApplicationsAsync({ page: page, limit: rowsPerPage }));
      setOpenAssign(false);
    });
  };

  const openAssignModel = async (applicationId: number | undefined) => {
    setSelectedApplication(applicationId);
    await Promise.all([
      dispatch(fetchApplicationAsync({ applicationId: applicationId })),
      dispatch(fetchUsersAsync({ page: 0, limit: 50 })),
    ]);
    setOpenAssign(true);
  };

  const handleNavigate = (applicationId: number) => {
    navigate(`/applications/${applicationId}`);
  };

  const handleStatusNavigate = (applicationId: number) => {
    navigate(`/status?applicationId=${applicationId}`);
  };

  const handleRefresh = () => {
    dispatch(fetchApplicationsAsync({ page: page, limit: rowsPerPage }));
  };

  const handleAdd = async () => {
    await Promise.all([
      dispatch(setReferrerId(currentUser?.user?.referrerToken)),
    ]);
    navigate(`/?referrerToken=${currentUser?.user?.referrerToken}`);
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
            spacing={{ xl: 1, lg: 1, md: 1 }}
          >
            <Grid size={{ xl: 8, lg: 8, md: 8, sm: 8, xs: 8 }}>
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
            <Grid size={{ xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}>
              <FilterDropdown
                onFilter={(data: Filter) => setFilter(data)}
                filters={ApplicationFilters}
              />
            </Grid>
            <Grid size={{ xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
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
          <>
            <Grid
              container
              size={12}
              spacing={1}
              sx={{
                backgroundColor: "black",
                color: "white",
                fontSize: "14px",
                height: "30px",
                fontWeight: 600,
              }}
            >
              <Grid container size={12} spacing={1}>
                <StyledGrid
                  size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 3 }}
                  sx={{ fontWeight: 700, paddingLeft: "5px" }}
                >
                  Lead ID
                </StyledGrid>
                <StyledGrid
                  size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 3 }}
                  sx={{ fontWeight: 700, paddingLeft: "5px" }}
                >
                  Name
                </StyledGrid>
                <StyledGrid
                  display={{
                    xl: "block",
                    lg: "block",
                    md: "none",
                    paddingLeft: "5px",
                    sm: "none",
                    xs: "none",
                  }}
                  size={2}
                  sx={{ fontWeight: 700, paddingLeft: "5px" }}
                >
                  Referrer
                </StyledGrid>

                <StyledGrid
                  display={{
                    xl: "block",
                    lg: "block",
                    md: "none",
                    sm: "none",
                    xs: "none",
                  }}
                  size={2}
                  sx={{ fontWeight: 700, paddingLeft: "5px" }}
                >
                  Processing Officer
                </StyledGrid>

                <StyledGrid
                  size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 3 }}
                  sx={{ fontWeight: 700, paddingLeft: "5px" }}
                >
                  Status
                </StyledGrid>

                <StyledGrid
                  display={{
                    xl: "block",
                    lg: "block",
                    md: "none",
                    sm: "none",
                    xs: "none",
                  }}
                  size={1}
                  sx={{ fontWeight: 700, paddingLeft: "5px" }}
                >
                  Request Date
                </StyledGrid>

                <StyledGrid
                  display={{
                    xl: "block",
                    lg: "block",
                    md: "none",
                    sm: "none",
                    xs: "none",
                  }}
                  size={2}
                  sx={{ fontWeight: 700, paddingLeft: "5px" }}
                >
                  Notes
                </StyledGrid>

                <StyledGrid
                  size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 3 }}
                  sx={{ fontWeight: 700 }}
                >
                  Actions
                </StyledGrid>
              </Grid>
            </Grid>
            <Grid container size={12} spacing={0}>
              {applications?.map((row, index) => {
                return (
                  <Grid key={index} container size={12}>
                    <StyledGrid
                      size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 3 }}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <StyledCell>{row.applicationId}</StyledCell>
                    </StyledGrid>
                    <StyledGrid
                      size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 3 }}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <StyledCell>{`${row?.primaryApplicant?.personalInformation?.firstName} ${row?.primaryApplicant?.personalInformation?.lastName}`}</StyledCell>
                    </StyledGrid>
                    <StyledGrid
                      display={{
                        xl: "block",
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      }}
                      size={2}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <StyledCell>{row?.referrer}</StyledCell>
                    </StyledGrid>
                    <StyledGrid
                      display={{
                        xl: "block",
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      }}
                      size={2}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <StyledCell>{row?.processingOfficer}</StyledCell>
                    </StyledGrid>
                    <StyledGrid
                      size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 3 }}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <StyledCell>
                        {findLatestStatus(row?.applicationStatus)}
                      </StyledCell>
                    </StyledGrid>
                    <StyledGrid
                      display={{
                        xl: "block",
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      }}
                      size={1}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <StyledCell>
                        {" "}
                        <Moment format="YYYY-MM-DD HH:MM">
                          {row?.createDateTime}
                        </Moment>
                      </StyledCell>
                    </StyledGrid>
                    <StyledGrid
                      display={{
                        xl: "block",
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      }}
                      size={2}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <StyledCell>
                        {findLatestStatusNote(row?.applicationStatus)}
                      </StyledCell>
                    </StyledGrid>

                    <StyledGrid
                      size={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 3 }}
                      sx={{
                        borderLeft: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        borderRight: "1px solid #ccc",
                        backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                      }}
                    >
                      <Grid
                        size={12}
                        container
                        spacing={{ xl: 1, lg: 1, md: 1, sm: 4, xs: 3 }}
                        justifyContent="flex-start"
                      >
                        <Grid size={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              handleNavigate(row?.applicationId || 0);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Grid>
                        <Grid
                          display={{
                            xl: "block",
                            lg: "block",
                            md: "block",
                            sm: "block",
                            xs: "none",
                          }}
                          size={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => {
                              handleStatusNavigate(row?.applicationId || 0);
                            }}
                          >
                            <HourglassEmptyIcon />
                          </IconButton>
                        </Grid>
                        {canAssign && (
                          <Grid size={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}>
                            <IconButton
                              color="primary"
                              onClick={() =>
                                openAssignModel(row?.applicationId)
                              }
                            >
                              <AssignmentIcon />
                            </IconButton>
                          </Grid>
                        )}
                        {canDelete && (
                          <Grid
                            display={{
                              xl: "block",
                              lg: "block",
                              md: "block",
                              sm: "none",
                              xs: "none",
                            }}
                            size={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
                          >
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
                        )}
                      </Grid>
                    </StyledGrid>
                  </Grid>
                );
              })}
            </Grid>
            <Grid size={{ xl: 12 }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={Number(applicationsList?.pagination?.total)}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </>
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
              sx={{ marginLeft: {xl: "250px", lg: "250px", md: "250px", sm: "100px", xs: "100px"}, textAlign: "center" }}
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
            <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
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
            <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
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
                      users.users.map((stateObj) => (
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
          <Grid
            size={12}
            container
            justifyContent={"flex-start"}
            spacing={2}
            sx={{ marginTop: "10px" }}
          >
            <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
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
            <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
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
