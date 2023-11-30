import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import appwriteMethods from './dbmethods';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await appwriteMethods.login(email, password);
            console.log(response);

            localStorage.setItem('token', response.$id);
            // Redirect to reminder list page
            navigate('/');

        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-800 flex flex-col items-center justify-center h-screen">
            <form className="bg-white p-10 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold text-gray-700 mb-4">Reminder App Login</h1>

                <label className="block mb-2 text-gray-700">Email</label>
                <input
                    required
                    type="email"
                    className="w-full p-2 bg-gray-200 border rounded-md text-gray-700"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label className="block mt-4 mb-2 text-gray-700">Password</label>
                <input
                    required
                    type="password"
                    className="w-full p-2 bg-gray-200 border rounded-md text-gray-700"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Login
                </button>

                <span className="block mt-4 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500">
                        Register
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default LoginForm;
