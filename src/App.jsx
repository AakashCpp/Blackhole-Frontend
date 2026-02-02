import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="bg-zinc-950 h-screen w-screen text-white text-center">
        hello blackhole
        <div className="cursor-pointer" onClick={increment}>
          <h1>{`count : ${count}`}</h1>
        </div>
      </div>
    </>
  );
}

export default App;
