import styles from './ModalBrands.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {
    createNewCategory,
    editCategory,
    getAllCategoryAdmin,
    getListParentCategory,
} from '~/redux/apiReques';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { axiosMiddle } from '~/services/axiosJWT';
import images from "~/Asset/Image";
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import CommonUtils from '~/utils/CommonUtlis';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        height: '450px',
        width: '900px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function ModalCategory({ isOpen, FuncToggleModal, data }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listParentRedux = useSelector((state) => state.auth.login?.currentUser);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    let [category, setCategory] = useState('');
    let [valueParent, setValueParent] = useState();
    let [listParent, setListParent] = useState();
    let [reviewImage, setReviewImage] = useState();
    let [image, setImage] = useState();
    useEffect(() => {
        setCategory(data);
        let defaultValues = {};
        defaultValues.title = data?.title ? data?.title : '';
        defaultValues.summary = data?.summary ? data?.summary : '';
        defaultValues.parentId = data?.parentId ? data?.parentId : '';
        defaultValues.isParent = data?.isParent ? data?.isParent : '1';
        defaultValues.status = data?.status ? data?.status : '1';
        setImage(data?.photo ? data.photo : images.noImage);

        reset({ ...defaultValues });
    }, [data]);

    useEffect(() => {
        async function fetchApi() {
            let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);

            let res = await getListParentCategory(dispatch);
            setListParent(res.data);
        }
        fetchApi();
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let subtitle;

    const afterOpenModal = () => {
        subtitle.style.color = '#f00';
    };

    const onSubmit = async (category) => {
        let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
        console.log(image);
        if (data) {
            let obj = {
                id: data.id,
                title: category.title,
                status: category.status,
                isParent: category.isParent,
                parentId: category.parentId,
                summary: category.summary,
                image: image,
            };
            if (category.isParent === '1') {
                obj.parentId = null;
            }
            let res = await editCategory(dispatch, axiosJWT, obj, user?.accessToken);
            if (res.errCode === 0) {
                toast.success(res.errMessage);
                await getAllCategoryAdmin(user?.accessToken, dispatch, axiosJWT, navigate);
                FuncToggleModal();
            } else {
                toast.error(res.errMessage);
            }
        } else {
            let obj = {
                title: category.title,
                status: category.status,
                isParent: category.isParent,
                parentId: category.parentId,
                summary: category.summary,
                image: image,
            };
            let res = await createNewCategory(obj, user?.accessToken, dispatch, axiosJWT);
            if (res.errCode === 0) {
                toast.success(res.errMessage);
                await getAllCategoryAdmin(user?.accessToken, dispatch, axiosJWT, navigate);
                FuncToggleModal();
            } else {
                toast.error(res.errMessage);
            }
        }
    };
    const handleOnchangeImg = async (e) => {
        let data = e.target.files;
        let files = data[0];

        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            setImage(base64);
        }
    };
    return (
        <>
            <div>
                <Modal
                    isOpen={isOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={FuncToggleModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className={cx('header')}>
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>CATEGORY</h2>
                        <button className={cx('close')} onClick={FuncToggleModal}>
                            close
                        </button>
                    </div>
                    <div className={cx('top')}>
                        <>{category ? <h1>Edit New Category</h1> : <h1>Add New Category</h1>}</>
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('left')}>
                            <img src={image ? image : images.noImage} alt="" />
                        </div>
                        <div className={cx('right')}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={cx('form-input')}>
                                    <label htmlFor="file">
                                        Image: <DriveFolderUploadOutlined className={cx('icon')} />
                                    </label>
                                    <input
                                        onChange={(e) => handleOnchangeImg(e)}
                                        type="file"
                                        id="file"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Title</label>

                                    <input placeholder="Headway" {...register('title', { required: true })} />

                                    {errors.exampleRequired && <p>This field is required</p>}
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Summary</label>

                                    <input placeholder="Headway" {...register('summary')} />
                                </div>
                                <div className={cx('form-input')}>
                                    <label>Parent</label>
                                    <select
                                        {...register('isParent', {
                                            onChange: (e) => {
                                                setValueParent(e.target.value);
                                            },
                                        })}
                                    >
                                        <option value="1">Is parent</option>
                                        <option value="0">Children</option>
                                    </select>
                                </div>
                                {valueParent === '0' ? (
                                    <div className={cx('form-input')}>
                                        <label>List Parent</label>
                                        <select {...register('parentId')}>
                                            {listParent?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {item.title}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className={cx('form-input')}>
                                    <label>Status</label>
                                    <select {...register('status')}>
                                        <option value="1">Active</option>
                                        <option value="0">Disable</option>
                                    </select>
                                </div>
                                <input className={cx('btnSave')} type="submit" />
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default ModalCategory;
