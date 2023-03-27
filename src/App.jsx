import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";

function App() {
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState({
    town: "ANG MO KIO",
    flatType: "Any",
    flatModel: "Any",
    floorArea: "Any",
    floor: "Any",
    remainingLease: "Any",
  });

  const [data, setData] = useState(null);
  const [resaleValue, setResaleValue] = useState(null);
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const handleOnSubmit = async (event) => {
    const response = await axios.post(
      "https://34.143.190.20:8000/flat/",
      filterValue,
      {
        httpsAgent: agent,
        withCredentials: true,
      }
    );
    if (response.data.result.records.length === 0) {
      alert(
        "No data matching the filtered results found, please try adjusting the filters"
      );
    } else {
      setData(response.data.result.records);
      console.log(response.data.result.resaleValue);
      setResaleValue(response.data.result.resaleValue);
      navigate("/search");
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "Town") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        town: event.target.value,
      }));
    } else if (event.target.name === "Flat Type") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        flatType: event.target.value,
      }));
    } else if (event.target.name === "Flat Model") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        flatModel: event.target.value,
      }));
    } else if (event.target.name === "Floor Area") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        floorArea: event.target.value,
      }));
    } else if (event.target.name === "Floor") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        floor: event.target.value,
      }));
    } else if (event.target.name === "Remaining Lease") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        remainingLease: event.target.value,
      }));
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            town={filterValue.town}
            flatType={filterValue.flatType}
            flatModel={filterValue.flatModel}
            floorArea={filterValue.floorArea}
            floor={filterValue.floor}
            remainingLease={filterValue.remainingLease}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
          />
        }
      />
      <Route
        path="/search"
        element={
          <Search
            data={data}
            resaleValue={resaleValue}
            town={filterValue.town}
          />
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin" element={<AdminFeedback />} />
    </Routes>
  );
}

export default App;
