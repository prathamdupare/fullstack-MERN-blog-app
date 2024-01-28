import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="entry flex p-2 mx-8 border rounded-lg m-2 hover:bg-gray-100">
      <div className="w-1/4 mr-4">
        <Link to={`post/${_id}`}>
          <img
            className="w-full h-auto object-cover rounded-lg"
            src={"http://localhost:4000/" + cover}
            alt="Post cover"
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col ">
        <div>
          <Link
            to={`post/${_id}`}
            className="font-semibold text-base text-blue-600 hover:underline"
          >
            {title}
          </Link>
          <p className="text-xs w-[75%] text-gray-500 mt-1">{summary}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-xs text-gray-600">{author.username}</p>
          <span className="mx-2 text-gray-400">•</span>
          <time className="text-xs text-gray-600">
            {formatISO9075(new Date(createdAt))}
          </time>
        </div>
      </div>
    </div>
  );
}
