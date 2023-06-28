import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../common/components/form/pagination";
import { Comment } from "../../models/comments";
import { GET_COMMENT_BY_POSTID } from "./comment.query";
import TableRowComment from "./comment.table";

const CommentComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(GET_COMMENT_BY_POSTID, {
    variables: {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      id: id,
    },
  }); // Use the useQuery hook

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

  const comments = data?.getCommentByPostId.comments || [];
  const pageInfo = data?.getCommentByPostId.pageInfo;
  const totalComments = pageInfo?.total || 0;
  const hasNextPage = pageInfo?.hasNextPage || false;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h3 className="text-center">Comment List By Post</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Post ID</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((object: Comment, i: number) => (
            <TableRowComment key={i} index={i + 1} {...object} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalComments / itemsPerPage)}
        onPageChange={handlePageChange}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default CommentComponent;
