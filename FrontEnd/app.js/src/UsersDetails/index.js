import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Users from "../Users";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const UsersDetails = () => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [apiData, setApiData] = useState([]);
  console.log(apiData);

  useEffect(() => {
    setApiStatus(apiConstants.progress);
    const getData = async () => {
      const api = axios.create({
        baseURL: "http://localhost:4000",
      });
      api
        .get("/users")
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
  }, []);

  const renderProgressView = () => (
    <div className="products-loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderSuccessView = () => {
    return (
      <ul className="user-details-unorder-list">
        {apiData.map((eachData) => (
          <Users eachData={eachData} key={eachData.id} />
        ))}
      </ul>
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
export default UsersDetails;
