import { Routes, Route } from "react-router-dom";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import Layout from "./_auth/Layout.tsx";
import LoginForm from "./_auth/forms/LoginForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";
import RootLayout from "./_root/RootLayout.tsx";

import { Home, Hostel, Restaurant } from "./_root/pages";

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
          <Route path="/" element={<Home />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/restaurant" element={<Restaurant />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
