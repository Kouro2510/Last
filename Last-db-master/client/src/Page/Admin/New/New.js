import styles from './New.module.scss';
import classNames from 'classnames/bind';
import images from "~/Asset/Image";
import { useState } from 'react';
import CommonUtils from '~/utils/CommonUtlis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { refreshToken } from '~/services';
import { loginSuccess } from '~/redux/authSlice';
import { createNewUser } from '~/redux/apiReques';
import { toast } from 'react-toastify';
import {AiFillFolderAdd} from "react-icons/ai";

const cx = classNames.bind(styles);
function New() {
    let [state, setState] = useState({
        username:'',
        firstName: '',
        lastName: '',
        address: '',
        gender: '',
        email: '',
        password: '',
        phonenumber: '',
        avatar: '',
        role: '',
    });

    let [reviewAvatar, setReviewAvatar] = useState('');

    const user = useSelector((state) => state.auth.login?.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
    });

    axiosJWT.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodeToken = jwt_decode(user?.accessToken);
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(loginSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    const handleOnchangeImg = async (e) => {
        let data = e.target.files;
        let files = data[0];

        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            setState({
                ...state,
                avatar: base64,
            });
            let objectUrl = URL.createObjectURL(files);
            setReviewAvatar(objectUrl);
        }
    };
    const handleOnchangeInput = (e, id) => {
        let copyState = { ...state };

        copyState[id] = e.target.value;

        setState(copyState);
    };

    const handleSaveUser = async (e) => {
        console.log(state);
        e.preventDefault();

        let res = await createNewUser(state, user?.accessToken, dispatch, axiosJWT);

        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            navigate(config.routes.employee);
        } else {
            toast.error(res.errMessage);
        }
    };

    return (
        <>
            <div className={`dark:text-white dark:placeholder-white ${cx('new')}`}>
                <div className={cx('new-container')}>
                    <div className={cx('top')}>
                        <h1 className="text-blue-900">Add new user</h1>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={`${cx('left')} relative`}>
                            <img src={reviewAvatar ? reviewAvatar : images.noImage} alt=""  />
                            <div className={cx('form-input')}>
                                <label htmlFor="file" className="absolute right-8 top-60">
                                    <AiFillFolderAdd className={`dark:fill-white ${cx('icon')} fill-gray-700`} size="40"/>
                                </label>
                                <input
                                    onChange={(e) => handleOnchangeImg(e)}
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <form>
                                <div className={cx('form-input')}>
                                    <label>User Name</label>
                                    <input
                                        value={state.username}
                                        onChange={(e) => handleOnchangeInput(e, 'username')}
                                        type="text"
                                        placeholder="User name"
                                    />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>First Name</label>
                                    <input
                                        value={state.firstName}
                                        onChange={(e) => handleOnchangeInput(e, 'firstName')}
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Last Name</label>
                                    <input
                                        value={state.lastName}
                                        onChange={(e) => handleOnchangeInput(e, 'lastName')}
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Gender</label>
                                    <select name="gender" className="dark:text-gray-900" onChange={(e) => handleOnchangeInput(e, 'gender')} required>
                                        <option className="dark:text-gray-900" value=""> Select Gender </option>
                                        <option className="dark:text-gray-900" value={state.gender}> Male </option>
                                        <option className="dark:text-gray-900" value={state.gender}> Female </option>
                                    </select>
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Email</label>
                                    <input
                                        value={state.email}
                                        onChange={(e) => handleOnchangeInput(e, 'email')}
                                        type="email"
                                        placeholder="email@gmail.com"
                                    />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Phone</label>
                                    <input
                                        value={state.phonenumber}
                                        onChange={(e) => handleOnchangeInput(e, 'phonenumber')}
                                        type="text"
                                        placeholder="0123456789"
                                    />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Password</label>
                                    <input
                                        value={state.password}
                                        onChange={(e) => handleOnchangeInput(e, 'password')}
                                        type="password"
                                        placeholder="*********** "
                                    />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Address</label>
                                    <input
                                        value={state.address}
                                        onChange={(e) => handleOnchangeInput(e, 'address')}
                                        type="text"
                                        placeholder="Ho Chi Minh"
                                    />
                                </div>
                            </form>
                            <button type="button"  onClick={(e) => handleSaveUser(e)} className=" mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default New;
