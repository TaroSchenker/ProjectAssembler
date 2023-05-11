import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import {
    Button,
    Box,
    Typography,
    Container,
    TextField,
    CircularProgress,
  } from "@mui/material";

const FolderStructure = ({ structure, path = "" }: any) => {
  return (
    <List>
      {Object.entries(structure).map(([key, value]) => {
        const newPath = path ? `${path}/${key}` : key;
        if (typeof value === "object") {
          return (
            <React.Fragment key={newPath}>
              <ListItem>
                <ListItemText primary={newPath} />
              </ListItem>
              <FolderStructure structure={value} path={newPath} />
            </React.Fragment>
          );
        } else {
          return (
            <ListItem key={newPath}>
              <ListItemText primary={newPath} />
            </ListItem>
          );
        }
      })}
    </List>
  );
};

export default FolderStructure;
