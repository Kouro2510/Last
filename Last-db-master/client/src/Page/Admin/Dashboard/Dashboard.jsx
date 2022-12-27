import Sidebar from "~/Conpoments/Admin/SideBar/Sidebar";
import Navbar from "~/Conpoments/Admin/Navbar/Navbar";


const LayoutDashBoard = ({children}) => {
  return (
      <section className={`flex dark:bg-gray-900 `}>
        <Sidebar/>
          <div style={{width: "-webkit-fill-available"}}>
              <Navbar/>

            {children}
        </div>
      </section>
  )
}
export default LayoutDashBoard;