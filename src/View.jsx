import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import appwriteMethods from './dbmethods';
import { useParams } from 'react-router-dom';


const ViewReminders = () => {
    const [reminders, UpdateReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()
    const getReminders = async (event) => {
        try {
            setLoading(true);
            const res = await appwriteMethods.getReminders();

            UpdateReminders(res);
            setLoading(false)
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
                        <button className='p-2 rounded-lg bg-green-700 text-white' onClick={() => navigate(`/`)}>Back</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ViewReminders