import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => setPostInfo(postInfo));
  }, []);

  if (!postInfo) return null;

  return (
    <div className="post-page max-w-5xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <div className="flex  flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">{postInfo.title}</h1>
        <time className="text-gray-600 mb-2">
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>
        <div className="text-gray-700 mb-4">by @{postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id && (
          <div className="edit-row">
            <Link
              to={`/edit/${postInfo._id}`}
              className="bg-blue-500 text-white m-3 w-[100px] py-2 px-4 rounded-lg flex items-center transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit
            </Link>
          </div>
        )}
      </div>
      <div className="image flex items-center justify-center mb-4">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt=""
          className="w-3/4 h-auto rounded-lg"
        />
      </div>
      <div
        className="content text-gray-800"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
