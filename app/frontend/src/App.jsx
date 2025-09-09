// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/auth" element={<AuthPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
