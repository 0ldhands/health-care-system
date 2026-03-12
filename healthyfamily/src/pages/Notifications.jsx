import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../App.jsx';
import { GoTrash } from "react-icons/go";

const Notifications = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(GlobalState);

  const load = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notifications');
      setNotes(res.data || []);
    } catch (err) {
      console.error('failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const markRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
      setNotes(notes.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };


  const deletMessage=async(id)=>{
    await axios.delete(`http://localhost:5000/api/notifications/${id}`)
    load();
  }

  return (
    <div className="notifications-page absolute top-20 left-100 bg-violet-100 h-100 w-100 rounded-2xl border  border-violet-400 overflow-auto">
      <h2 className="text-center">Notifications</h2>
      {notes.length === 0 && <p className="text-center relative top-5/12">No notifications</p>}
      <ul style={{margin:"10px",}}>
        {notes.map(n => (
          <li key={n._id} classNmae="border border-green-300" style={{ background: n.read ? '#eee' : '#C4F797' ,margin:"5px",padding:"5px",borderRadius:"10px"}}>
            <p>{n.message}</p>
            <small style={{color:"gray"}}>{new Date(n.date).toLocaleString()}</small>
            {!n.read && <button style={{position:"absolute",right:"60px",border:"1px solid gray",padding:"2px",borderRadius:"5px",fontSize:"small"}} onClick={() => markRead(n._id)}>Mark read</button>}
            <button style={{position:"absolute",right:"30px"}} onClick={() => deletMessage(n.reminderId)}><GoTrash/></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;