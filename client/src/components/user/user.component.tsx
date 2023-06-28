import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { UserExtended } from "../../models/users";
import { GET_USERS } from "./user.query";
import TableRowUser from "./user.table";
import Pagination from "../../common/components/form/pagination";

const UserComponent: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    },
  });

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="alert alert-danger" role="alert">
          An error occurred!
        </div>
      </div>
    );
  }

  const users = data?.getUsersWithPostCount.users || [];
  const pageInfo = data?.getUsersWithPostCount.pageInfo;
  const totalUsers = pageInfo?.total || 0;
  const hasNextPage = pageInfo?.hasNextPage || false;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h3 className="text-center">User List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total Post</th>
            <th className="text-center" colSpan={1}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((object: UserExtended, i: number) => (
            <TableRowUser key={i} index={i + 1} {...object} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalUsers / itemsPerPage)}
        onPageChange={handlePageChange}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default UserComponent;
