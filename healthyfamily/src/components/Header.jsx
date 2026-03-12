import React, { useContext, useEffect, useState } from 'react'
import {GlobalState} from "../App.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from 'react-icons/io';
import axios from 'axios';
import "../../style.css"
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const {showProfile, setShowProfile,notificationbtn,setNotificationbtn}=useContext(GlobalState)


    const navi=useNavigate()

    const { user } = useContext(GlobalState);
    const [unread, setUnread] = useState(0);

    const fetchCount = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notifications/unread-count');
        setUnread(res.data.count || 0);
      } catch (err) {
        console.error('could not fetch unread notification count', err);
      }
    };

    useEffect(() => {
      let previousCount = 0;
      const poll = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/notifications');
          const all = res.data || [];
          const newUnread = all.filter(n => !n.read).length;
          setUnread(newUnread);

          if (newUnread > previousCount && Notification.permission === 'granted') {
            const diff = newUnread - previousCount;
            // show browser notification summarizing
            new Notification('You have new reminder notification', {
              body: `You have ${diff} new item${diff > 1 ? 's' : ''}`,
            });
          }
          previousCount = newUnread;
        } catch (err) {
          console.error('could not fetch notifications', err);
        }
      };

      poll();
      const iv = setInterval(poll, 30000);
      return () => clearInterval(iv);
    }, []);

    return (
        <div>
            <header className="home-header" style={{ position: 'relative' }}>
                <div
                    className="profile-box"
                    onClick={() => setShowProfile(true)}
                >
                    <img
                        src={
                          user.profileImage
                            ? `http://localhost:5000/uploads/${user.profileImage}`
                            : "https://via.placeholder.com/40"
                        }
                        alt="profile"
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                </div>
                        <div className='text-white'>
                            <ul className=' flex flex-row gap-10'>
                                <li className='inline-block cursor-pointer'><Link to="/home">Home</Link></li>
                                <li className='inline-block cursor-pointer'><Link to="/about">About</Link></li>
                                <li className='inline-block cursor-pointer'><Link to="/contact">Contact</Link></li>
                                <li className='inline-block cursor-pointer'><Link to="/reminder">Reminder</Link></li>
                                <li className='inline-block cursor-pointer relative'>
                                  <Link >
                                    <IoMdNotifications size={24} onClick={() => setNotificationbtn(!notificationbtn)}/>
                                    {unread > 0 && (
                                      <span className="notification-badge">{unread}</span>
                                    )}
                                  </Link>
                                </li>
                            </ul>
                        </div>
                <h1 className="special-text">Healthy-Family</h1>
            </header>
        </div>
    )
}

export default Header