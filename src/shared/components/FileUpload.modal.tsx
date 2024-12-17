import {
  Alert,
  Button,
  Grid2 as Grid,
  InputAdornment,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadIcon from "@mui/icons-material/Upload";
import CancelIcon from "@mui/icons-material/Cancel";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ManagedApplication, uploadDocumentAsync } from "../redux/application.slice";
import { LinearProgress } from "@mui/material";

export interface FileUploadComponentProps {
  data: any;
  open: boolean;
  onClose: () => void;
}

export const FileUploadModal: React.FC<FileUploadComponentProps> = ({
  open,
  data,
  onClose
}) => {

  const [files, setFiles] = useState<FileList | null>();

  const [fileBrowsed, setFileBrowsed] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const HiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<any>({
    mode: "all",
    defaultValues: {
      name: "",
      remark: "",
      path: "",
    },
  });

  const document = (files: any, description: string) => {
    const formData = new FormData();

    formData.append("applicationId", String(data.applicationId));
    formData.append("description", String(description));
    if (data.userId) {
      formData.append("userId", String(data.userId));
    }
    formData.append("documents[]", files[0]);
    return formData;
  };

  const handleUpload = (data: any) => {
    if (files?.length === 1) {
      const file = document(files, `${data.name}, ${data.remark}`);
      dispatch(uploadDocumentAsync(file)).then((result: any) => {
        if (result.payload.document.status === "Success") {
          onClose()
        }
      });
    }
  };

  const managedApplication = useAppSelector((state): ManagedApplication => {
    return state.managedApplication;
  });

  return (
    <>
      <Modal open={open} onClose={() => {}}>
        <Grid
          container
          sx={style}
          size={{ xl: 12, lg: 12, md: 6, sm: 4, xs: 4 }}
        >
          <Grid size={12}>
            <Typography variant="h6" component="h2">
              Upload Document
            </Typography>
          </Grid>
          <Grid size={12}>
          {managedApplication.errorMessageIfFailed && (
            <Alert
              severity="error"
              sx={{
                marginTop: "20px",
                marginBottom: "10px",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {managedApplication.errorMessageIfFailed}
            </Alert>
          )}
          </Grid>
          <Grid size={12} sx={{ marginTop: "10px" }}>
            <TextField
              variant={"outlined"}
              size="small"
              fullWidth
              label="Name"
              {...register("name", {
                required: "File name is required",
              })}
              error={!!errors.name}
              helperText={errors.name ? String(errors.name.message) : ""}
              placeholder={"Name"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    marginTop: "20px",
                  },
                },
              }}
              sx={{
                ".MuiInputLabel-outlined": {
                  lineHeight: "70px",
                },
              }}
            />

            <TextField
              variant={"outlined"}
              size="small"
              multiline
              rows={2}
              fullWidth
              label="Remark(Optional)"
              {...register("remark", {
                required: false,
              })}
              placeholder={"Remark"}
              slotProps={{
                input: {
                  sx: {
                    marginTop: "20px",
                  },
                },
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                ".MuiInputLabel-outlined": {
                  lineHeight: "70px",
                },
              }}
            />

            <Grid container size={12} spacing={2}>
              <Grid size={{ xl: 8, lg: 8, md: 12, sm: 12, xs: 12 }}>
                <TextField
                  variant={"outlined"}
                  size="small"
                  fullWidth
                  label="Path"
                  value={files && files[0] ? files[0].name : ""}
                  disabled={true}
                  {...register("path", {
                    required: false,
                  })}
                  placeholder={"Local file path"}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <InsertDriveFileIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        marginTop: "20px",
                      },
                    },
                  }}
                  sx={{
                    ".MuiInputLabel-outlined": {
                      lineHeight: "70px",
                    },
                  }}
                />
              </Grid>
              <Grid
                size={{ xl: 3, lg: 3, md: 12, sm: 12, xs: 12 }}
                sx={{ marginBottom: "3px" }}
                offset={{ xl: 1, lg: 1 }}
                justifyContent={"flex-end"}
                alignContent={errors?.path ? "center" : "flex-end"}
              >
                <Button
                  component="label"
                  fullWidth
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<FolderOpenIcon />}
                >
                  Browse
                  <HiddenInput
                    type="file"
                    onChange={(event) => {
                      clearErrors("path");
                      setFiles(event.target.files);
                      if (event.target.files?.length === 0) {
                        setFileBrowsed(false);
                      }
                      setFileBrowsed(true);
                    }}
                    multiple
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {managedApplication.isDocumentUploading && managedApplication.upDocumentLoadingProgress < 100 && (
            <Grid
              container
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              size={12}
              spacing={2}
            >
              <LinearProgress
                variant="determinate"
                value={managedApplication.upDocumentLoadingProgress}
              />
            </Grid>
          )}
          <Grid
            size={12}
            container
            justifyContent={"flex-start"}
            spacing={2}
            sx={{ marginTop: "10px" }}
          >
            <Grid size={{ xl: "grow", lg: "grow", md: "grow", sm: 12, xs: 12 }}>
              <Button
                onClick={handleSubmit(handleUpload)}
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid && !fileBrowsed}
                startIcon={<UploadIcon />}
              >
                UPLOAD
              </Button>
            </Grid>
            <Grid size={{ xl: "grow", lg: "grow", md: "grow", sm: 12, xs: 12 }}>
              <Button
                onClick={() => {
                  onClose();
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
    </>
  );
};
