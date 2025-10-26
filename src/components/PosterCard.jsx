import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadPoster } from '../utils/DownloadPoster';

const PosterCard = ({ poster, onDelete, onEdit }) => {
  const posterRef = useRef(null);

  const handleDownload = async () => {
    try {
      await downloadPoster(posterRef, `poster-${poster.id}`);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent ref={posterRef} sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {poster.heading || 'Untitled'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {poster.description || 'No description'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {poster.organization || 'No organization'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.disabled">
            Created: {formatDate(poster.createdAt)}
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Tooltip title="Download">
          <IconButton color="primary" onClick={handleDownload}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton color="info" onClick={() => onEdit(poster)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => onDelete(poster.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default PosterCard;