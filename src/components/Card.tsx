import { ChangeEvent } from "react";
import { User } from "../pages/UserListPage";
import styles from "./Card.module.css";
import Alert from "../components/Alert";
import { Variant as AlertVariant } from "../utils/Alerts/constants";

const AlertsMapper = {
  [AlertVariant.success]: "Success! User Updated",
  [AlertVariant.error]: "Oho! There is some error happened Try again later",
};

type Props = {
  user: User;
  showAlert: AlertVariant | null;
  userId: string;
  editable: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEdit: VoidFunction;
  handleCancel: VoidFunction;
};

export default function Card({
  user,
  showAlert,
  userId,
  editable,
  handleChange,
  handleEdit,
  handleCancel,
}: Props) {
  return (
    <div className={styles.outerContainer}>
      <h1>{`${user.first_name} ${user.last_name}`}</h1>
      <div className={styles.container}>
        {showAlert && (
          <Alert variant={showAlert} show={showAlert !== null}>
            {AlertsMapper[showAlert]}
          </Alert>
        )}
        <div>
          <img src={user.avatar} alt="" />
        </div>
        <h3>Id: {userId}</h3>
        <form>
          <div className={styles.row}>
            <label>First Name:</label>
            <input
              type="text"
              value={user.first_name}
              disabled={!editable}
              name="first_name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <label>Last Name:</label>
            <input
              type="text"
              value={user.last_name}
              disabled={!editable}
              name="last_name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <label>Email:</label>
            <input
              type="text"
              value={user.email}
              disabled={!editable}
              name="email"
              onChange={handleChange}
            />
          </div>
        </form>
        <div className={styles.buttonGroup}>
          {editable && (
            <button className="secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
          <button className="primary" onClick={handleEdit}>
            {editable ? "Update" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
