import axios from "axios";
import { LogOut, X } from "lucide-react";
import logo from "../../public/user.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const [authUser, setAuthUser] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthUser(null);
      navigate("/login");
      alert(data.message);
    } catch (error) {
      alert(error?.response?.data?.errors || "Logout Failed");
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#232327">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-200">deepseek</div>
        <button>
          <X className="w-6 h-6 text-gray-400 md:hidden" />
        </button>
      </div>

      {/* History */}
      <div className=" flex-1 overflow-y-auto px-4 py-3 space-y-2">
        <button className=" w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4">
          + New Chat
        </button>
        <div className=" text-gray-500 text-sm mt-20 text-center">
          No chat history yet..
        </div>
      </div>

      {/* footer */}
      <div className="p-1 border-t border-gray-600">
        <div className="flex  items-center gap-2 cursor-pointer my-3">
          <img src={logo} alt="" className="rounded-full w-8 h-8" />
          <span className="text-gray-300 font-bold">
            {user ? user.lastName : "My Profile"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
