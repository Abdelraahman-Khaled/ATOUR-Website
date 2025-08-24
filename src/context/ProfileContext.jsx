// ProfileContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import ProfileAPI from "api/profileApi";

const ProfileContext = createContext();

// Check if user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
};

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        // Only fetch profile if user is authenticated
        if (!isAuthenticated()) {
            setLoading(false);
            return;
        }
        
        try {
            const response = await ProfileAPI.getProfile();
            setProfile(response.data);
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    // Listen for authentication changes
    useEffect(() => {
        const handleStorageChange = () => {
            if (isAuthenticated()) {
                fetchProfile();
            } else {
                setProfile(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        fetchProfile();

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, setProfile, fetchProfile, loading, isAuthenticated: isAuthenticated }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
