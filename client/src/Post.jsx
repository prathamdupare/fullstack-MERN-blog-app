export default function Post() {
  return (
    <div className="entry flex p-2 border rounded-[10px] m-1 hover:bg-gray-100">
      <img src="https://picsum.photos/200/" alt="ds" />
      <div className="p-2">
        <h2 className="font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          laboriosam debitis, itaque laudantium sunt consectetur iusto quam
        </h2>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          optio, error illo dolores obcaecati laboriosam a sed tempore tenetur
          veniam illum atque sequi saepe nostrum dicta ab neque odit ipsa.
        </p>
      </div>
    </div>
  );
}
