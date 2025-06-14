import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 fixed w-full bg-[#EDFFD3] z-50">
      <div className="flex items-center space-x-2 pl-10">
        <div className="bg-[#315200] text-white px-3 py-1 rounded text-lg font-bold">V</div>
        <span className="text-xl font-semibold text-[#86B049]">Vetayo!</span>
      </div>
      <ul className="flex space-x-8 text-gray-800 font-medium">
        <li>
            <Link to="/" className="hover:underline hover:text-[#476930] cursor-pointer">
            Home
          </Link>
        </li>
        <li className="hover:underline hover:text-[#476930] cursor-pointer">
            <Link to="/search-item">
            Search Items
            </Link> 
            </li>
        <li className="hover:underline hover:text-[#476930] cursor-pointer">Found report</li>
        <li className="hover:underline hover:text-[#476930] cursor-pointer">
            
            <Link to="/#about" className="hover:underline hover:text-[#476930] cursor-pointer">
            About us
            </Link>
            </li>
        <li className="hover:underline hover:text-[#476930] cursor-pointer">Contact</li>
      </ul>
      <button className="bg-[#86B049] hover:bg-[#476930] text-white px-6 py-2 rounded-lg font-medium mr-10">
        Get started
      </button>
    </nav>
  );
}

export default NavBar;
