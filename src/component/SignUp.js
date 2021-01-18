import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'

export default function SignUp(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { singup, currentUser } = useAuth()
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password do not match')
        }    
        try {
            setError('')
            setLoading(true)
            await singup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (error) {
            console.log(error)
            setError('Failed to create Account')
        }
        setLoading(false)
    }

    return(
        <>
          <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {currentUser && <h2>{currentUser.email}</h2>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                    Sign Up
                </Button>
            </Form>
            </Card.Body>
        </Card>
         <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link> 
         </div>
        </>
    )
}