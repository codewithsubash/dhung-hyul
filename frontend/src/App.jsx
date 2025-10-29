import { useEffect, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/example")
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch((e) => setMsg("Error: " + e.message));
  }, []);

  return (
    <div className="p-20">
      <h1 className="text-red-600">dhung-hyul (frontend)</h1>
      <p>{msg || "Loading..."}</p>
    </div>
  );
}
