import React from 'react';
import './Sidebar.css';
import Adminimage from '../images/3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDashboard, faUser, faUsers, faChartLine, faPowerOff,
    faChat, faCalendarDays, faChartSimple ,faGear, faMessage ,faThumbTack ,faUserTie, faTrashAlt, faArchive, faListAlt, faBoxOpen
} from "@fortawesome/free-solid-svg-icons";

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { logout_user } from '../state/actions/authUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
    const userData = useSelector(state => state.auth.user);
    // const admin = useSelector(state => state.auth.isAdmin);
    // const agentt= useSelector(state => state.auth.isAgent);
    const image = `C:/Users/samiMehar/Desktop/mernstack/react app/CRMdesign/crmdesign/Backend/uploads/${userData?.img}`;
  const imagg = `/uploads/${userData?.img}`;
  console.log(imagg)
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        console.log("click logout");
        dispatch(logout_user());
      };

    return (
        <div className='sidebar' style={{ width: `${props.widthh}rem` }}>
            <div style={{ color: 'white' }}></div>
            <div className="image-area">
                <img src={imagg} alt="" />

                <h5 className="pt-2 adminname">{userData?.name}</h5>
                <p className="mt-n2 des">Admin Dashboard</p>
            </div>

            <div className="menu">
                <div className="menuitems ">
                    <NavLink to="/dashboard" className='anchortag ' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faDashboard} />
                        </div>
                        <span>
                            Dashboard
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems ">
                    <NavLink to="/lead" className='anchortag' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className='d-flex'>
                            <div className="menuicon">
                                <FontAwesomeIcon icon={faChartLine} />
                            </div>
                            <span>
                                Leads
                            </span>
                        </div>

                    </NavLink>

                </div>
                {/* <div className="menuitems d-flex flex-column">
                    <div>
                        <NavLink to="/agent" className='anchortag' style={{ textDecoration: 'none' }}>
                            <div className="menuicon">
                                <FontAwesomeIcon icon={faChartLine} />
                            </div>
                            <span>
                                Agents
                            </span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/agent" className='anchortag' style={{ textDecoration: 'none' }}>
                            <div className="menuicon">
                                <FontAwesomeIcon icon={faChartLine} />
                            </div>
                            <span>
                                Agents
                            </span>
                        </NavLink>
                    </div>
                </div> */}
                < div className="menuitems ">
                    <NavLink to="/agent" className='anchortag' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faUserTie} />
                        </div>
                        <span>
                            Agents
                        </span>
                    </NavLink>
                </div>


                <div className="menuitems">
                    <NavLink to="/vendor" className='anchortag' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <span>
                            Vendors
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/trackagent" className='anchortag' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faChartSimple} />
                        </div>
                        <span>
                            Agent Activity
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/pendingleads" className='anchortag' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faThumbTack} />
                        </div>
                        <span>
                            Pending Leads
                        </span>
                    </NavLink>
                </div>

                <div className="menuitems">
                    <NavLink to="/chat" className='anchortag' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faMessage} />
                        </div>
                        <span>
                            Chat with Agents
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <div className="sidebar-footer">
                        <div className="m-1">
                            <button type="button" className="btn logout" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faPowerOff} />
                                <span className="tooltiptext1" >Logout</span>
                            </button>
                        </div>
                        <div className="m-1">
                            <button type="button" className="btn eventt">
                                <FontAwesomeIcon icon={faGear} />
                                <span className="tooltiptext">Profile setting</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
