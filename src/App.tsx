import { Routes, Route } from "react-router-dom";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import Home from "./_root/pages/Home.tsx";
import Layout from "./_auth/Layout.tsx";
import LoginForm from "./_auth/forms/LoginForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";
import RootLayout from "./_root/RootLayout.tsx";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
