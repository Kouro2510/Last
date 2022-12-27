import { Routes, Route} from 'react-router-dom';
import config from "~/config";
import LayoutDashBoard from "~/Page/Admin/Dashboard/Dashboard";
import Login from "~/Page/Login/Login";
import Dashboard from "~/Page/Admin/home";
import Employee from "~/Page/Admin/User/Render/Employee";
import Single from "~/Conpoments/Admin/Single/Single";
import New from "~/Conpoments/Admin/New/New"
import {ToastContainer} from "react-toastify";
import Home from "~/Page/Web/Home";
import Brands from "~/Page/Admin/Brand/Render/Brand";
import Customer from "~/Page/Admin/Customer/Render/Customer";
import Product from "~/Page/Admin/Product/Product";
import NewProduct from "~/Conpoments/Admin/newProduct/NewProduct";
import Category from "~/Page/Admin/Category/Render/Category";


function App() {
    return (
       <div>
           <Routes>
               <Route path={config.routes.login} element={<Login/>}/>
               <Route index path={config.routes.dashboard} element={<LayoutDashBoard><Dashboard/></LayoutDashBoard>}/>
               <Route path={config.routes.employee}>
                   <Route index element={<LayoutDashBoard><Employee /></LayoutDashBoard>}/>
                   <Route path={config.routes.single} element={<LayoutDashBoard><Single /></LayoutDashBoard>}/>
                   <Route
                       path={config.routes.new}
                       element={<LayoutDashBoard><New title="Add New User" /></LayoutDashBoard>}
                   />
               </Route>
               <Route path={config.routes.customer}>
                   <Route index element={<LayoutDashBoard><Customer/></LayoutDashBoard>}/>
                   <Route path={config.routes.single} element={<LayoutDashBoard><Single /></LayoutDashBoard>}/>
                   <Route
                       path={config.routes.new}
                       element={<LayoutDashBoard><New title="Add New Customer" /></LayoutDashBoard>}
                   />
               </Route>
               <Route path={config.routes.brands}>
                   <Route
                       index
                       element={
                           <LayoutDashBoard>
                               <Brands />
                           </LayoutDashBoard>
                       }
                   />
               </Route>
               <Route path={config.routes.product}>
                   <Route
                       index
                       element={
                           <LayoutDashBoard>
                               <Product />
                           </LayoutDashBoard>
                       }
                   />
                   <Route
                       path={config.routes.create_product}
                       element={
                           <LayoutDashBoard>
                               <NewProduct />
                           </LayoutDashBoard>
                       }
                   />
                   <Route
                       path={config.routes.editProduct}
                       element={
                           <LayoutDashBoard>
                               <NewProduct />
                           </LayoutDashBoard>
                       }
                   />
               </Route>
               <Route path={config.routes.category}>
                   <Route
                       index
                       element={
                           <LayoutDashBoard>
                               <Category />
                           </LayoutDashBoard>
                       }
                   />
               </Route>
               <Route path={config.routes.home} element={<Home/>}/>
           </Routes>
           <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
           />
       </div>
    );
}

export default App;