import styles from './Datatable.module.scss';
import classNames from 'classnames/bind';
import {
    DataGrid,
} from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import images from "~/Asset/Image";
import {Link, useNavigate} from 'react-router-dom';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import { deleteUserById } from '~/redux/apiReques';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosMiddle } from '~/services/axiosJWT';
import ModalUser from "~/Conpoments/Modal/ModalUser";

const cx = classNames.bind(styles);
function DatatableUser() {
    let allUsers = useSelector((state) => state.user.users.allUsers?.data);
    const user = useSelector((state) => state.auth.login?.currentUser);
    let [isOpen, setIsOpen] = useState(false);
    let [rows, setRows] = useState([]);
    let [checkBoxSelection, setCheckBoxSelection] = useState(false);

    const [idUser, setIdUser] = useState();
    const data = useMovieData();
    const handleEdit=(params)=>{
        setIdUser(idUser ? null : params.row.id);
        navigate(config.routes.edit);
    }
    const handleRowClick = (params) => {
        setIdUser(idUser ? null : params.row.id);
        setCheckBoxSelection(!checkBoxSelection);
    };
    useEffect(() => {
        if (allUsers) {
            let allUser = allUsers.map((item) => {
                return {
                    id: item.id,
                    username: item.username,
                    firstname: item.firstName,
                    lastname:item.lastName,
                    email: item.email,
                    image: item.Image?.photo,
                    gender: item.gender,
                    address: item.address,
                    role: item.role,
                    phoneNumber: item.phoneNumber,
                };
            });

            setRows(allUser);
        }
    }, [allUsers]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'username', headerName: 'Username', width: 230 },
        {
            field: 'firstname',
            headerName: 'First Name',
            width: 150,
        },
        {
            field: 'lastname',
            headerName: 'Last Name',
            width: 190,
        },
        {
            headerName: 'Avatar',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <div className={` ${cx('cellWithImg')}`}>
                            <img
                                className={`ml-4 ${cx('cellImg')}`}
                                src={params.row.image ? params.row.image : images.noImage}
                                alt="avatar"
                            />
                        </div>
                    </>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 170,
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
                        <button className={`inline-block px-6 py-2 text-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md   active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out   gap-12 ${cx('view-button')}`}  onClick={() => OpenModal(params.row.id)}>Edit</button>
                        <button className={`inline-block px-6 py-2 text-red-600  font-medium text-xs leading-tight uppercase rounded shadow-md   active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${cx('delete-button')}`} onClick={() => handleDeleteUser(params.row.id)}>Delete</button>
                    </>
                );
            },
        },
        {
            field: 'Details',
            headerName: 'Details',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <button className={`inline-block px-6 py-2 text-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md   active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out   gap-12 ${cx('view-button')}`} onClick={() => handleSubmit(params.row.id)}>View</button>
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
    const OpenModal = (user) => {
        navigate(`edit/${user}`);
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className={cx('datatable')}>
                <div className={cx('datatable-title')}>
                   <h3 className="text-black ">List Employee</h3>
                    {idUser ? (
                        <Link to={config.routes.edit}  onClick={() => handleEdit(setIdUser)} className={` ${cx('link')}`}>
                            Edit User
                        </Link>
                    ) : (
                        <Link to={config.routes.new} className={cx('link')}>
                            Add New User
                        </Link>
                    )}
                </div>
                <DataGrid
                    className={`dark:text-white dark:border-b-blue-50  ${cx('customTable')}`}
                    onRowClick={handleRowClick}
                    {...data}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    checkboxSelection={checkBoxSelection}
                    rowsPerPageOptions={[9]}
                />
            </div>
            <ModalUser isOpen={isOpen} FuncToggleModal={() => toggleModal()} />
        </>
    );
}

export default DatatableUser;
