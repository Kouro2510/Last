import styles from './Datatable.module.scss';
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import images from "~/Asset/Image";
import jwt_decode from 'jwt-decode';
import { deleteBrand, getAllBrands } from '~/redux/apiReques';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalBrands from '../Modal/ModalBrands';
import { axiosMiddle } from '~/services/axiosJWT';

const cx = classNames.bind(styles);
function DatatableBrands() {
    let allBrands = useSelector((state) => state.brands.allBrand.brands?.data.data);
    const user = useSelector((state) => state.auth.login?.currentUser);

    let [rows, setRows] = useState([]);
    let [checkBoxSelection, setCheckBoxSelection] = useState(false);
    let [isOpen, setIsOpen] = useState(false);

    const [idUser, setIdUser] = useState();
    const data = useMovieData();

    const handleRowClick = (params) => {
        setIdUser(idUser ? null : params.row.id);
        setCheckBoxSelection(!checkBoxSelection);
    };
    useEffect(() => {
        if (allBrands) {
            let allBrand = allBrands.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    photo: item.Image?.photo,
                    status: item.status,
                };
            });

            setRows(allBrand);
        }
    }, [allBrands]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'title',
            headerName: 'Title',
            width: 230,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cellWithImg')}>
                            {params.row.title}
                        </div>
                    </>
                );
            },
        },
        {
            field: 'photo',
            headerName: 'Logo brands',
            width: 230,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cellWithImg')}>
                            <img
                                className={`ml-16 ${cx('cellImg')}`}
                                src={params.row.photo ? params.row.photo : images.noBrand}
                                alt="avatar"
                            />
                        </div>
                    </>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('status')}>
                            {params.row.status === true ? (
                                <div className={cx('active')}>Active</div>
                            ) : (
                                <div className={cx('disable')}>Disable</div>
                            )}
                        </div>
                    </>
                );
            },
        },

        {
            field: 'action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cell-action')}>
                            <button className={`inline-block px-6 py-2 text-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md   active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out   gap-12 ${cx('view-button')}`} onClick={() => handleSubmit(params.row)}>Edit</button>
                            <button className={`inline-block px-6 py-2 text-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md   active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out   gap-12 ${cx('delete-button')}`}  onClick={() => handleDeleteUser(params.row.id)}>Delete</button>
                        </div>
                    </>
                );
            },
        },
    ];

    const dispatch = useDispatch();
    let [idBrand, setIdBrand] = useState(0);
    const handleSubmit = (id) => {
        setIdBrand(id);
        setIsOpen(true);
    };

    const handleDeleteUser = async (id) => {
        let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

        let res = await deleteBrand(dispatch, axiosJWT, id, user?.accessToken);

        if (res.errCode === 0) {
            await getAllBrands(user?.accessToken, dispatch, axiosJWT);
            toast.success(res.errMessage);
        } else {
            toast.error(res.errMessage);
        }
    };

    const OpenModal = () => {
        setIdBrand(null);
        setIsOpen(true);
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={cx('datatable')}>
                <div className={cx('datatable-title')}>
                    List Brands
                    <div className={cx('link')} onClick={() => OpenModal()}>
                        Add New Brand
                    </div>
                </div>
                <DataGrid
                    className={cx('customTable')}
                    onRowClick={handleRowClick}
                    {...data}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                />
                <ModalBrands data={idBrand} isOpen={isOpen} FuncToggleModal={() => toggleModal()} />
            </div>
        </>
    );
}

export default DatatableBrands;
