import axiosInstance from "./axiosInstance";

const GeneralAPI = {
  // Get preferred settings
  getPreferredSettings: async () => {
    const response = await axiosInstance.get("/get_prefered_setting");
    return response.data;
  },

  // Change preferred settings
  changePreferredSettings: async ({ lang, currencyId }) => {
    const response = await axiosInstance.post("/change_prefered_setting", {
      lang,
      currency_id: currencyId,
    });
    return response.data;
  },

  // FAQs
  getFAQs: async () => {
    const response = await axiosInstance.get("/faqs");
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
  },

  // Subcategories
  getSubCategories: async () => {
    const response = await axiosInstance.get("/sub_categories");
    return response.data;
  },

  // Privacy
  getPrivacy: async () => {
    const response = await axiosInstance.get("/privacy");
    return response.data;
  },

  // About
  getAbout: async () => {
    const response = await axiosInstance.get("/about");
    return response.data;
  },

  // Contact
  getContact: async () => {
    const response = await axiosInstance.get("/contact");
    return response.data;
  },

  // Terms
  getTerms: async () => {
    const response = await axiosInstance.get("/terms");
    return response.data;
  },

  // Blogs
  getBlogs: async () => {
    const response = await axiosInstance.get("/blogs");
    return response.data;
  },

  // Footer Social
  getFooterSocial: async () => {
    const response = await axiosInstance.get("/footer");
    return response.data;
  },

  // Jobs
  getJobs: async () => {
    const response = await axiosInstance.get("/jobs");
    return response.data;
  },

  // Articles
  getArticles: async () => {
    const response = await axiosInstance.get("/articles");
    return response.data;
  },

  // Sliders
  getSliders: async () => {
    const response = await axiosInstance.get("/sliders");
    return response.data;
  },

  // Ads
  getAds: async () => {
    const response = await axiosInstance.get("/ads");
    return response.data;
  },

  // Header (with filters and sorting)
  getHeader: async (filters) => {
    const response = await axiosInstance.get("/header", {
      params: filters,
    });
    return response.data;
  },
};

export default GeneralAPI;
