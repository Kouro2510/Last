import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Widget from "~/Conpoments/Widget/Widget";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { getAllUsersRedux} from "~/redux/apiReques";
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { axiosMiddle } from '~/services/axiosJWT';
import Featured from "~/Conpoments/Featured/Featured";
import Chart from "~/Conpoments/Chart/Chart";

const cx = classNames.bind(styles);

function Dashboard() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!user) {
        navigate(config.routes.login);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Cửa hàng bán xe uy tín số một VN`;

        async function fetchAllUser() {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
            await getAllUsersRedux(user?.accessToken, dispatch, axiosJWT, navigate);
        }
        fetchAllUser();
        if (!user) {
            navigate(config.routes.login);
        } else if (user.user.role !== 'Admin' && user.user.role !== 'Employee') {
        }
    }, [dispatch, navigate, user]);
    return (
        <>
            {user && user.user.role === 'Admin' && (
                <>
                    <div className={cx('widgets')}>
                        <Widget type="user" />
                        <Widget type="order" />
                        <Widget type="earning" />
                        <Widget type="balance" />
                    </div>
                    <div className={cx('charts')}>
                        <Featured />
                        <Chart />
                    </div>
                </>
            )}
            {user && user.user.role === 'Employee' && (
                <>
                    <div className="w-full flex relative items-center justify-center ">
                        <h1 className="font-medium absolute inset-x-0 shadow-xl bg-white w-3/4 md:w-2/5 mx-auto -mt-1 rounded-lg rounded-t-none">
                            {`Xin chào: `}
                            <span className="text-red-400">{`${user.user.lastName} ${user.user.firstName}`}</span>
                            {` ^^!! Hôm nay bạn có nhận được công việc mới`}
                        </h1>
                    </div>
                </>
            )}
        </>
    );
}

export default Dashboard;
