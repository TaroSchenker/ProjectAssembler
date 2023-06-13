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
import "../src/App.css"
const ProjectAssembler = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("");
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
      ); 
  
      const zipBlob = new Blob([response.data], { type: "application/zip" });
      const zipUrl = URL.createObjectURL(zipBlob);
  
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "project.zip";
      link.click();
  
      setMessage("File has been downloaded! Check your download folder."); // Set message
  
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
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.7)", // Set background color to white with 80% opacity
        borderRadius: "4px", // Add border-radius
        padding: "2rem", // Add padding
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="text.primary" // Set text color to primary (usually black)
      > 
        Project Assembler
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Description"
          variant="outlined"
          placeholder=" a Node.js Express server that connects to the Twitter API and tweets at a regular schedule"
          fullWidth
          multiline
          rows={4}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
          margin="normal"
                    sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Set background color to white with 90% opacity
          }}

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
            Assemble Project
          </Button>
          {loading && (
            <Box mt={2}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </form>
      {/* {downloadUrl && (
        <Box mx={2}>
          <Typography variant="h6">Download your project:</Typography>
          <Button href={downloadUrl} variant="outlined" color="secondary">
            Download ZIP
          </Button>
        </Box>
      )} */}

    {message && (
      <Box mx={2}>
        <Typography variant="h6">{message}</Typography>
      </Box>
    )}
    </Container>
  );
};

export default ProjectAssembler;
