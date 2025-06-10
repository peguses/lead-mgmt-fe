import { Grid2 as Grid, IconButton } from "@mui/material";
import { Document } from "../redux/application.slice";
import styled from "@emotion/styled";
import usePermission from "../hooks/usePermission";
import { Permission } from "../redux/role.slice";
import { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadDocument } from "../services/application.service";

export interface DocumentListComponentProps {
  documents: Document[];
}

export const DocumentListComponent: React.FC<any> = ({ documents }) => {
    const yScroll = {
      maxHeight: "300px",
      overflowY: "auto",
      border: "1px solid #ccc",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#FFFFF",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#1E3A5F",
        borderRadius: "10px",
        border: "3px solid #FFFFF",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#1E3A5F",
      },
    };

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

  const { hasPermission } = usePermission();

  const [canDownload, setCanDownload] = useState<boolean>(true);

  useEffect(() => {
    setCanDownload(hasPermission([Permission.DOWNLOAD_DOCUMENT]));
  }, [hasPermission]);

  const handleDownload = async (name, path) => {
    try {
      const response = await downloadDocument(path);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = name;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading:", error);
    }
  };

  return (
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
          <StyledGrid size={6} sx={{ paddingLeft: "5px" }}>
            Name
          </StyledGrid>
          <StyledGrid size={canDownload ? 5 : 6}>Remark</StyledGrid>
          {canDownload && <StyledGrid size={1}>Action</StyledGrid>}
        </Grid>
      </Grid>
      <Grid container size={12} spacing={0} sx={yScroll}>
        {documents?.map((document: Document, index) => {
          return (
            <Grid key={index} container size={12}>
              <StyledGrid
                size={6}
                sx={{
                  borderLeft: "1px solid #ccc",
                  backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                }}
              >
                <StyledCell>{document.name}</StyledCell>
              </StyledGrid>
              <StyledGrid
                size={canDownload ? 5 : 6}
                sx={{
                  borderLeft: "1px solid #ccc",
                  backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                }}
              >
                <StyledCell>{document.remark}</StyledCell>
              </StyledGrid>
              {canDownload && (
                <StyledGrid
                  size={1}
                  sx={{
                    borderLeft: "1px solid #ccc",
                    backgroundColor: index % 2 === 0 ? "#d6dce2" : "white",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => handleDownload(document.name, document.id)}
                  >
                    <DownloadIcon />
                  </IconButton>
                </StyledGrid>
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
