import React from "react";
import { Link } from "react-router-dom";
import { UserTableData } from "../../models/users";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_USER } from "./user.query";
import * as toastr from "toastr";

const TableRowUser: React.FunctionComponent<UserTableData> = (
  props: UserTableData
) => {
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = () => {
    deleteUser({ variables: { id: props.id } })
      .then(() => {
        toastr.success("Member deleted.");
        window.location.reload();
      })
      .catch((error) => {
        toastr.error(error.message);
        console.log("Error:", error);
      });
  };
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>
        <Link to={`/posts/${props.id}`}>{props.postCount}</Link>
      </td>
      <td>
        <Link to={"/edit/" + props.id} className="btn btn-primary">
          Edit
        </Link>
      </td>
      <td>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};
export default TableRowUser;
