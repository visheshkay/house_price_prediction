import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import "./App.css";

function App() {
  let [locations, setLocations] = useState([]);
  let [estPrice, setEstPrice] = useState('')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const predict = async (data) => {
    try {
      console.log(data)
      let res = await axios.post(
        "http://127.0.0.1:5000/get_predicted_price",
        data
      );
      console.log(res);
      setEstPrice(res.data.estimated_price)
    } catch (e) {
      console.log(e);
    }
  };

  const getLocations = async () => {
    try {
      let res = await axios.get("http://127.0.0.1:5000/get_locations");
      setLocations(res.data.locations);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const locationOptions = locations.map((location, index) => (
    <option key={index} value={location}>
      {location}
    </option>
  ));

  return (
    <>
      <div>
        <h1 className="head">House Price Prediction</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit(predict)} className="main-form">
            <div className="field">
              <div>
                <label>Area (sqft)</label>
              </div>
              <input
                name="area"
                id="area"
                type="text"
                {...register("total_sqft")}
              />
            </div>
            <div className="field">
              <div>
                <label>BHK</label>
              </div>
              <select defaultValue={"bhk"} name="bhk" {...register("bhk")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="field">
              <div>
                <label>Bathrooms</label>
              </div>
              <select defaultValue={"bath"} name="bath" {...register("bath")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="field">
              <div>
                <label>Location</label>
              </div>
              <Controller
                name="location"
                control={control} // Use the control object from useForm
                render={({ field: { onChange, value } }) => (
                  <select value={value} onChange={onChange}>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className="field">
              <div>
                <label>Balcony</label>
              </div>
              <select
                defaultValue={"balcony"}
                name="balcony"
                {...register("balcony")}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button type="submit" className="button-sub">
              Submit
            </button>
          </form>
        </div>
        <div>
                {estPrice && <h2 style={{textAlign:'center'}}>Rs.{estPrice}</h2>}
        </div>
      </div>
    </>
  );
}

export default App;
