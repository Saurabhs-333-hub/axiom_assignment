"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import appwriteMethods from "./dbmethods";
const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await appwriteMethods.createAccount(email, password, name);
            await appwriteMethods.createDocument(response.$id, name, email, password);
            console.log(response);


            // Redirect to reminder list page
            navigate('/login');

        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-800 flex flex-col items-center justify-center h-screen">
            <form className="bg-white p-10 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold text-gray-700 mb-4">Reminder App signup</h1>
                <label className="block mb-2 text-gray-700">Name</label>
                <input
                    required
                    type="text"
                    className="w-full p-2 bg-gray-200 border rounded-md text-gray-700"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

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
                    Signup
                </button>
                <span className="block mt-4 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500">
                        Login
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default SignupForm;
