import { useEffect } from 'react';
import {getAllCustomer} from '~/redux/apiReques';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import { axiosMiddle } from '~/services/axiosJWT';
import DatatableCustomer from "~/Conpoments/Admin/Datatable/DatatableCustomer";

function Customer() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(config.routes.login);
        }
        const fetch = async () => {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

            await getAllCustomer(user?.accessToken, dispatch, axiosJWT, navigate);
        };
        fetch();
    }, [dispatch, navigate, user]);
    return (
        <>
            <DatatableCustomer />
        </>
    );
}

export default Customer;
