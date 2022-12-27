import Switcher from "~/hooks/Switcher";
import "./Navbar.scss"

const Navbar = () => {
    return (
        <div className={` mx-auto h-max `}>
            <div className="relative change shadow-md sm:rounded-lg flex justify-end py-2">
                <Switcher/>
            </div>
        </div>
    )
}
export default Navbar