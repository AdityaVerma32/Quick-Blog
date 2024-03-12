import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


// this a mechanism to protect the pages and routes
// it is a container used only to pass components
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        //Authentication Check:

        // It checks if authentication is true and if the authStatus doesn't match authentication. If so, it means the user is not authenticated but is trying to access a protected route.
        // In this case, it navigates the user to the login page using the navigate function.

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        }

        // Redirect to Login or Home:

        // If authentication is false (meaning the route is not protected) and authStatus doesn't match authentication, it navigates the user to the home page.
        // This condition handles the case where the user is authenticated but tries to access a non-protected route.
        else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

