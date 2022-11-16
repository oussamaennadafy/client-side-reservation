import React, { useState, useEffect, useContext } from "react";


const Home = () =>
{
  const date = new Date();
  const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const [data, setData] = useState([]);
  const [formdata, setformdata] = useState(
    {
      departureCity: "",
      arrivalCity: "",
      departureDate: "",
    }
  );
  const { departureCity, arrivalCity, departureDate } = formdata;
  const onChange = (prevent) =>
  {
    setformdata({ ...formdata, [prevent.target.name]: prevent.target.value })
  }
  const search = async (e) =>
  {
    e.preventDefault();
    document.getElementById("error").classList.add("hidden");
    if (departureCity.trim() == "" || arrivalCity.trim() == "" || departureDate.trim() == "") {
      document.getElementById("error").classList.remove("hidden");
      console.log('plz fill');
      return;
    }
    const res = await fetch("http://localhost:5051/search", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!data.length) return window.alert("No Record Found");
    const result = document.getElementById("result");
    result.classList.remove("hidden");
    result.scrollIntoView({ behavior: 'smooth' });
    setData(data);
  }
  const book = (id) =>
  {
    console.log(id);
    result.scrollIntoView({ behavior: 'smooth' });
  }
  // const [getuserdata, setUserdata] = useState([]);

  // const { udata, setUdata } = useContext(adddata);

  // const { updata, setUPdata } = useContext(updatedata);

  // const { dltdata, setDLTdata } = useContext(deldata);

  // const departure_city = document.getElementById('departure_city')
  // const arrival_city = document.getElementById('arrival_city')
  // const departure_time = document.getElementById('departure_time')
  // const arrival_time = document.getElementById('arrival_time')
  // // const getdata = async () =>
  // // {
  // //   const res = await fetch("http://localhost:5050/getData", {
  // //     method: "GET",
  // //     headers: {
  // //       "Content-Type": "application/json",
  // //     },
  // //   });

  // //   const data = await res.json();

  // //   if (res.status === 422 || !data) {
  // //     console.log("error ");
  // //   } else {
  // //     setUserdata(data);
  // //   }
  // // };
  // const search = async (e) =>
  // {
  //   e.preventDefault()
  //   console.log(departure_city.value);
  //   console.log(arrival_city.value);
  //   console.log(departure_time.value);
  //   console.log(arrival_time.value);
  // };

  // useEffect(() =>
  // {
  //   getdata();
  // }, []);

  return (
    <>
      <section className="flex justify-center" id="bg-pic">
        <div className="text-white flex flex-col gap-5 pt-16 w-3/4 h-1/2 mt-36 relative rounded">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded"></div>
          <div className="z-10 flex flex-col gap-5">
            <h1 className="text-center font-bold text-4xl">Find your next Trip</h1>
            <p className="text-center font-semibold text-xl">Search deals on hotels, homes, and much more...</p>
            <form className="px-10 mt-5 h-20 flex gap-3" onSubmit={search}>
              <div className="flex w-1/4 flex-col gap-3">
                <label>departure city</label>
                <input className="h-1/2 text-gray-900 rounded outline-none px-2 py-1" onChange={onChange} id='departure_city' name="departureCity"></input>
              </div>
              <div className="flex w-1/4 flex-col gap-3">
                <label>arrival city</label>
                <input onChange={onChange} id='arrivalCity' className="h-1/2 text-gray-900 rounded outline-none px-2 py-1" name="arrivalCity"></input>
              </div>
              <div className="flex w-1/4 flex-col gap-3">
                <label>departure date</label>
                <input onChange={onChange} id='departure_date' min={today} type="date" className="h-1/2 text-gray-900 rounded outline-none px-2 py-1" name="departureDate"></input>
              </div>
              <button className="h-1/2 text-gray-100 bg-blue-500 rounded outline-none px-4 py-2 mt-auto mb-1 w-full" type="submit">Search</button>
            </form>
            <div className="z-10 text-red-500 text-center -mt-4 hidden" id='error'>please fill all data inputs</div>
          </div>
        </div>
      </section>
      <section className="p-5 hidden min-h-screen bg-gray-50" id="result">
        <h1 className="text-center font-bold text-4xl mb-12 mt-3">Result</h1>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {["departure City", "arrival City", "departure time", "arrival time", "seats", "price", "Booking"].map((item) => <th key={item} scope="col" className="py-3 px-6">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((element) =>
            {
              return (
                <>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="py-4 px-6">{element.departureCity}</td>
                    <td className="py-4 px-6">{element.arrivalCity}</td>
                    <td className="py-4 px-6">{element.departureTime.replace('T',' at ')}</td>
                    <td className="py-4 px-6">{element.arrivalTime.replace('T',' at ')}</td>
                    <td className="py-4 px-6">{element.seats}</td>
                    <td className="py-4 px-6">{element.price} Mad</td>
                    <td className="py-4 px-6 text-green-400">
                      <button className="bg-green-50 active:bg-green-100 transition rounded px-3 py-2" onClick={() => { book(element._id) }}>Book Now</button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Home;