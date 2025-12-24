import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const MyContext = createContext();

export function MyProvider({ children }) {
    const navigate = useNavigate();
    const [balance, setbalance] = useState(0);
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [receiverId, setreceiverId] = useState(""); 
    const [receiverName, setreceiverName] = useState("");

    const [allusers,setallusers] = useState()

    // Helper function to handle token expiration
    const handleTokenExpiration = (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            const errorData = error.response?.data;
            if (errorData?.errorType === 'TokenExpiredError' || errorData?.error === 'jwt expired') {
                localStorage.removeItem("token");
                const currentPath = window.location.pathname;
                // Only show toast and redirect if not already on auth pages
                if (currentPath !== "/" && currentPath !== "/signin" && currentPath !== "/signup") {
                    toast.error("Session expired. Please sign in again.");
                    navigate("/signin");
                }
                return true;
            }
        }
        return false;
    }

    async function fetchData() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found!");

                return;
            }

            console.log("Sending request with token:", token ? "Token exists" : "No token");

            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/account/balance`, {
                headers: {
                    Authorization: token
                }
            });

            setbalance(response.data.balance);
            setfirstname(response.data.firstname);
            setlastname(response.data.lastname);
        } catch (error) {
            console.error("Error fetching data:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);
            handleTokenExpiration(error);
        }
    }

    //fetch users for dashboard page
    async function fetchUsers() {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                console.log("No token found!");

                return;
            }

            console.log("Fetching users with token:", token ? "Token exists" : "No token");

            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/bulk`,{
                headers: {
                    Authorization: token
                }
            })
            setallusers(response.data.allusers)
        } catch (error) {
            console.error("Error fetching users:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);
            handleTokenExpiration(error);
        }
    }

    // Fetch data when the component mounts - only if token exists and not on auth pages
    useEffect(() => {
        const token = localStorage.getItem("token");
        const currentPath = window.location.pathname;
        
        // Only fetch data if user is logged in and not on auth pages
        if (token && currentPath !== "/" && currentPath !== "/signin" && currentPath !== "/signup") {
            fetchData();
            fetchUsers();
        }
    }, []);

    return (
        <MyContext.Provider value={{ 
            balance, setbalance, firstname,setfirstname, lastname,setlastname,
            receiverId, setreceiverId, receiverName, setreceiverName, allusers, setallusers,
            fetchData, fetchUsers
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyProvider;