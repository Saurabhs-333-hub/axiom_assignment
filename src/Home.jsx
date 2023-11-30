import React, { useEffect, useState } from 'react'
import appwriteMethods from './dbmethods';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [username, setUsername] = useState('');
    const persistUser = async () => {
        try {
            const response = await appwriteMethods.getAccount();
            console.log(response);
            // token = response.$id;
            localStorage.setItem('name', response.name);
            setUsername(response.email);
            return response;
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        persistUser()
        return () => {
            clearInterval(interval);
        };
    }, []);

    const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });

    const formattedDate = `Today is ${currentDay}, ${currentDate.getDate()}th of ${month}`;
    const navigate = useNavigate()
    return (
        <>
            <div className="w-full flex flex-col gap-2 justify-center h-screen items-center">
                <h1 className="text-xl font-bold text-gray-700 mb-4">Welcome to the remiders application {localStorage.getItem("name")}</h1>
                <h2 className="text-xl font-bold text-gray-700 mb-4">{formattedDate}</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={
                        () => {
                            navigate('/setReminder');
                        }
                    }
                >Set Reminder</button>


                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={
                        () => {
                            navigate('/updateReminder');
                        }
                    }
                >Modify Reminder</button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={
                        () => {
                            navigate('/deleteReminders');
                        }
                    }
                >Delete Reminder</button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={
                        () => {
                            navigate('/disableReminders');
                        }
                    }
                >Disable Reminder</button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={
                        () => {
                            navigate('/enableReminders');
                        }
                    }
                >Enable Reminder</button>


                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={
                        () => {
                            navigate('/view');
                        }
                    }
                >View Your Reminders</button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    onClick={async () => {
                        await appwriteMethods.logout();
                        localStorage.setItem('token', null);

                        navigate('/login');
                    }}
                >Logout</button>
            </div>
        </>
    )
}

export default Home