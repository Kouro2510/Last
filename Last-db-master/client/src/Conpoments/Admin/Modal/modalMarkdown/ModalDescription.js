import styles from '../ModalBrands.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { CKEditor } from 'ckeditor4-react';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        animation:'animate__backInDown 10s'
    },
};

function ModalDescription({ desc, isOpen, FuncToggleModal, handleGetDateFromChildren }) {
    // const user = useSelector((state) => state.auth.login?.currentUser);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    let [html, setHtml] = useState();

    useEffect(() => {
        if (desc) {
            setHtml(desc);
        }
    }, [desc]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    let subtitle;

    const afterOpenModal = () => {
        subtitle.style.color = '#f00';
    };

    // const onSubmit = async (category) => {
    //     let axiosJWT = await axiosMiddle(jwt_decode, user?.accessToken, user, dispatch);
    // };
    const handleOnchange = (e) => {
        setHtml(e.editor.getData());
    };

    let id = 'a';

    const submit = (e) => {
        e.preventDefault();
        handleGetDateFromChildren(html, 'desc');
        FuncToggleModal();
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
                    <div className={cx('bottom')}>
                        <div className={cx('right')}>
                            <form>
                                <CKEditor
                                    initData={html}
                                    style={{
                                        'margin-top': '0',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    onChange={(e) => handleOnchange(e)}
                                />
                                <div>{html}</div>
                                <input onClick={(e) => submit(e)} className={cx('btnSave')} type="submit" />
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default ModalDescription;
