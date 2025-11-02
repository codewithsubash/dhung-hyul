import { Routes, Route } from "react-router-dom";

const CRMRouter = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<div>Dashboard Page</div>} />
      {/* Add more app routes */}
    </Routes>
  );
};

export default CRMRouter;
