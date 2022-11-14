import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";

const Home = () =>
{
  const [getuserdata, setUserdata] = useState([]);

  const { udata, setUdata } = useContext(adddata);

  const { updata, setUPdata } = useContext(updatedata);

  const { dltdata, setDLTdata } = useContext(deldata);

  const getdata = async () =>
  {
    const res = await fetch("http://localhost:5050/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
    }
  };

  useEffect(() =>
  {
    getdata();
  }, []);

  const deletetrip = async (id) =>
  {
    const res2 = await fetch(`http://localhost:5050/deletetrip/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <>
      {/* {udata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            trip from <strong>{udata.departureCity}</strong> to
            <strong> {udata.arrivalCity}</strong> added succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            trip from <strong>{updata.departureCity}</strong> to
            <strong> {udata.arrivalCity}</strong> updated succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            trip from <strong>{dltdata.departureCity}</strong> to
            <strong>{udata.arrivalCity}</strong> deleted succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )} */}
      <section className="h-[100vh-70px] flex justify-center" id="bg-pic">
        <div className="text-white flex flex-col gap-5 pt-16 w-3/4 h-1/2 mt-16 relative rounded">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded"></div>
          <div className="z-10 flex flex-col gap-5">
            <h1 className="text-center font-bold text-4xl">Find your next Trip</h1>
            <p className="text-center font-semibold text-xl">Search deals on hotels, homes, and much more...</p>
            <form className="px-10 mt-5 h-20 flex gap-3">
              <div className="flex w-1/6 flex-col gap-3">
                <label>departure city</label>
                <input className="h-1/2 text-gray-900 rounded outline-none px-2 py-1"></input>
              </div>
              <div className="flex w-1/6 flex-col gap-3">
                <label>arrival city</label>
                <input className="h-1/2 text-gray-900 rounded outline-none px-2 py-1"></input>
              </div>
              <div className="flex w-1/6 flex-col gap-3">
                <label>departure time</label>
                <input type="datetime-local" className="h-1/2 text-gray-900 rounded outline-none px-2 py-1"></input>
              </div>
              <div className="flex w-1/6 flex-col gap-3">
                <label>arrival time</label>
                <input type="datetime-local" className="h-1/2 text-gray-900 rounded outline-none px-2 py-1"></input>
              </div>
              <button className="h-1/2 text-gray-100 bg-blue-400 rounded outline-none px-4 py-2 mt-auto mb-1 w-full">Search</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
