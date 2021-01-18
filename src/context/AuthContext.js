import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function singup(email, password) {
        return Auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return Auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return Auth.signOut()
    }

    function resetPassword(email) {
        return Auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return Auth.currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return Auth.currentUser.updatePassword(password)
    }

    useEffect(()=>{
       const unsubcribe = Auth.onAuthStateChanged((user)=>{
            setCurrentUser(user)
            setLoading(false)
        })
        console.log(unsubcribe)
        return unsubcribe
    }, [])

    const value = {
        currentUser,
        singup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return(
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}