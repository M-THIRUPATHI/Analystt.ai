import { Link } from "react-router-dom";
import "./index.css";

const Users = (props) => {
  const { eachData } = props;
  const { id, username, name, address } = eachData;
  const { street, city } = address;
  return (
    <li className="users-list-items">
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
      <Link to={`/users/${id}`} className="link">
        <button className="view-button">View Details</button>
      </Link>
    </li>
  );
};
export default Users;
