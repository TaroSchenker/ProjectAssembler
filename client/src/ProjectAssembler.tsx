import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  TextField,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import axios from "axios";

const ProjectAssembler = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/generate",
        {
          prompt: projectDescription,
        },
        { responseType: "arraybuffer" }
      ); // Set responseType to arraybuffer

      // Create a Blob from the zip buffer and generate an object URL
      const zipBlob = new Blob([response.data], { type: "application/zip" });
      const zipUrl = URL.createObjectURL(zipBlob);

      // Create a temporary anchor element and trigger a click to download the file
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "project.zip";
      link.click();

      // Revoke the object URL after use
      setTimeout(() => {
        URL.revokeObjectURL(zipUrl);
      }, 100);
    } catch (error) {
      console.error("Error generating project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Project Assembler
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
          margin="normal"
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            Generate Project
          </Button>
          {loading && (
            <Box mt={2}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </form>
      {downloadUrl && (
        <Box mt={2}>
          <Typography variant="h6">Download your project:</Typography>
          <Button href={downloadUrl} variant="outlined" color="secondary">
            Download ZIP
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProjectAssembler;
