import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteMethods from './dbmethods';

const Disable = () => {
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
            <button className='p-2 rounded-lg bg-red-700 text-white' onClick={() => {
                appwriteMethods.disableReminder(params.id);
                navigate('/disableReminders')
            }
            }>Disable</button>
            <button className='p-2 rounded-lg bg-blue-700 text-white' onClick={() => navigate('/disableReminders')}>Back</button>
        </div>
    )
}

export default Disable