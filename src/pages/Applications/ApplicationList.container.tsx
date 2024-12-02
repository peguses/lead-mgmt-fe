import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Visibility from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UpdateIcon from "@mui/icons-material/Update";
import SearchIcon from "@mui/icons-material/Search";
import { data } from "../../mocks/applications.mocks";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useForm } from "react-hook-form";
import { processingOfficers } from "../../mocks/processing.officers.mocks";
import { useNavigate } from 'react-router-dom';

export const ApplicationListContainer: React.FC<any> = () => {

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

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [openAssign, setOpenAssign] = useState<boolean>(false);

  const [selectedApplication, setSelectedApplication] = useState<string>("");

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

  const handleAssign = (data) => {
    console.log(data);
  };

  const handleNavigate = (applicationId: string) => {
    navigate(`/lead-view/application-view/${applicationId}`);
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
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="lead table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Lead ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Lead Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Referrer
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Notes
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.applicationId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.applicationId}
                    </TableCell>
                    <TableCell align="left">
                      {
                       `${ row.primaryApplicant.personalInformation.firstName} ${ row.primaryApplicant.personalInformation.lastName}`
                      }
                    </TableCell>
                    <TableCell align="left">{row.referrer}</TableCell>
                    <TableCell align="left">{row.applicationStatus}</TableCell>
                    <TableCell align="left">{"notes"}</TableCell>
                    <TableCell align="right">
                      <Grid container size={12} justifyContent="flex-end">
                        <Grid size={1}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              console.log(row.applicationId);
                              handleNavigate(row.applicationId)
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Grid>
                        <Grid size={1}>
                          <IconButton
                            color="primary"
                            onClick={() => alert("Home clicked!")}
                          >
                            <UpdateIcon />
                          </IconButton>
                        </Grid>
                        <Grid size={1}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedApplication(row.applicationId);
                              setOpenAssign(true);
                            }}
                          >
                            <AssignmentIcon />
                          </IconButton>
                        </Grid>
                        <Grid size={1}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedApplication(row.applicationId);
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
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

      <Modal
        open={openAssign}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          sx={style}
          size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
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
                    {processingOfficers.map((stateObj) => (
                      <MenuItem key={stateObj.id} value={stateObj.name}>
                        {stateObj.name}
                      </MenuItem>
                    ))}
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
            sx={{ marginTop: "10px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 4, lg: 4, md: 3, sm: 3, xs: 1 }}
          >
            <Button
              onClick={handleSubmit(handleAssign)}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AssignmentIcon />}
            >
              Assign
            </Button>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 3, lg: 3, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
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
      </Modal>
    </Grid>
  );
};
