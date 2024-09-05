import Forms from "./components/Forms";

function App() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] p-10">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>

      <div className="">
        <h1 className="text-5xl font-bold text-center">Collab_Palette</h1>
        <p className="text-center text-xl">A Real-Time Collaborative Whiteboard</p>
      </div>

      <Forms />
    </div >
  );
}

export default App;
