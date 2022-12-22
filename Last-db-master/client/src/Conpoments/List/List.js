import { useEffect } from 'react';
import { getAllUsersRedux } from '~/redux/apiReques';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import DatatableUser from "~/Conpoments/Datatable/DatatableUsers";
import { axiosMiddle } from '~/services/axiosJWT';

function List() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(config.routes.login);
        }
        const fetch = async () => {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

            await getAllUsersRedux(user?.accessToken, dispatch, axiosJWT, navigate);
        };
        fetch();
    }, [ user]);
    return (
        <>
            <DatatableUser />
        </>
    );
}

export default List;
