import styles from './Single.module.scss';
import classNames from 'classnames/bind';
import images from "~/Asset/Image";
import { useEffect, useState } from 'react';
import {getDetailUser } from '~/redux/apiReques';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { refreshToken } from '~/services';
import { loginSuccess } from '~/redux/authSlice';
import ModalUser from "~/Conpoments/Admin/Modal/ModalUser";
const cx = classNames.bind(styles);
function Single() {
    const { id } = useParams();
    const userRedux = useSelector((state) => state.user.userInfo?.user);
    const user = useSelector((state) => state.auth.login?.currentUser);
    let [isOpen, setIsOpen] = useState(false);

    let [detailUser, setDetailUser] = useState({
        image: '',
        firstName: '',
        lastName: '',
        email: '',
        phonenumber: '',
        address: '',
    });

    useEffect(() => {
        if (userRedux) {
            setDetailUser({
                image: userRedux?.Image.photo,
                firstName: userRedux.firstName,
                lastName: userRedux.lastName,
                email: userRedux.email,
                phoneNumber: userRedux.phoneNumber,
                address: userRedux.address,
            });
        }
    }, [isOpen, userRedux]);

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
        fetch();
    }, [isOpen, user]);

    const OpenModal = () => {
        setIsOpen(true);
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className={`${cx('top')} dark:text-white`}>
                <div className={cx('left')}>
                    <div className={cx('edit-button')} onClick={() => OpenModal()}>
                        Edit
                    </div>
                    <h1 className={cx('title')}>Information</h1>
                    <div className={cx('item')}>
                        <img
                            src={detailUser?.image ? detailUser?.image : images.noImage}
                            alt=""
                            className={cx('item-img')}
                        />
                        <div className={cx('details')}>
                            <h1 className={cx('item-title')}>{`${detailUser?.firstName} ${detailUser?.lastName}`}</h1>
                            <div className={cx('details-item')}>
                                <span className={cx('item-key')}>Email:</span>
                                <span className={cx('item-value')}>{detailUser?.email}</span>
                            </div>
                            <div className={cx('details-item')}>
                                <span className={cx('item-key')}>Phone:</span>
                                <span className={cx('item-value')}>{detailUser?.phoneNumber}</span>
                            </div>
                            <div className={cx('details-item')}>
                                <span className={cx('item-key')}>Address:</span>
                                <span className={cx('item-value')}>{detailUser?.address}</span>
                            </div>
                            <div className={cx('details-item')}>
                                <span className={cx('item-key')}>City:</span>
                                <span className={cx('item-value')}>Ho Chi Minh</span>
                            </div>
                        </div>
                    </div>
                    <ModalUser isOpen={isOpen} FuncToggleModal={() => toggleModal()} />
                </div>
                <div className={cx('right')}></div>
            </div>
            <div className={cx('bottom')}></div>
        </>
    );
}

export default Single;
