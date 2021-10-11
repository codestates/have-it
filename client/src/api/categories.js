import api from "./index";

const categoriesApi = {
  getCategories: () => api.get("/categories"),
  getCategoryByEnTitle: (enTitle) => api.get(`/categories${enTitle}`),
};

export default categoriesApi;
