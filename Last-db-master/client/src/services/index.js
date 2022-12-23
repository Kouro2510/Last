import * as request from '~/utils/request';

export const search = async (q, type = 'less') => {
    try {
        const res = await request.get(`users/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const searchUser = async (q, type = 'less') => {
    try {
        const res = await request.get(`users/search`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (username, password) => {
    try {
        return await request.post('/api/login', {username, password}, {withCredentials: true});
    } catch (error) {
        console.log(error);
    }
};

export const loginCustomer = async (email, password) => {
    try {
        return await request.post('/api/loginCustomer', {email, password});
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsers = async (accessToken) => {
    try {
        return await request.get(`/api/getallemployee`, {headers: {token: `Bearer ${accessToken}`}});
    } catch (error) {
        console.log(error);
    }
};

export const getUserInfo = async (id) => {
    try {
        const res = await request.get(`/api/getUserInfoById?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const refreshToken = async () => {
    try {
        return await request.post('/api/refreshToken', {
            "withCredentials": true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllBrandFilter = async () => {
    try {
        return await request.get('/api/getAllBrands');
    } catch (error) {
        console.log(error);
    }
};

export const getAllParentCategory = async (accessToken) => {
    try {
        const res = await request.get('/api/getAllParentCategory', { headers: { token: `Bearer ${accessToken}` } });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getProductInfo = async (id) => {
    try {
        const res = await request.get(`/api/getProductInfoById?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getTurnover = async (date) => {
    try {
        return await request.get(`/api/getTurnover?date=${date}`);
    } catch (error) {
        console.log(error);
    }
};

export const getTurnoverWeek = async () => {
    try {
        return await request.get(`/api/getTurnoverWeek`);
    } catch (error) {
        console.log(error);
    }
};

export const getProductFilter = async (data) => {
    try {
        if (data.id && !data.brand_id) {
            if (data.priceB) {
                const res = await request.get(
                    `/api/getProductByCategory?action=${data.action}&id=${data.id}&priceA=${data.priceA}&priceB=${data.priceB}`,
                );
                return res;
            } else {
                const res = await request.get(`/api/getProductByCategory?action=${data.action}&id=${data.id}`);
                return res;
            }
        }
        if (data.id === null && data.brand_id) {
            if (data.priceB) {
                console.log('check has');
                const res = await request.get(
                    `/api/getProductByCategory?action=${data.action}&brand_id=${data.brand_id}&priceA=${data.priceA}&priceB=${data.priceB}`,
                );
                return res;
            } else {
                const res = await request.get(
                    `/api/getProductByCategory?action=${data.action}&brand_id=${data.brand_id}`,
                );
                return res;
            }
        }
        if (data.id && data.brand_id) {
            if (data.priceB) {
                const res = await request.get(
                    `/api/getProductByCategory?action=${data.action}&id=${data.id}&brand_id=${data.brand_id}&priceA=${data.priceA}&priceB=${data.priceB}`,
                );
                return res;
            } else {
                const res = await request.get(
                    `/api/getProductByCategory?action=${data.action}&id=${data.id}&brand_id=${data.brand_id}`,
                );
                return res;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const searchCoupon = async (code) => {
    try {
        const res = await request.get(`/api/search-coupon?q=${code}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const createOrder = async (data) => {
    try {
        const res = await request.post('/api/create-order', data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getOrderInfo = async (id) => {
    try {
        const res = await request.get(`/api/getDetailOrder?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const handleEditStatusOrder = async (data) => {
    try {
        const res = await request.PUT(`/api/handleEditStatus`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailInfoDoctor = (id) => {
    return request.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
export const getScheduleDoctorByDate = (doctorId, date) => {
    return request.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
export const postPatientBookAppointment = (data) => {
    return request.post('/api/patient-book-appointment', data);
};
export const getAllCodeService = (inputData) => {
    return request.get(`/api/allcodes?type=${inputData}`);
};
export const getProfileDoctorById = (id) => {
    return request.get(`/api/get-profile-doctor-by-id?doctorId=${id}`);
};
export const getExtraInfoDoctorById = (id) => {
    return request.get(`/api/get-extra-info-doctor-by-id?doctorId=${id}`);
};
export const getTopDoctorsService = (limit) => {
    return request.get(`/api/top-doctor-home?limit=${limit}`);
};
export const getAllDoctors = () => {
    return request.get(`/api/get-all-doctors`);
};
export const getAllSpecialty = () => {
    return request.get(`/api/get-specialty`);
};
export const getAllClinic = () => {
    return request.get(`/api/get-clinic`);
};
export const saveDetailDoctorService = (data) => {
    return request.post('/api/save-info-doctors', data);
};
export const saveBulkScheduleDoctor = (data) => {
    return request.post('/api/bulk-create-schedule', data);
};
export const postVerifyBookAppointment = (data) => {
    return request.post('/api/verify-book-appointment', data);
};

export const getScheduleDoctorById = (id, date, action) => {
    return request.get(`/api/get-schedule-doctor-by-id?id=${id}&date=${date}&action=${action}`);
};
export const editBookAppointment = (data) => {
    return request.PUT(`/api/edit-book-appointment`, data);
};
export const getAllOrderOfUser = (id) => {
    return request.get(`/api/get-all-order-of-user?id=${id}`);
};
