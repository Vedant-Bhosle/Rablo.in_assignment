import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="pt-3 pb-3 pl-7 bg-black">
      <ul class="flex">
        <li class="mr-6">
          <Link class="text-white hover:text-blue-200" to="/addproduct">
            AddProduct
          </Link>
        </li>
        <li class="mr-6">
          <Link class="text-white hover:text-blue-200" to="/signup">
            Signup
          </Link>
        </li>
        <li class="mr-6">
          <Link class="text-white hover:text-blue-200" to="signin">
            Signin
          </Link>
        </li>
        <li class="mr-6">
          <Link class="text-white hover:text-blue-200" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
