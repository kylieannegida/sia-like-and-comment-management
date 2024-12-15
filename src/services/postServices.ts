import axios from 'axios';

const POST_API_URL = 'http://localhost:3000/api/posts'; // URL of the Post Management System

// Function to get a post by ID
export const getPostById = async (postId: string) => {
  try {
    const response = await axios.get(`${POST_API_URL}/${postId}`);
    return response.data.post; // Return post data from the response
  } catch (error) {
    throw new Error('Post not found');
  }
};
