import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Logout() {
  const navigate = useNavigate();
  const logoutfunc = async () => {
    const res = await fetch("http://localhost:5001/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // const data = await res.json();
    // console.log(res.status);
    if (res.status == 401) {
      alert("you have to signin before logout");
      navigate("/signin");
    } else {
      alert("logout successfull");
      navigate("/signin");
    }
  };

  useEffect(() => {
    logoutfunc();
  }, []);

  return <div>Logout</div>;
}

export default Logout;
