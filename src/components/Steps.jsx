import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { createPoster, updatePoster } from '../services/api';

const steps = ['Heading', 'Description', 'Organization'];

const Steps = ({ formData, setFormData, setIsFinished, isEdit = false, posterId = null }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSavePoster();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSavePoster = async () => {
    setLoading(true);
    try {
      if (isEdit && posterId) {
        // Update existing poster
        await updatePoster(posterId, formData);
        showSnackbar('Poster updated successfully!', 'success');
      } else {
        // Create new poster
        await createPoster(formData);
        showSnackbar('Poster created successfully!', 'success');
      }
      
      setIsFinished(true);
      
      // Redirect to history page after 2 seconds
      setTimeout(() => {
        navigate('/history');
      }, 2000);
    } catch (error) {
      console.error('Error saving poster:', error);
      showSnackbar('Failed to save poster. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderStepContent = (step) => {
    switch(step) {
      case 0:
        return (
          <TextField
            fullWidth
            label="Heading"
            variant="outlined"
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            error={!formData.heading && activeStep > 0}
            helperText={!formData.heading && activeStep > 0 ? 'Heading is required' : ''}
          />
        );
      case 1:
        return (
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={!formData.description && activeStep > 1}
            helperText={!formData.description && activeStep > 1 ? 'Description is required' : ''}
          />
        );
      case 2:
        return (
          <TextField
            fullWidth
            label="Organization / Footer"
            variant="outlined"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        {renderStepContent(activeStep)}
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button 
          variant="contained" 
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            activeStep === steps.length - 1 ? (isEdit ? 'Update' : 'Finish') : 'Next'
          )}
        </Button>
      </Box>

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

export default Steps;