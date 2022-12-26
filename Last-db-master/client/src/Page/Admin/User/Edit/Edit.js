import styles from './ModalUser.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import images from "~/Asset/Image";
import { useSelector } from 'react-redux';
import CommonUtils from '~/utils/CommonUtlis';
import { useDispatch } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '~/redux/authSlice';
import { refreshToken } from '~/services';
import {getDetailUser, handleEditUser} from '~/redux/apiReques';
import { toast } from 'react-toastify';
import config from "~/config";
import {AiFillFolderAdd} from "react-icons/ai";

const cx = classNames.bind(styles);



function EditUser() {
    const { id } = useParams();
    const userRedux = useSelector((state) => state.user.userInfo?.user);
    const user = useSelector((state) => state.auth.login?.currentUser);
    let [reviewAvatar, setReviewAvatar] = useState('');
    let [state, setState] = useState({
        image: '',
        username:'',
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        gender:'',
        role:'',
        phoneNumber: '',
        address: '',
    });

    useEffect(() => {
        if (userRedux) {
            setState({
                username: userRedux?.username,
                image: userRedux?.Image.photo,
                firstName: userRedux.firstName,
                lastName: userRedux.lastName,
                email: userRedux.email,
                password: userRedux.password,
                gender:userRedux.gender,
                role:userRedux.role,
                phoneNumber: userRedux.phoneNumber,
                address: userRedux.address,
            });
        }
    }, [ userRedux]);

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

    useEffect(() => {
        if (!user) {
            navigate(config.routes.login);
        }
        const fetch = async () => {
            await getDetailUser(id, user?.accessToken, dispatch, axiosJWT);
        };
        fetch().then(r => r);
    }, [axiosJWT, dispatch, id, navigate, user]);
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
    const handleSaveUser = async () => {
        let res = await handleEditUser(state, user?.accessToken, dispatch, axiosJWT);
        if (res.errCode === 0) {
            toast.success(res.errMessage);
        } else {
            toast.error(res.errMessage);
        }
    };

    const handleOnchangeInput = (e, id) => {
        e.preventDefault();
        let copyState = { ...state };
        copyState[id] = e.target.value;
        setState(copyState);
    };


    return (
        <>
            <div className={`dark:text-white dark:placeholder-white ${cx('new')}`}>
                <div className={cx('new-container')}>
                    <div className={`relative ${cx('top')}`}>
                        <h1 className="text-blue-900">Edit user</h1>
                        <button type="button"  onClick={(e) => handleSaveUser(e)} className="absolute right-6 top-2  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Send
                        </button>
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
                                        disabled
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
                                <div className={`flex gap-24 ${cx('form-input')}`}>
                                    <div className={` ${cx('form-input')}`}>
                                        <div>
                                            <label>Gender</label>
                                            <select name="gender" className="dark:text-gray-900" onChange={(e) => handleOnchangeInput(e, 'gender')} required>
                                                <option className="dark:text-gray-900" value=""> Select Gender </option>
                                                <option className="dark:text-gray-900" value="Male"> Male </option>
                                                <option className="dark:text-gray-900" value="Female"> Female </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={` ${cx('form-input')}`}>
                                        <div>
                                            <label>Role</label>
                                            <select name="role" className="dark:text-gray-900" onChange={(e) => handleOnchangeInput(e, 'role')} required>
                                                <option className="dark:text-gray-900" value=""> Select Role </option>
                                                <option className="dark:text-gray-900" value="Admin"> Admin </option>
                                                <option className="dark:text-gray-900" value="Employee"> Employ </option>
                                            </select>
                                        </div>
                                    </div>
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
                                        value={state.phoneNumber}
                                        onChange={(e) => handleOnchangeInput(e, 'phoneNumber')}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditUser;
