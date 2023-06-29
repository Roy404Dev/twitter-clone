import React from "react";
import { NavLink } from "react-router-dom";
import { FaTwitter } from 'react-icons/fa';
import { RiHome7Line, RiFileList3Line } from "react-icons/ri";
import { AiFillBell, AiFillTwitterSquare, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { FiMail, FiBookmark } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
const SideBar = () => {
  return (
    <div className="sideBar">
      <nav className="sideBarNav">
        <FaTwitter color="white" size={28} className="sideBarLogo"/>
        <ul className="navLinks">
          <li className="navLink">
            <NavLink to="home" className='navLinkRoute'>
              <RiHome7Line size={28}/>
              <span>Home</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="Explore" className='navLinkRoute'>
              <AiOutlineSearch size={28}/>
              <span>Explore</span> 
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="notifications" className='navLinkRoute'>
              <AiFillBell size={28}/>
              <span>Notifications</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="messages" className='navLinkRoute'>
              <FiMail size={28}/>
              <span>Messages</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="lists" className='navLinkRoute'>
              <RiFileList3Line size={28}/>
              <span>Lists</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="bookmarks" className='navLinkRoute'>
              <FiBookmark size={28}/>
              <span>Bookmarks</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="twitter_blue_sign_up" className='navLinkRoute'>
              <AiFillTwitterSquare size={28}/>
              <span>Twitter Blue</span>
            </NavLink>
          </li>
          <li className="navLink">
            <NavLink to="profile" className='navLinkRoute'>
              <AiOutlineUser size={28}/>
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="navMore">
            <CiCircleMore size={28}/>
            <span>More</span>
          </li>
        </ul>
        <button className="TweetBtn">Tweet</button>
      </nav>
    </div>
  );
};

export default SideBar;
