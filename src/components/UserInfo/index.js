import Image from "../Image";
import "../UserInfo/userinfo.scss";

const UserInfo = ({
  firstName,
  lastName,
  profilePicture,
  position,
  name,
  email,
  ...props
}) => {
  return (
    <div className="user-info-cover">
      <div className="user-img">
        <Image src={profilePicture} />
      </div>
      <h4>{firstName + " " + lastName || ""}</h4>
      <div className="company-details">
        <h5>{name || ""} </h5>
        <h6>{position}</h6>
        <span>{email}</span>
      </div>
    </div>
  );
};
export default UserInfo;
