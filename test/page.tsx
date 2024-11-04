import Forms from './_components/Form';
import GetTodos from './_components/GetTodo';

const Page = () => {
  return (
    <div className="relative min-h-screen bg-slate-200">
      <div className="flex h-1/2 flex-col items-center justify-around ">
        <h1 className=" mb-12 mt-12 text-4xl font-bold">Todos Page</h1>
        <Forms />
      </div>
      <div className="flex  h-1/2 flex-col items-center ">
        <GetTodos />
      </div>
    </div>
  );
};

export default Page;
