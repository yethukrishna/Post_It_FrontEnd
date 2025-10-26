import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Steps from './Steps';
import Preview from './Preview';
import Box from '@mui/material/Box';

const Form = () => {
  const location = useLocation();
  const editPoster = location.state?.poster;
  const isEdit = location.state?.isEdit || false;

  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    organization: ''
  });
  const [isFinished, setIsFinished] = useState(false);

  // Load existing poster data if editing
  useEffect(() => {
    if (isEdit && editPoster) {
      setFormData({
        heading: editPoster.heading || '',
        description: editPoster.description || '',
        organization: editPoster.organization || ''
      });
    }
  }, [isEdit, editPoster]);

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, p: 3 }}>
      {!isFinished ? (
        <>
          <Box sx={{ flex: 1 }}>
            <Steps 
              formData={formData} 
              setFormData={setFormData} 
              setIsFinished={setIsFinished}
              isEdit={isEdit}
              posterId={editPoster?.id}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Preview formData={formData} />
          </Box>
        </>
      ) : (
        <Preview formData={formData} />
      )}
    </Box>
  );
};

export default Form;