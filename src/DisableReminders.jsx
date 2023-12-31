import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import appwriteMethods from './dbmethods';


const DisableReminder = () => {
    const [reminders, UpdateReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()
    const getReminders = async (event) => {
        try {
            setLoading(true);
            const res = await appwriteMethods.getReminders();

            UpdateReminders(res);
            setLoading(false);
            console.log(res);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getReminders();
    }, [])
    return (
        <div>
            {reminders.map((reminder, key) => {
                return (
                    loading === true ? <h1>Loading</h1> : <div key={key} className=' rounded-lg p-2 bg-slate-50 m-20 gap-10 flex justify-center items-center'>
                        <h1 className='p-2 rounded-lg bg-slate-800 text-white'>{reminder.desc}</h1>
                        <button className='p-2 rounded-lg bg-red-700 text-white' onClick={() => navigate(`../disable/${reminder.$id}`)}>Disable</button>
                    </div>
                )
            })}
        </div>
    )
}

export default DisableReminder