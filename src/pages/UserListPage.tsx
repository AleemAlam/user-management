import { useState, useEffect, useCallback } from "react";
import Loader from "../components/Loader";
import Table from "../components/Table";
import { getUsers } from "../network/request";
import { useSearchParams, useNavigate } from "react-router-dom";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UserListPage() {
  const [users, setUsers] = useState<Array<User>>([]);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const handlePagination = (params: number) => {
    navigate(`/users?page=${page + params}`);
  };

  const handleUsers = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const { data } = await getUsers(page);
        // Navigate to 404 if user use wrong url
        if (page > data.total_pages) {
          navigate("404");
          return;
        }
        setUsers(data.data);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        console.log("err");
      }
    },
    [navigate]
  );

  useEffect(() => {
    handleUsers(page);
  }, [handleUsers, page]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            users={users}
            currentPage={page}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </>
      )}
    </div>
  );
}
