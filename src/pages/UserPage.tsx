import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser, updateUser } from "../network/request";
import { User } from "./UserListPage";
import Loader from "../components/Loader";
import { Variant as AlertVariant } from "../utils/Alerts/constants";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();
  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertVariant | null>(null);
  const navigate = useNavigate();

  const handleUser = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        if (userId) {
          const { data } = await getSingleUser(userId);
          setUser(data.data);
        }
      } catch (err) {
        navigate("/404");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      const payload = {
        ...user,
        [name]: value,
      };
      setUser(payload);
    }
  };

  const handleEdit = async () => {
    if (editable && userId && user) {
      try {
        setLoading(true);
        await updateUser(user, userId);
        setEditable(false);
        setShowAlert(AlertVariant.success);
      } catch (err) {
        setShowAlert(AlertVariant.error);
      } finally {
        setLoading(false);
      }
      return;
    }
    setEditable(true);
  };

  useEffect(() => {
    if (userId) handleUser(userId);
  }, [handleUser, userId]);

  return loading ? (
    <Loader />
  ) : user ? (
    <Card
      user={user}
      showAlert={showAlert}
      userId={user.id}
      editable={editable}
      handleChange={handleChange}
      handleEdit={handleEdit}
      handleCancel={() => setEditable(false)}
    />
  ) : null;
}
