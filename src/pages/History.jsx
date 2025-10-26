import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import PosterCard from '../components/PosterCard';
import { getAllPosters, deletePoster } from '../services/api';

const History = () => {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const navigate = useNavigate();

  // Fetch all posters on component mount
  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      setLoading(true);
      const response = await getAllPosters();
      setPosters(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posters:', err);
      setError('Failed to load posters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this poster?')) {
      try {
        await deletePoster(id);
        setPosters(posters.filter(poster => poster.id !== id));
        showSnackbar('Poster deleted successfully!', 'success');
      } catch (err) {
        console.error('Error deleting poster:', err);
        showSnackbar('Failed to delete poster', 'error');
      }
    }
  };

  const handleEdit = (poster) => {
    navigate('/form', { state: { poster, isEdit: true } });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Poster History
      </Typography>

      {posters.length === 0 ? (
        <Alert severity="info">
          No posters found. Create your first poster to get started!
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {posters.map((poster) => (
            <Grid item xs={12} sm={6} md={4} key={poster.id}>
              <PosterCard
                poster={poster}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default History;