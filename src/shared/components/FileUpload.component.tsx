import {
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

export interface FileUploadComponentProps {
  open: boolean;
}

export const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  open,
}) => {
  const [uploadDocumentModelOpen, setUploadDocumentModelOpen] =
    useState<boolean>(false);

  const [files, setFiles] = useState<FileList | null>();

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
    defaultValues: {},
  });

  useEffect(() => {

    console.log(files);

  }, [files]);

  useEffect(() => {
    setUploadDocumentModelOpen(open);
  }, [open]);

  const handleUpload = () => {};
  return (
    <>
      <Modal open={uploadDocumentModelOpen} onClose={() => {}}>
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
                  {...register("path", {
                    required: "Document path",
                  })}
                  error={!!errors.path}
                  helperText={errors.path ? String(errors.path.message) : ""}
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
                offset={{xl: 1, lg: 1}}
                justifyContent={"flex-end"}
                alignContent={errors?.path ? "center" :"flex-end"}
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
                        clearErrors("path")
                        setFiles(event.target.files)
                    }}
                    multiple
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 3, lg: 3, md: 3, sm: 3 }}
          >
            <Button
              onClick={handleSubmit(handleUpload)}
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isValid}
              startIcon={<UploadIcon />}
            >
              UPLOAD
            </Button>
          </Grid>
          <Grid
            sx={{ marginTop: "10px" }}
            size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
            offset={{ xl: 1, lg: 1, md: 1, sm: 1 }}
          >
            <Button
              onClick={() => {
                setUploadDocumentModelOpen(false);
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
    </>
  );
};
