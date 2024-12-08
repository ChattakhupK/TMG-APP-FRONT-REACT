import Layout from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MemberPage from "./pages/MemberPage";
import ProductsPage from "./pages/ProductsPage";
import ManagePage from "./pages/admin/ManagePage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="member" element={<MemberPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="admin" element={<ManagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
