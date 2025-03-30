import React from "react";
// import InternetHistoryVisualizer from "./InternetHistoryVisualizer";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import LandingPage from "./pages/LandingPage";
import InternetEvolutionTimeline from "./pages/internetMilestones";
import MilestonePage from "./pages/MilestonePage";
import DailyTechNews from "./pages/DailyTechNews";
import NewsDetail from "./pages/NewsDetail";
import AboutSection from "./pages/AboutSection";
// import SmoothScroll from "./components/SmoothScroll";

const App = () => {
  return (
    // <SmoothScroll>
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black text overflow-x-hidden ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/timeline" element={<InternetEvolutionTimeline />} />
          <Route path="/timeline/:slug" element={<MilestonePage />} />
          <Route path="/news" element={<DailyTechNews />} />
          <Route path="/about" element={<AboutSection  />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Route>
      </Routes>
    </div>
    // </SmoothScroll>
  );
};

export default App;
