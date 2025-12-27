import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/landing/ui/LandingPage";
import { BlogArchivePage } from "@/pages/blogArchive/ui/BlogArchivePage";
import { BlogPostPage } from "@/pages/blogPost/ui/BlogPostPage";

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/blog" element={<BlogArchivePage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
        </BrowserRouter>
    );
};
