import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import FormAuth from "Components/Auth/FormAuth/FormAuth";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true); // Mark the user as authenticated
        setShowLoginModal(false); // Close the login modal
    };

    const hideLoginModal = () => {
        setShowLoginModal(false); // Allow manual closing of the modal
    };

    return (
        <>
            {isAuthenticated ? (
                children
            ) : (
                <>
                    <FormAuth
                        showModalForm={showLoginModal}
                        hideModalForm={hideLoginModal}
                    />
                    {/* Keep the user on the home page */}
                    {<Navigate to="/" replace /> && !showLoginModal}
                </>
            )}
        </>
    );
};

export default PrivateRoute;
