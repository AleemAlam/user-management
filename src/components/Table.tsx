import React from "react";
import TableList from "./TableList";
import styles from "./Table.module.css";
import { User } from "../pages/UserListPage";
import { column } from "../utils/constant";

type Props = {
  users: Array<User>;
  currentPage: number;
  totalPages: number;
  handlePagination: (params: number) => void;
};

export default function Table({
  users,
  currentPage,
  handlePagination,
  totalPages,
}: Props) {
  return (
    <div className={styles.container}>
      <h1>User Management</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* mapping columns from utils */}
            {column.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableList key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      {/* button group */}
      <div className={styles.buttonGroup}>
        <button
          className="primary"
          onClick={() => handlePagination(-1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="primary"
          onClick={() => handlePagination(1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
