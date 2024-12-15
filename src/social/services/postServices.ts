import axios from "axios";

const POST_API_URL = "https://api.example.com/posts"; // Replace with your actual API URL

interface PostResponse {
  post: {
    id: string;
    title: string;
    content: string;
    // Add other properties as needed
  };
}

async function getPostData(postId: string): Promise<PostResponse["post"]> {
  try {
    const response = await axios.get<PostResponse>(`${POST_API_URL}/${postId}`);

    console.log("API Response:", response);

    if (response.data && response.data.post) {
      return response.data.post;
    } else {
      throw new Error("Post data not found in the response");
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
}

// Example usage
getPostData("12345")
  .then((postData) => {
    console.log("Post Data:", postData);
  })
  .catch((error) => {
    console.error("Failed to get post data:", error);
  });

export { getPostData };

