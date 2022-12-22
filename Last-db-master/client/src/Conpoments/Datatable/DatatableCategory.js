import styles from './Datatable.module.scss';
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getAllParentCategory } from '~/services';
import { deleteCategory, getAllCategoryAdmin } from '~/redux/apiReques';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosMiddle } from '~/services/axiosJWT';
import ModalCategory from '../Modal/ModalCategory';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function DatatableCategory() {
    let allCategory = useSelector((state) => state.categories.allCategory.categories?.data.data);
    const user = useSelector((state) => state.auth.login?.currentUser);

    let [rows, setRows] = useState([]);
    let [isOpen, setIsOpen] = useState(false);

    let [category, setCategory] = useState(0);
    let [listParent, setListParent] = useState();
    const data = useMovieData();
    useEffect(() => {
        if (allCategory) {
            let allUser = allCategory.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    summary: item.summary,
                    is_parent: item.is_parent,
                    parent_id: item.parent_id,
                    photo: item.Image.photo,
                    status: item.status,
                };
            });

            setRows(allUser);
        }
        async function fetchApi() {
            let res = await getAllParentCategory(user?.accessToken);
            setListParent(res.data);
        }
        fetchApi();
    }, [allCategory]);

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
        {
            field: 'summary',
            headerName: 'Summary',
            width: 250,
        },
        {
            field: 'is_parent',
            headerName: 'Parent',
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('status')}>
                            {params.row.is_parent === '1' ? (
                                <div className={cx('active')}>Parent</div>
                            ) : (
                                <div className={cx('disable')}>No</div>
                                // {params.row.parent_id === params.row.id}
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            field: 'parent_id',
            headerName: 'Parent Info',
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        <div className={cx('status')}>
                            {params.row.parent_id ? (
                                <div>
                                    {listParent?.map((item) => {
                                        if (item.id === params.row.parent_id) {
                                            let text = item.title;
                                            return text;
                                        }
                                    })}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 170,
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
                            <div className={cx('view-button')} onClick={() => handleSubmit(params.row)}>
                                Edit
                            </div>
                            <div className={cx('delete-button')} onClick={() => handleDelete(params.row.id)}>
                                Delete
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];

    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        setCategory(data);
        setIsOpen(true);
    };

    const handleDelete = async (id) => {
        let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
        let res = await deleteCategory(dispatch, axiosJWT, id, user?.accessToken);

        if (res.errCode === 0) {
            toast.success(res.errMessage);
            await getAllCategoryAdmin(user?.accessToken, dispatch, axiosJWT);
        } else {
            toast.error(res.errMessage);
        }
    };

    const OpenModal = () => {
        setCategory(null);
        setIsOpen(true);
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={cx('datatable')}>
                <div className={cx('datatable-title')}>
                    List Category
                    <div className={cx('link')} onClick={() => OpenModal()}>
                        Add New Category
                    </div>
                </div>
                <DataGrid
                    className={cx('customTable')}
                    {...data}
                    rows={rows}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                />
                <ModalCategory data={category} isOpen={isOpen} FuncToggleModal={() => toggleModal()} />
            </div>
        </>
    );
}

export default DatatableCategory;
