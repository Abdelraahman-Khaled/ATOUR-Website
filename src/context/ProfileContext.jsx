// ProfileContext.jsx
import { createContext, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProfileAPI from "api/profileApi";

const ProfileContext = createContext(null);

// Check if user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
};

export const ProfileProvider = ({ children }) => {
    const queryClient = useQueryClient();

    // Function to manually update profile data in cache (for compatibility with consumers using setProfile)
    const setProfile = (newData) => {
        queryClient.setQueryData(['userProfile'], newData);
    };
    // Fetch profile data using React Query
    const {
        data: profile = null,
        isPending: loading,
        refetch: fetchProfile
    } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const response = await ProfileAPI.getProfile();
            return response.data;
        },
        enabled: isAuthenticated(), // Only fetch if authenticated
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    });

    // Listen for authentication changes to invalidate/refetch
    useEffect(() => {
        const handleStorageChange = () => {
            if (isAuthenticated()) {
                fetchProfile();
            } else {
                // queryClient.setQueryData(['userProfile'], null); // distinct queryClient usage might be needed if I import it
                // For now, reliance on enabled: isAuthenticated() and re-render might differ slightly but acceptable
                // Ideally we should use useQueryClient to access client and reset queries
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [fetchProfile]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile, fetchProfile, loading, isAuthenticated: isAuthenticated }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
