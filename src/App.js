import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/main";
import Product from "./pages/product";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="product" element={<Product />} />
      </Routes>
    </Layout>
  );
}

export default App;
