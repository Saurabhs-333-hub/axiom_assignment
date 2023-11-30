import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteMethods from './dbmethods';

const Enable = () => {
    const [reminders, UpdateReminders] = useState({});
    const params = useParams()
    const navigate = useNavigate()
    const getReminder = async (event) => {
        try {
            const res = await appwriteMethods.getReminder(params.id);
            UpdateReminders(res);
            console.log(res);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getReminder();
    })
    return (
        <div className='w-full flex flex-col gap-2 justify-center h-screen items-center'>
            <h1>Subject: {reminders.select}</h1>
            <pre>Description: {reminders.desc}</pre>
            <button className='p-2 rounded-lg bg-green-700 text-white' onClick={() => {
                appwriteMethods.enableReminder(params.id);
                navigate('/enableReminders')
            }
            }>Enable</button>
            <button className='p-2 rounded-lg bg-blue-700 text-white' onClick={() => navigate('/enableReminders')}>Back</button>
        </div>
    )
}

export default Enable