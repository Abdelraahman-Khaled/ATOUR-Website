import GeneralAPI from "api/generalApi";
import React, { createContext, useContext, useState, useEffect } from "react";

const SubCategoriesContext = createContext(null);

export const SubCategoriesProvider = ({ children }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);
  const [errorSubCategories, setErrorSubCategories] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await GeneralAPI.getSubCategories();
        setSubCategories(response.data.trips); // Assuming the API returns data in this structure
      } catch (err) {
        setErrorSubCategories(err);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <SubCategoriesContext.Provider
      value={{ subCategories, loadingSubCategories, errorSubCategories }}
    >
      {children}
    </SubCategoriesContext.Provider>
  );
};

export const useSubCategories = () => useContext(SubCategoriesContext);