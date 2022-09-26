import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { getUserFromToken } from "../auth/Index";
import { url } from "../common/constants";

function Profile() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState();

  const navigate = useNavigate();
  // const getdata = () => {
  //   var data = getUserFromToken();
  //   console.log(data.token);
  //   var userPojo = jwtDecode(data.token);
  //   console.log(userPojo.user);
  // };

  const edit = () => {
    navigate(`/edit/profile/${id}`);
  };

  useEffect(() => {
    axios
      .get(url + `/users/${id}`)
      .then((res) => {
        const result = res.data;
        console.log(result);
        setUserDetails(result);
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
                  value={userDetails?.name}
                  readOnly
                />
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <input value={userDetails?.email} className={"form-control"} />
              </div>
            </div>
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
                  value={userDetails?.city}
                  readOnly
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
                  value={userDetails?.pin}
                  readOnly
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
                  value={userDetails?.address}
                  readOnly
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
                  value={userDetails?.phone}
                  readOnly
                />
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="text-align-center">
                <button className="btn btn-success mx-5" onClick={edit}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
