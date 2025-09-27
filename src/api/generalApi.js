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
  getFAQs: async (lang) => {
    const response = await axiosInstance.get("/faqs", {
      headers: {
        lang: lang,
      },
    });
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
  getTerms: async (language) => {
    const response = await axiosInstance.get("/terms", {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  // Blogs
  getBlogs: async (language) => {
    const response = await axiosInstance.get("/blogs", {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  getBlogDetails: async (id, language) => {
    const response = await axiosInstance.get(`/blogs/${id}`, {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
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
  getArticles: async (language) => {
    const response = await axiosInstance.get("/articles", {
      headers: {
        lang: language,
      },
    });
    return response.data;
  },
  // Articles
  getArticleDetails: async (id, language) => {
    const response = await axiosInstance.get(`/articles/${id}`, {
      headers: {
        lang: language,
      },
    });
    return response.data;
  },

  // News
  getNews: async (language) => {
    const response = await axiosInstance.get("/news", {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  getNewsDetails: async (id, language) => {
    const response = await axiosInstance.get(`/news/${id}`, {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  // Sliders
  getSliders: async (language) => {
    const response = await axiosInstance.get("/sliders", {
      headers: {
        lang: language,
      },
    });
    return response.data;
  },

  // Ads
  getAds: async () => {
    const response = await axiosInstance.get("/ads");
    return response.data;
  },

  // Why Bookings
  getWhyBookings: async () => {
    const response = await axiosInstance.get("/why_bookings");
    return response.data;
  },

  // Send Ticket
  sendTicket: async ({ title, description }) => {
    const response = await axiosInstance.post("/tickets", {
      title,
      description,
    });
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
