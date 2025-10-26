import { commonAPI } from './commonAPI';
import { serverURL } from './serverURL';

// Get all posters
export const getAllPosters = async () => {
  return await commonAPI('get', `${serverURL}/posters`, {});
};

// Get single poster by ID
export const getPosterById = async (id) => {
  return await commonAPI('get', `${serverURL}/posters/${id}`, {});
};

// Create new poster
export const createPoster = async (posterData) => {
  const data = {
    ...posterData,
    createdAt: new Date().toISOString()
  };
  return await commonAPI('post', `${serverURL}/posters`, data);
};

// Update existing poster
export const updatePoster = async (id, posterData) => {
  return await commonAPI('put', `${serverURL}/posters/${id}`, posterData);
};

// Delete poster
export const deletePoster = async (id) => {
  return await commonAPI('delete', `${serverURL}/posters/${id}`, {});
};