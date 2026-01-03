import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./screens/About";
import { ApplicationSuccess, ApplyProgram } from "./screens/ApplyProgram";
import { Contact } from "./screens/Contact";
import { FAQ } from "./screens/FAQ";
import { ElementHomepage } from "./screens/Home";
import { Login } from "./screens/Login";
import { News } from "./screens/News";
import { NewsDetail } from "./screens/News/NewsDetail";
import { Privacy } from "./screens/Privacy";
import { Profile } from "./screens/Profile";
import { ProgramDetail } from "./screens/ProgramDetail/ProgramDetail";
import { ProgramList } from "./screens/ProgramList";
import { Terms } from "./screens/Terms";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ElementHomepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/programs/:programName/:programType" element={<ProgramList />} />
          <Route path="/programs/:programName/:programType/:programSlug" element={<ProgramDetail />} />
          <Route path="/programs/:programName/:programType/:programSlug/apply" element={<ApplyProgram />} />
          <Route path="/programs/:programName/:programType/:programSlug/apply/success" element={<ApplicationSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/berita" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/kebijakan-privasi" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
