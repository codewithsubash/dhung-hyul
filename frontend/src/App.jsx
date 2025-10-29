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
    <div style={{ padding: 20 }}>
      <h1>dhung-hyul (frontend)</h1>
      <p>{msg || "Loading..."}</p>
    </div>
  );
}
