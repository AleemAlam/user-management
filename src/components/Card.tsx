import { ChangeEvent, useState } from "react";
import { User } from "../pages/UserListPage";
import styles from "./Card.module.css";
import Alert from "../components/Alert";
import { Variant as AlertVariant } from "../utils/Alerts/constants";
import { Link } from "react-router-dom";

const AlertsMapper = {
  [AlertVariant.success]: "Success! User Updated",
  [AlertVariant.error]: "Oho! There is some error happened Try again later",
};

type Props = {
  user: User;
  showAlert: AlertVariant | null;
  userId: string;
  editable: boolean;
  handleEdit: (url: string) => void;
  handleCancel: VoidFunction;
};

export default function Card({
  user,
  showAlert,
  userId,
  editable,
  handleEdit,
  handleCancel,
}: Props) {
  const [input, setInput] = useState(user);
  const [previewImg, setPreviewImg] = useState<string>(user.avatar);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    // currently converting img to blob for preview
    if (e.target.files?.[0]) {
      const blobImg = URL.createObjectURL(e.target.files[0]);
      setPreviewImg(blobImg);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      const payload = {
        ...user,
        [name]: value,
      };
      setInput(payload);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <h1>{`${user.first_name} ${user.last_name}`}</h1>
      <div className={styles.container}>
        {showAlert && (
          <Alert variant={showAlert} show={showAlert !== null}>
            {AlertsMapper[showAlert]}
          </Alert>
        )}
        <Link to="/">Go back to Users</Link>
        <div>
          <img src={previewImg} alt="img" width="125px" height="125px" />
        </div>
        <h3>Id: {userId}</h3>
        <form>
          {editable && (
            <input
              type="file"
              multiple={false}
              onChange={handleImage}
              accept="image/*"
            />
          )}
          <div className={styles.row}>
            <label>First Name:</label>
            <input
              type="text"
              value={input.first_name}
              disabled={!editable}
              name="first_name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <label>Last Name:</label>
            <input
              type="text"
              value={input.last_name}
              disabled={!editable}
              name="last_name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <label>Email:</label>
            <input
              type="text"
              value={input.email}
              disabled={!editable}
              name="email"
              onChange={handleChange}
            />
          </div>
        </form>
        <div className={styles.buttonGroup}>
          {editable && (
            <button
              className="secondary"
              onClick={() => {
                handleCancel();
                setInput(user);
                setPreviewImg(user.avatar);
              }}
            >
              Cancel
            </button>
          )}
          <button className="primary" onClick={() => handleEdit(previewImg)}>
            {editable ? "Update" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
