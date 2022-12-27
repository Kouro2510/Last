import React, {useState} from "react";
import {HiMenu, HiMenuAlt3} from "react-icons/hi";
import {Link, Outlet, useNavigate} from "react-router-dom";
import "./Sidebar.scss"
import {AiFillDashboard, AiFillSetting, AiFillTags} from "react-icons/ai";
import {BsNewspaper} from "react-icons/bs";
import {FaUsers} from "react-icons/fa";
import {FiUser} from "react-icons/fi";
import {IoCarSportSharp} from "react-icons/io5";
import {TfiLayoutSliderAlt} from "react-icons/tfi";
import {GiFlatTire} from "react-icons/gi";
import {MdCategory, MdLogout} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import Tippy from '@tippyjs/react/headless';
import images from "~/Asset/Image";
import config from "~/config";
import {axiosMiddle} from "~/services/axiosJWT";
import {logoutUser} from "~/redux/apiReques";
import jwt_decode from "jwt-decode";
const SideBar = () => {
    const [open, setOpen] = useState(true);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const list = [
        {name: "Dashboard", link: "/admin/", icon: <AiFillDashboard size="20"/>, group: "DashBoard"},
        {name: "Blog", link: "/admin/blog", icon: <BsNewspaper size="20"/>, group: "Blog"},
        {name: "Employee", link: "/admin/employee", icon: <FaUsers size="20"/>, group: "User"},
        {name: "Customer", link: config.routes.customer, icon:<FiUser size="20"/>, group: "User"},
        {name: "Brand", link: config.routes.brands, icon:<AiFillTags size="20"/>, group: "Product"},
        {name: "Car", link: config.routes.product, icon: <IoCarSportSharp size="20"/>, group: "Product"},
        {name: "Banner", link: "/admin/banner", icon: <TfiLayoutSliderAlt size="20"/>, group: "Website"},
        {name: "Category", link: "/admin/category", icon: <MdCategory size="20"/>, group: "Product"},
        {name: "Car Item", link: "/admin/caritem", icon: <GiFlatTire size="20"/>, group: "Product"},
        {name: "Setting", link: "/admin/setting", icon: <AiFillSetting size="20"/>, group: "Setting"},

    ]
    const ListItem = list.reduce((grb, item) => {
        (grb[item.group] = grb[item.group] || []).push(item);
        return grb
    }, {});
    const toggleIsPasswordShowValue = () => {
        setIsPasswordShow(!isPasswordShow);
    };
    const idUser = user?.user.id;
    const click =() =>{
        toggleIsPasswordShowValue();
        setOpen(!open)
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        if (user) {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
            console.log(idUser);

            if (idUser) {
                let res = await logoutUser(dispatch, axiosJWT, idUser, user?.accessToken, navigate);
                console.log(res);
            }
        }
    };
    return (
        <div className={`sidebar bg-[#d71414] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 position-relative flex-2`}>
            <div className="py-3 flex justify-end">
                <button  onClick={click}>
                    {
                        isPasswordShow?  <HiMenu size={26} className="cursor-pointer"/> : <HiMenuAlt3 size={26} className="cursor-pointer" />
                    }
                </button>
            </div>
            <div className="flex flex-row mb-3 pb-1">
                <div className={`flex items-center space-x-4 ${!open && "mt-5 mb-5"}`}>
                    <Tippy
                        render={(attrs) => (<div className="box" tabIndex="-1" {...attrs}>

                        </div>)}>
                            <img
                                src={user?.photo ? user.photo : images.noImage}
                                alt=""
                                className={`w-10 h-10 rounded-full ${!open && "left-4.5 w-8 h-8 absolute"}`}
                            />
                    </Tippy>
                </div>

                <h2 style={{transitionDelay: `200ms`,}}
                    className={`ml-12 mt-2 whitespace-pre uppercase duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden uppercase"}`}>{user?.username ? user.username : " "} </h2>
                <h2 className={`${open && "hidden"} uppercase absolute left-48 bg-white font-semibold whitespace-pre
                    text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1
                    group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>Test</h2>
            </div>
            <hr className="w-full"/>
            <ul className="mt-3">
                <div>
                    {Object.keys(ListItem).map(function (side, key) {
                        return (
                            <div key={key}>
                                <h1 className={`whitespace-pre duration-1000 ${!open && "opacity-0 translate-x-28 hidden"}`}>{side}</h1>
                                {
                                    ListItem[side].map(function (item, i) {
                                        return (
                                            <div>
                                                <Link to={item.link} key={i}
                                                      className={`group flex items-center text-sm  gap-3.5 font-medium py-1 rounded-md`}>
                                                    <li className=" group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md">
                                                        {item.icon}
                                                        <h2 style={{transitionDelay: `${i + 3}00ms`,}}
                                                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>{item.name}</h2>
                                                        <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre
                    text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1
                    group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                                                            {item.name}</h2>
                                                    </li>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        );
                    })}
                    <h1 className={`whitespace-pre duration-1000 ${!open && "opacity-0 translate-x-28 hidden "}`}>Logout</h1>
                    <div className={`group flex items-center text-sm  gap-3.5 font-medium py-1 rounded-md`}>
                        <li className=" group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md hover:cursor-pointer" onClick={() => handleLogout()}>
                            <MdLogout size={20}/>
                            <h2 style={{transitionDelay: `{2 + 3}00ms`,}}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>Logout</h2>
                            <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre
                    text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1
                    group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                                Logout</h2>
                        </li>
                    </div>
                </div>
            </ul>
            <Outlet/>
        </div>
    )
};

export default SideBar;