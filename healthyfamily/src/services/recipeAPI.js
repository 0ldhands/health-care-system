import axios from "axios";

export const fetchRecipes = async (tags) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
    { params: { tags } }
  );
  return res.data;
};