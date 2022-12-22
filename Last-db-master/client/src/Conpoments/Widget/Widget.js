import styles from './Widget.module.scss';
import classNames from 'classnames/bind';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {AccountBalanceWalletOutlined, MonetizationOnOutlined, PersonOutlineOutlined, ShoppingCartOutlined,} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import config from '~/config';
import { useEffect } from 'react';
import { getAllOrderNewAdmin } from '~/redux/apiReques';
import { axiosMiddle } from '~/services/axiosJWT';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Widget({ type }) {
    const user = useSelector((state) => state.auth.login?.currentUser);

    let [allOrder, setAllOrder] = useState([]);

    let allUsers = useSelector((state) => state.user.users.allUsers?.data);
    let data;
    const dispatch = useDispatch();
    console.log('check allOrder', allOrder);

    useEffect(() => {
        const fetchApi = async () => {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

            const action = { action: 'new' };

            let res = await getAllOrderNewAdmin(dispatch, axiosJWT, action, user?.accessToken);
            if (res && res.data.length > 0) {
                setAllOrder(res.data);
            } else {
                setAllOrder([]);
            }
        };
        fetchApi().then(r => r);
    }, [dispatch, user]);

    const amount = 100;
    const diff = 20;

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                link: <Link to={config.routes.users}>Xem tất cả</Link>,
                icon: (
                    <PersonOutlineOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)' }}
                    />
                ),
            };
            break;
        case 'order':
            data = {
                title: 'ĐƠN HÀNG MỚI',
                isMoney: false,
                link: <Link to={config.routes.order}>Xem tất cả</Link>,
                icon: (
                    <ShoppingCartOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)', color: 'goldenrod' }}
                    />
                ),
            };
            break;
        case 'earning':
            data = {
                title: 'EARNINGS',
                isMoney: false,
                link: 'View net earning',
                icon: (
                    <MonetizationOnOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)', color: 'green' }}
                    />
                ),
            };
            break;
        case 'balance':
            data = {
                title: 'BALANCE',
                isMoney: false,
                link: 'See details',
                icon: (
                    <AccountBalanceWalletOutlined
                        className={cx('icon')}
                        style={{ backgroundColor: 'rgba(218, 165, 32 ,0.2)', color: 'purple' }}
                    />
                ),
            };
            break;
        default:
            break;
    }
    return (
        <>
            <div className={cx('widget')}>
                <div className={cx('left')}>
                    <span className={cx('title')}>{data.title}</span>
                    {type === 'user' && (
                        <span className={cx('counter')}>
                            {data.isMoney && '$'} {data.title === 'USERS' ? allUsers?.length : amount}
                        </span>
                    )}
                    {type === 'order' && (
                        <span className={cx('counter')}>
                            {data.isMoney && '$'} {data.title === 'ĐƠN HÀNG MỚI' ? allOrder?.length : amount}
                        </span>
                    )}
                    <span className={cx('link')}>{data.link}</span>
                </div>
                <div className={cx('right')}>
                    <div className={cx('percentage')}>
                        <KeyboardArrowUpIcon />
                        {diff} %
                    </div>
                    {data.icon}
                </div>
            </div>
        </>
    );
}

export default Widget;
