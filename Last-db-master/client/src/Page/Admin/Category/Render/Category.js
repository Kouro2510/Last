import { useEffect } from 'react';
import { getAllCategoryAdmin } from '~/redux/apiReques';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import { axiosMiddle } from '~/services/axiosJWT';
import DatatableCategory from "~/Conpoments/Admin/Datatable/DatatableCategory";

function Category() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(config.routes.login);
        }
        const fetch = async () => {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

            await getAllCategoryAdmin(user?.accessToken, dispatch, axiosJWT, navigate);
        };
        fetch();
    }, [user]);
    return (
        <>
            <DatatableCategory />
        </>
    );
}

export default Category;
