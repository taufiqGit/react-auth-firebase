import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function LogOut() {
        try {
            await logout()
            history.push('/login')
        } catch (error) {
            setError("failed to log out")
        }
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser && currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-4">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={LogOut}>Log Out</Button>
            </div>
        </>
    )
}