const routes = {
    //admin
    dashboard: '/admin',
    login: '/login',
    new: 'new',
    employee: '/admin/employee',
    single: 'details/:id',
    manage_doctor: '/admin/manage-doctor',
    manage_schedule: '/admin/manage_schedule',

    verify_email: '/admin/verify-booking',

    doctor_schedule: '/admin/doctor-schedule/:id',
    doctor_history: '/admin/doctor-history/:id',

    //doctor

    //brands
    brands: '/admin/brands',

    //category
    category: '/admin/category',

    //product
    product: '/admin/product',
    editProduct: 'edit-product/:productId',
    create_product: 'create-product',

    //order
    order: '/admin/order',
    order_detail: 'order-detail/:id',

    //customer
    home: '/',
    register:'/register',
    product_detail: '/product-detail/:id',
    list_doctor: '/list-doctor',
    detail_doctor: '/detail-doctor/:id',

    check_out: '/check-out',
    filter_category: '/category/:id',

    order_history: '/order-history',
};
export default routes;
