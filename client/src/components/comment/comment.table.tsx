import React from "react";
import { Link } from "react-router-dom";
import { CommentTableData } from "../../models/comments";

function Del(Id?: string) {
  alert(Id);
}

const TableRowComment: React.FunctionComponent<CommentTableData> = (props: CommentTableData) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.postId}</td>
      <td>{props.content}</td>
    </tr>
  );
};
export default TableRowComment;
