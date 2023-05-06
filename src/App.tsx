import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryPage from "./pages/category/CategoryPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/categories" element={<CategoryPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
