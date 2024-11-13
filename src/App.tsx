import { Routes, Route } from "react-router-dom";

import "./globals.css";
import LoginForm from "./_auth/forms/LoginForm";
import SignUpForm from "./_auth/forms/SignUpForm";

import Layout from "./_auth/Layout";
import RootLayout from "./_root/RootLayout";
const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<RootLayout />}></Route>
      </Routes>
    </main>
  );
};

export default App;
