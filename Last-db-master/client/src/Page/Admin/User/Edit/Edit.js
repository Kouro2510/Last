import styles from './Edit.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import images from "~/Asset/Image";
import { useSelector } from 'react-redux';
import CommonUtils from '~/utils/CommonUtlis';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '~/redux/authSlice';
import { refreshToken } from '~/services';
import { handleEditUser } from '~/redux/apiReques';
import { toast } from 'react-toastify';
import {AiFillFolderAdd} from "react-icons/ai";

const cx = classNames.bind(styles);


function ModalUser() {
  const userRedux = useSelector((state) => state.user.userInfo?.user);
  const user = useSelector((state) => state.auth.login?.currentUser);
  let [state, setState] = useState({
    id: '',
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

  const dispatch = useDispatch();
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
    if (userRedux) {
      setState({
        id: id,
        username:userRedux.username,
        firstName: userRedux.firstName,
        lastName: userRedux.lastName,
        address: userRedux.address,
        gender: userRedux.gender,
        email: userRedux.email,
        phonenumber: userRedux.phonenumber,
        avatar: userRedux?.image,
        positionId: userRedux.positionId,
        roleId: userRedux.roleId,
      });
    }
  }, [userRedux]);
  const handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let files = data[0];

    if (files) {
      let base64 = await CommonUtils.getBase64(files);
      setState({
        ...state,
        avatar: base64,
      });
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
        <div className={`dark:text-white dark:placeholder-white `}>
          <div className={`relative ${cx('top')}`}>
              <h1>Edit user</h1>
              <button type="button"  onClick={(e) => handleSaveUser(e)} className="absolute right-6 top-2  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Send
              </button>
            </div>
            <div className={cx('bottom')}>
              <div className={`${cx('left')} relative`}>
                <img src={state.avatar ? state.avatar : images.noImage} alt="" />
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
                    <label>First Name</label>
                    <input
                        value={state.firstName}
                        onChange={(e) => handleOnchangeInput(e, 'firstName')}
                        type="text"
                        placeholder="John"
                    />
                  </div>
                  <div className={cx('form-input')}>
                    <label>Last Name</label>
                    <input
                        value={state.lastName}
                        onChange={(e) => handleOnchangeInput(e, 'lastName')}
                        type="text"
                        placeholder="Wick"
                    />
                  </div>
                  <div className={cx('form-input')}>
                    <label>Gender</label>
                    <input
                        value={state.gender}
                        onChange={(e) => handleOnchangeInput(e, 'gender')}
                        type="text"
                        placeholder="Male or female"
                    />
                  </div>
                  <div className={cx('form-input')}>
                    <label>Email</label>
                    <input
                        value={state.email}
                        onChange={(e) => handleOnchangeInput(e, 'email')}
                        type="email"
                        readOnly
                        placeholder="thanhhoa@gmail.com"
                    />
                  </div>
                  <div className={cx('form-input')}>
                    <label>Phone</label>
                    <input
                        value={state.phonenumber}
                        onChange={(e) => handleOnchangeInput(e, 'phonenumber')}
                        type="text"
                        placeholder="07954564152"
                    />
                  </div>
                  <div className={cx('form-input')}>
                    <label>Password</label>
                    <input
                        value="1213465466"
                        onChange={(e) => handleOnchangeInput(e, 'password')}
                        type="password"
                    />
                  </div>
                  <div className={cx('form-input')}>
                    <label>Address</label>
                    <input
                        value={state.address}
                        onChange={(e) => handleOnchangeInput(e, 'address')}
                        type="text"
                        placeholder="A16/5 ap 1"
                    />
                  </div>
                </form>
              </div>
            </div>
        </div>
      </>
  )
}

export default ModalUser;
