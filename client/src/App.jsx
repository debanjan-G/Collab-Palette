import Forms from "./components/Forms";


function App() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-custom p-10">
      <div className="blur-circle"></div>
      <div className="">
        <h1 className="text-5xl font-bold text-center">Collab_Palette</h1>
        <p className="text-center text-xl">A Real-Time Collaborative Whiteboard</p>
      </div>

      <Forms />
    </div >
  );
}

export default App;
