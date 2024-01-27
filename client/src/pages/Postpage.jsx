import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch post with id ${id}`);
        }

        const postData = await response.json();
        setPostInfo(postData);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchPostInfo();
  }, [id]);

  if (!postInfo) {
    return <p>Loading...</p>;
  }

  // Move the formattedDate assignment inside the if block
  const formattedDate = formatISO9075(new Date(postInfo.createdAt));

  return (
    <div className="max-w-6xl mx-auto my-8">
      <img
        className="w-full h-96 object-cover object-center mb-8 rounded-lg shadow-lg"
        alt="featured"
        src={`http://localhost:4000/${postInfo.cover}`}
      />
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold">{postInfo.title}</h1>
          <div className="text-gray-600 text-sm">
            <p>By {postInfo.author.username}</p>
            <time>{formattedDate}</time>
          </div>

          <Link
            to={`/edit/${postInfo._id}`}
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Edit
          </Link>
        </div>
        <p className="text-gray-700 mb-6">{postInfo.summary}</p>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
        {/* Add more details as needed */}
      </div>
    </div>
  );
}
