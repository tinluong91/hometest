import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { PostExtended } from "../../models/posts";
import { GET_POSTS_BY_USERID } from "./post.query";
import TableRowPost from "./post.table";
import { useParams } from "react-router-dom";
import Pagination from "../../common/components/form/pagination";

const PostComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(GET_POSTS_BY_USERID, {
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

  const posts = data?.getPostsWithCommentCount.posts || [];
  const pageInfo = data?.getPostsWithCommentCount.pageInfo;
  const totalPosts = pageInfo?.total || 0;
  const hasNextPage = pageInfo?.hasNextPage || false;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h3 className="text-center">Post List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Content</th>
            <th>Total Comment</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((object: PostExtended, i: number) => (
            <TableRowPost key={i} index={i + 1} {...object} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalPosts / itemsPerPage)}
        onPageChange={handlePageChange}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default PostComponent;
