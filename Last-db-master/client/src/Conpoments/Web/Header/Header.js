import {Facebook, Favorite, Instagram, Person, Twitter} from "@mui/icons-material";
import images from "~/Asset/Image";
import "./Header.scss"
const Header = () => {
    return (
        <>
            <div className="flex justify-end gap-3 pr-8 bg-black text-white pt-2 pb-4  ">
                <a href="https://www.facebook.com/"><Facebook/></a>
                <a href="https://www.instagram.com/"><Instagram/></a>
                <a href="https://twitter.com/"><Twitter/></a>
                <h4 className="flex"><Favorite className="pr-2"/>Danh sách yêu thích</h4>
                <h4 className="flex"><Person className="pr-2"/> Đăng nhập</h4>
            </div>
            <div className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
                <header className="lg:px-16 px-6 bg-white flex items-center lg:py-0 py-2">
                    <div className="flex justify-between items-center">
                        <img src={images.logo} width="20%"/>
                    </div>

                    <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
                        <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20"
                             height="20" viewBox="0 0 20 20"><title>menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </label>
                    <input className="hidden" type="checkbox" id="menu-toggle"/>

                    <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                        <nav>
                            <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                                <li><a
                                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                                    href="/Home">Home</a></li>
                                <li><a
                                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                                    href="/about">About</a></li>
                                <li><a
                                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                                    href="/Product">Documentation</a></li>
                                <li><a
                                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2"
                                    href="/Contact">Support</a></li>
                            </ul>
                        </nav>

                    </div>
                </header>
                <hr/>
            </div>
        </>
    )
}
export default Header