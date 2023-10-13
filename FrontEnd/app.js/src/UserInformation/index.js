import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const UserInformation = (props) => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [apiData, setApiData] = useState({});

  const { match } = props;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    setApiStatus(apiConstants.progress);
    const getData = async () => {
      const api = axios.create({
        baseURL: "http://localhost:4000",
      });
      api
        .get(`/users/${id}`)
        .then((response) => {
          setApiStatus(apiConstants.success);
          setApiData(response.data);
        })
        .catch((error) => {
          setApiStatus(apiConstants.failure);
          console.log(error);
        });
    };
    getData();
  }, [id]);

  const renderProgressView = () => (
    <div className="products-loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderSuccessView = () => {
    const { username, name, email, address, phone, website, company } = apiData;
    const { street, city, zipcode } = address;
    return (
      <div className="user-info-container">
        <li className="user-info-list-items">
          <p className="username">{username}</p>
          <div className="contact-container">
            <p className="contact">CONTACT</p>
            <p className="name">{name}</p>
          </div>
          <div className="street-container">
            <p className="street">STREET</p>
            <p className="street-description">{street}</p>
          </div>
          <div className="contact-city">
            <p className="city">CITY</p>
            <p className="city-description">{city}</p>
          </div>
          <Link to={`/users`} className="link">
            <button className="view-button">Hide Details</button>
          </Link>
          <div>
            <p className="street">COMPANY</p>
            <p className="street-description">{company.name}</p>
            <p className="street-description">{company.catchPhrase}</p>
            <p className="street-description">{company.bs}</p>
            <p className="street-description">{website}</p>
            <div className="user-info-sub-container">
              <div>
                <p className="street">Contact Person</p>
                <p className="street-description">{name}</p>
                <p className="street">Email</p>
                <p className="street-description">{email}</p>
                <p className="street">Phone</p>
                <p className="street-description">{phone}</p>
              </div>
              <div>
                <p className="street">Address</p>
                <p className="street-description">{street}</p>
                <p className="street">City</p>
                <p className="street-description">{city}</p>
                <p className="street">Zip - code</p>
                <p className="street-description">{zipcode}</p>
              </div>
            </div>
          </div>
        </li>
      </div>
    );
  };

  const renderFailureView = () => (
    <div className="products-loader-container">
      <h1>NOT FOUND</h1>
    </div>
  );

  switch (apiStatus) {
    case apiConstants.progress:
      return renderProgressView();
    case apiConstants.success:
      return renderSuccessView();
    case apiConstants.failure:
      return renderFailureView();
    default:
      return null;
  }
};
export default UserInformation;
