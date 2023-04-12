import React from "react";
import { User } from "../pages/UserListPage";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
};

export default function TableList({ user }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${user.id}`);
    return;
  };

  return (
    <tr onClick={handleClick}>
      <td>
        <img src={user.avatar} alt={user.first_name} />
      </td>
      <td>{user.id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
    </tr>
  );
}
