import React, { useEffect, useState } from 'react'
import appwriteMethods from './dbmethods';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const UpdateReminder = () => {
    const [desc, setDesc] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [sms, setSms] = useState('');
    const [date, setDate] = useState('');
    const [select, setSelect] = useState('Birthday');
    const [reminders, UpdateReminders] = useState([]);
    const [loading, setLoading] = useState(false);

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
        <div className='w-full bg-slate-600 h-screen justify-center items-center'>
            <h1>Update Reminder</h1>

            {reminders.map((reminder, key) => {
                return (
                    loading === true ? <h1>Loading</h1> : <div key={key} className=' rounded-lg p-2 bg-slate-50 m-20 gap-10 flex justify-center items-center'>
                        <h1 className='p-2 rounded-lg bg-slate-800 text-white'>{reminder.desc}</h1>
                        <Link to={{
                            pathname: `/update/${reminder.$id}`,
                        }}><button className='p-2 rounded-lg bg-green-600 text-white'>Update</button></Link>
                    </div>
                )
            })}

        </div>
    )
}

export default UpdateReminder