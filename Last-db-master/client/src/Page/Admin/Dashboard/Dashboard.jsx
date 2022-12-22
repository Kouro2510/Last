import Sidebar from "~/Conpoments/SideBar/Sidebar";
import Navbar from "~/Conpoments/Navbar/Navbar";


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