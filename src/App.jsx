import logo from './logo.svg';
import './App.css';
import LoginForm from './Login';
import { Route, Router, Routes } from 'react-router-dom';
import SignupForm from './SignUp';
import Navbar from './Navbar';
import Home from './Home';
import { useEffect } from 'react';
import appwriteMethods from './dbmethods';
import SetReminder from './SetReminder';
import UpdateReminder from './UpdateReminder';
import Upadte from './Upadte';
import EnableReminder from './EnableReminder';
import Enable from './Enable';
import DeleteReminder from './DeleteReminder';
import DisableReminder from './DisableReminders';
import Disable from './Disable';
import ViewReminders from './View';

export default function App() {

  const persistUser = async () => {
    try {
      const response = await appwriteMethods.getAccount();
      console.log(response);
      // token = response.$id;
      localStorage.setItem('token', response.$id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    persistUser();
  })


  return (
    <>
      <Routes>
        < Route path="/login" element={<LoginForm />} />
        < Route path="/" element={<Home />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/setReminder" element={<SetReminder />} />
        <Route path="/updateReminder" element={<UpdateReminder />} />
        <Route path="/update/:id" element={<Upadte />} />
        <Route path="/enableReminders" element={<EnableReminder />} />
        <Route path="/enable/:id" element={<Enable />} />
        <Route path="/disableReminders" element={<DisableReminder />} />
        <Route path="/disable/:id" element={<Disable />} />
        <Route path="/deleteReminders" element={<DeleteReminder />} />
        < Route path="/view" element={<ViewReminders />} />






      </Routes>
    </>
  )
}