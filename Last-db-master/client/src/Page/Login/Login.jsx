import './login.scss'
import config from "~/config";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginUser} from "~/redux/apiReques";
const Login = () => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnchangeInput = (e, id) => {
    if (id === 'username') {
      setUsername(e.target.value);
    }
    if (id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await loginUser(username, password, dispatch, navigate);
    console.log('check res from login:>>>', res);

    if (res && res.errCode === 3) {
      await setMessage(res.errMessage);
    } else if (res && res.errCode === 1) {
      setMessage(res.errMessage);
    } else if (res && res.errCode === 0 && res.user.role === 'Employee') {
      navigate(config.routes.dashboard);
    } else if (res && res.errCode === 0 && res.user.role === 'Admin') {
      navigate(config.routes.dashboard);
    }else if(res && res.errCode === 0 && res.user.role === 'Customer'){
      navigate(config.routes.home);
    }
    if (!res) {
      setMessage('An error occurred, please try again later!!!');
    }
    console.log('check res from login:>>>', res);
  };

  return(
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3"
               style={{backgroundImage: "url(https://th.bing.com/th/id/R.a95e2303d03c307a030fb9ee487b94b6?rik=37FneRZ6lqNmFQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-2TmctTaO-Gs%2fUoR0wwhbpGI%2fAAAAAAAAF08%2f9QN9bqFM21Y%2fs1600%2fCars%2bWallpapers%2b20141.jpg&ehk=7J13cTR3HY%2bs4eY3Bkl2Xvwu9N0rT8jwVX%2fafmi%2bLhU%3d&risl=&pid=ImgRaw&r=0)"}}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Login to website</h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
              </div>

              <div className="mt-8">
                <form>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="example@example.com"   value={username}
                           onChange={(e) => OnchangeInput(e, 'username')}
                           className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                      <a href="/forgot"
                         className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot
                        password?</a>
                    </div>

                    <input type="password" name="password" id="password" placeholder="Your Password" value={password}
                           onChange={(e) => OnchangeInput(e, 'password')}
                           className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                  </div>
                  {message ? (
                      <>
                        <div className="text-14 message">{message}</div>
                      </>
                  ) : (
                      ''
                  )}
                  <div className="mt-6">
                    <button  onClick={(e) => handleSubmit(e)}
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>

                </form>

                <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href={config.routes.register}
                                                                                                         className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign
                  up</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default Login;