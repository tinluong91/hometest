import React from "react";
import { Link } from "react-router-dom";
import { PostTableData } from "../../models/posts";

function Del(Id?: string) {
  alert(Id);
}

const TableRowPost: React.FunctionComponent<PostTableData> = (props: PostTableData) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.title}</td>
      <td>{props.content}</td>
      <td className="text-center">
        <Link to={"/comments/" + props.id}>{props.commentCount}</Link>
      </td>
    </tr>
  );
};
export default TableRowPost;
