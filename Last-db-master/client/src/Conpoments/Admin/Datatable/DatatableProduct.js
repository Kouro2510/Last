import styles from './Datatable.module.scss';
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import images from "~/Asset/Image";
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import jwt_decode from 'jwt-decode';
import { getAllProduct, handleDeleteProduct } from '~/redux/apiReques';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosMiddle } from '~/services/axiosJWT';
import { Buffer } from 'buffer';
const cx = classNames.bind(styles);
function DatatableProduct() {
    let allProduct = useSelector((state) => state.product.allProduct.data?.data.data);
    const user = useSelector((state) => state.auth.login?.currentUser);

    let [rows, setRows] = useState([]);
    let [checkBoxSelection, setCheckBoxSelection] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [idUser, setIdUser] = useState();
    const data = useMovieData();

    useEffect(() => {
            if (!user) {
                navigate(config.routes.login);
            }
            const fetch = async () => {
                let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

                await getAllProduct(user?.accessToken, dispatch, axiosJWT, navigate);
            };
            fetch();
        },
        [dispatch, navigate, user]);

    useEffect(() => {
        if (allProduct) {
            let allBrand = allProduct.map((item) => {
                let image = '';
                if (item.Images) {
                    image = new Buffer(item.Images[0]?.photo, 'base64').toString('binary');
                }
                return {
                    id: item.id,
                    title: item.title,
                    photo: image,
                    condition: item.condition,
                    price: item.price,
                    status: item.status,
                    stock: item.stock,
                    sold: item.sold,
                    discount: item.discount,
                };
            });

            setRows(allBrand);
        }
    }, [allProduct]);

    const handleRowClick = (params) => {
        setIdUser(idUser ? null : params.row.id);
        setCheckBoxSelection(!checkBoxSelection);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'title',
            headerName: 'Title',
            width: 350,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cellWithImg')}>
                            <img
                                className={cx('cellImg')}
                                src={params.row.photo ? params.row.photo : images.noImage}
                                alt="avatar"
                            />
                            {params.row.title}
                        </div>
                    </>
                );
            },
        },
        { field: 'condition', headerName: 'Condition', width: 100 },
        { field: 'discount', headerName: 'Discount', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'stock', headerName: 'Stock', width: 100 },
        { field: 'sold', headerName: 'Sold', width: 100 },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
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
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('cell-action')}>
                            <div className={cx('view-button')} onClick={() => handleSubmit(params.row.id)}>
                                Edit
                            </div>
                            <div className={cx('delete-button')} onClick={() => deleteProduct(params.row.id)}>
                                Delete
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];
    const handleSubmit = (id) => {
        navigate(`edit-product/${id}`);
    };

    const deleteProduct = async (id) => {
        let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

        let res = await handleDeleteProduct(axiosJWT, id, user?.accessToken, dispatch);
        console.log(res);
        if (res.errCode === 0) {
            toast.success(res.errMessage);
            await getAllProduct(user?.accessToken, dispatch, axiosJWT, navigate);
        }
    };
    

    return (
        <>
            <div className={cx('datatable')}>
                <div className={cx('datatable-title')}>
                    List Products
                    <Link to={config.routes.create_product} className={cx('link')}>
                        Add New Product
                    </Link>
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
            </div>
        </>
    );
}

export default DatatableProduct;
