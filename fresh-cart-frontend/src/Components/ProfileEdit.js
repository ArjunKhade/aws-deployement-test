import axios from "axios";
//import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { getUserFromToken } from "../auth/Index";
import { url } from "../common/constants";

function ProfileEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  //const [userDetails, setUserDetails] = useState();
  //const [role, setRole] = useState("");
  const user = {
    name,
    email,
    phone,
    city,
    pin,
    address,
  };

  const navigate = useNavigate();
  // const getdata = () => {
  //   var data = getUserFromToken();
  //   console.log(data.token);
  //   var userPojo = jwtDecode(data.token);
  //   console.log(userPojo.user);
  // };

  const save = () => {
    axios
      .put(url + `users/update/${id}`, user)
      .then((res) => {
        const result = res.data;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/");
  };

  useEffect(() => {
    axios
      .get(url + `/users/${id}`)
      .then((res) => {
        const result = res.data;
        console.log(result);
        setName(result.name);
        setAddress(result.address);
        setCity(result.city);
        setPhone(result.phone);
        setPin(result.pin);
        setEmail(result.email);

        // save();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div
      className="row py-5"
      style={{
        height: "90vh",
        justifyContent: "Center",
        backgroundImage: `url("./img2.jpg")`,
      }}
    >
      <div class="col-4 ">
        <div
          class="card opacity-100"
          style={{ "background-color": "lightskyblue" }}
        >
          <div class="card-body">
            <div class="row text-align-center card-title">
              <h4>Profile Details</h4>
            </div>
            <hr />

            <div class="row">
              <div class="col-3">
                <p class="mb-0">Name</p>
              </div>
              <div class="col-9">
                <input
                  type={"text"}
                  className={"form-control"}
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <input
                  value={userDetails?.email}
                  className={"form-control"}
                  
                />
              </div>
            </div> */}
            <hr />

            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">City</p>
              </div>
              <div class="col-sm-9">
                <input
                  type={"text"}
                  className={"form-control"}
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Pin</p>
              </div>
              <div class="col-sm-9">
                <input
                  type={Number}
                  className={"form-control"}
                  id="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <input
                  type={"text"}
                  className={"form-control"}
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
                <input
                  type={Number}
                  className={"form-control"}
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="text-align-center">
                <button className="btn btn-primary mx-5" onClick={save}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileEdit;
