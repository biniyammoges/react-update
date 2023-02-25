import React, { Suspense, useState, useTransition } from "react";
import "./App.css";
import { MyErrorBoundary } from "./components/ErrorBoundary";

const Home = React.lazy(() => import("./components/Home"));
const About = React.lazy(() => import("./components/About"));

const FallBack = () => (
  <div>
    <h1>Loading</h1>
  </div>
);

function App() {
  const [idx, setIdx] = useState(0);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="App">
      <h1>Tabs</h1>
      {isPending && <h1>Loafing</h1>}
      <div>
        <button onClick={() => startTransition(() => setIdx(0))}>Home</button>
        <button onClick={() => startTransition(() => setIdx(1))}>About</button>
      </div>
      <Suspense fallback={<FallBack />}>
        {idx === 0 ? (
          <MyErrorBoundary>
            <Home />
          </MyErrorBoundary>
        ) : (
          <About />
        )}
      </Suspense>
    </div>
  );
}

export default App;
