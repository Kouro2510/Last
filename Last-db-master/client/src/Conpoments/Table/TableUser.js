import styles from './Table.scss';
import classNames from 'classnames/bind';
import {
    DataGrid,

} from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/Asset/Image';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import { deleteUserById } from '~/redux/apiReques';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosMiddle } from '~/services/axiosJWT';

const cx = classNames.bind(styles);
function DatatableUser() {
    let allUsers = useSelector((state) => state.user.users.allUsers?.data);
    const user = useSelector((state) => state.auth.login?.currentUser);

    let [rows, setRows] = useState([]);
    let [checkBoxSelection, setCheckBoxSelection] = useState(false);

    const [idUser, setIdUser] = useState();
    const data = useMovieData();

    const handleRowClick = (params) => {
        setIdUser(idUser ? null : params.row.id);
        setCheckBoxSelection(!checkBoxSelection);
    };
    useEffect(() => {
        if (allUsers) {
            let allUser = allUsers.map((item) => {
                return {
                    id: item.id,
                    username:item.username,
                    fristname:item.lastName,
                    lastname:item.lastname,
                    email: item.email,
                    image: item.Image.photo,
                    gender: item.gender,
                    address: item.address,
                    role: item.role,
                    phoneNumber: item.phonenumber,
                };
            });

            setRows(allUser);
        }
    }, [allUsers]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'user',
            headerName: 'User',
            width: 230,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cellWithImg')}>
                            <img
                                className={cx('cellImg')}
                                src={params.row.image ? params.row.image : images.noImage}
                                alt="avatar"
                            />
                            {params.row.username}
                        </div>
                    </>
                );
            },
        },
        {
            field: 'firstname',
            headerName: 'First Name',
            width: 200,
        },
        {
            field: 'lastname',
            headerName: 'Last Name',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 200,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 100,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 100,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cell-action')}>
                            <div className={cx('view-button')} onClick={() => handleSubmit(params.row.id)}>
                                View
                            </div>
                            <div className={cx('delete-button')} onClick={() => handleDeleteUser(params.row.id)}>
                                Delete
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (user) => {
        navigate(`details/${user}`);
    };

    const handleDeleteUser = async (id) => {
        let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
        let res = await deleteUserById(id, user?.accessToken, dispatch, axiosJWT);

        if (res.errCode === 0) {
            toast.success(res.errMessage);
        } else {
            toast.error(res.errMessage);
        }
    };

    return (
        <>
            <div className={cx('datatable')}>
                <div className={cx('datatable-title')}>
                    List User
                    {idUser ? (
                        <Link to={config.routes.new} className={cx('link')}>
                            Edit User
                        </Link>
                    ) : (
                        <Link to={config.routes.new} className={cx('link')}>
                            Add New User
                        </Link>
                    )}
                </div>
                <DataGrid
                    className={`${cx('customTable ')}  dark:text-white`}
                    onRowClick={handleRowClick}
                    {...data}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    checkboxSelection={checkBoxSelection}
                    rowsPerPageOptions={[9]}
                />
            </div>
        </>
    );
}

export default DatatableUser;