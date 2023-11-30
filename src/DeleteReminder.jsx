import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import appwriteMethods from './dbmethods';
import { useParams } from 'react-router-dom';


const DeleteReminder = () => {
    const [reminders, UpdateReminders] = useState([]);

    const navigate = useNavigate()
    const getReminders = async (event) => {
        try {
            const res = await appwriteMethods.getReminders();

            UpdateReminders(res);
            console.log(res);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getReminders();
    })
    return (
        <div>
            {reminders.map((reminder, key) => {
                return (
                    <div className=' flex justify-center items-center gap-2 flex-col' key={key}>
                        <h1 >{reminder.desc}</h1>
                        <button className='bg-red-700 rounded-lg p-2 text-white' onClick={() => {
                            appwriteMethods.deleteReminder(reminder.$id);
                            navigate('/deleteReminders')
                        }}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default DeleteReminder