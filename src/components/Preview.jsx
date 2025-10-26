import React, { useRef } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadPoster } from '../utils/DownloadPoster';

const Preview = ({ formData }) => {
  const { heading, description, organization } = formData;
  const previewRef = useRef(null);

  const handleDownload = async () => {
    try {
      await downloadPoster(previewRef, 'my-poster');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper 
        ref={previewRef}
        elevation={3} 
        sx={{ p: 4, textAlign: 'center', minHeight: 300 }}
      >
        <Typography variant="h4" gutterBottom>
          {heading || 'Heading Here'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description || 'Description here...'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {organization || 'Organization / Footer'}
        </Typography>
      </Paper>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={!heading && !description}
        >
          Download Poster
        </Button>
      </Box>
    </Box>
  );
};

export default Preview;