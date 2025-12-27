import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SplineScene from "./components/SplineScene";
import { BentoGrid } from "./components/BentoGrid";
import { ChatWidget } from "./components/ChatWidget";
import { Icons } from "./components/Icons";
import { BlogArchive } from "./pages/BlogArchive";
import { BlogPostPage } from "./pages/BlogPost";

const Navbar: React.FC<{ onLogoClick: () => void; isLight?: boolean; showNavLinks?: boolean }> = ({
    onLogoClick,
    isLight,
    showNavLinks = true,
}) => {
    const navigate = useNavigate();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        if (id === "blog") {
            navigate("/blog");
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-40 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center pointer-events-none transition-colors duration-1000 ${
                isLight ? "text-black" : "text-white"
            }`}
        >
            <div className="pointer-events-auto cursor-pointer" onClick={onLogoClick}>
                <span className="text-xl md:text-2xl font-bold tracking-tighter">
                    Yena<span className="text-brand-purple">.Lee</span>
                </span>
            </div>

            {showNavLinks && (
                <div
                    className={`pointer-events-auto backdrop-blur-md px-6 py-3 rounded-full hidden md:flex gap-8 text-sm font-medium border transition-colors duration-1000 ${
                        isLight
                            ? "bg-white/10 border-black/10 text-black/80"
                            : "bg-black/20 border-white/10 text-white/80"
                    }`}
                >
                    <a
                        href="#about"
                        onClick={(e) => handleScroll(e, "about")}
                        className={`transition-colors ${
                            isLight ? "hover:text-brand-green" : "hover:text-brand-green"
                        }`}
                    >
                        About
                    </a>
                    <a
                        href="#blog"
                        onClick={(e) => handleScroll(e, "blog")}
                        className={`transition-colors ${
                            isLight ? "hover:text-brand-purple" : "hover:text-brand-purple"
                        }`}
                    >
                        Blog
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleScroll(e, "contact")}
                        className={`transition-colors ${
                            isLight ? "hover:text-brand-orange" : "hover:text-brand-orange"
                        }`}
                    >
                        Contact
                    </a>
                </div>
            )}

            <div className="pointer-events-auto">
                <a
                    href="https://github.com/i2na"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold transition-colors duration-1000 ${
                        isLight
                            ? "bg-black text-white hover:bg-black/80"
                            : "bg-white text-black hover:bg-gray-200"
                    }`}
                >
                    <span className="hidden sm:inline">GitHub</span>
                    <Icons.Github className="w-4 h-4" />
                </a>
            </div>
        </nav>
    );
};

const SectionHeader: React.FC<{ label: string; title: string; id?: string }> = ({
    label,
    title,
    id,
}) => (
    <div
        id={id}
        className="flex flex-col items-center justify-center py-16 md:py-24 text-center px-4"
    >
        <div className="font-mono text-brand-green mb-4 text-xs md:text-sm tracking-widest uppercase">{`{ ${label} }`}</div>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-tight">
            {title}
        </h2>
    </div>
);

const LandingPageContent: React.FC = () => {
    const navigate = useNavigate();

    // Extended tech stack list for smooth marque effect
    const techStack = [
        "Structure",
        "Logic",
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "System Design",
        "Architecture",
        "Testing",
        "Reliability",
        "Clean Code",
        "Solid",
        "Docker",
        "AWS",
        "Stability",
        "Focus",
        "Clarity",
    ];

    const handleArchiveClick = () => {
        navigate("/blog");
    };

    const handlePostClick = (slug: string) => {
        navigate(`/blog/${slug}`);
    };

    return (
        <div className="min-h-screen bg-brand-black text-white selection:bg-brand-purple selection:text-white relative">
            <Navbar onLogoClick={() => window.scrollTo(0, 0)} />

            {/* Hero Section */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
                <SplineScene />
                <div className="relative z-10 text-center pointer-events-none px-4 mt-[-10vh] md:mt-0">
                    <h1
                        className="text-[18vw] md:text-[15vw] leading-none font-bold tracking-tighter"
                        style={{
                            WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                            color: "transparent",
                        }}
                    >
                        YENA
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-2 md:mt-4">
                        <span className="text-lg md:text-3xl font-light tracking-wide text-white/80">
                            Solid Structure
                        </span>
                        <span className="hidden md:block w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                        <span className="text-lg md:text-3xl font-light tracking-wide text-white/80">
                            Quiet Strength
                        </span>
                    </div>
                </div>

                <div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce pointer-events-auto cursor-pointer"
                    onClick={() =>
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    <Icons.ArrowRight className="w-6 h-6 rotate-90 text-white/50" />
                </div>
            </section>

            {/* Philosophy Section */}
            <section
                id="about"
                className="py-16 md:py-20 px-6 bg-brand-black relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-purple/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-green/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center md:text-left relative z-10">
                    <span className="font-mono text-brand-purple mb-4 md:mb-6 block text-sm md:text-base">{`// WHO I AM`}</span>
                    <p className="text-2xl md:text-5xl font-medium leading-snug text-white/90">
                        Quiet presence,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
                            Distinct
                        </span>{" "}
                        impact. I speak through{" "}
                        <span className="inline-block border border-white/20 rounded-full px-3 py-1 md:px-4 md:py-0 mx-1 md:mx-2 my-1 italic hover:bg-white/10 transition-colors cursor-default text-lg md:text-4xl">
                            Clear Structure
                        </span>
                        , not noise. Steady. Solid. Trustworthy. I build digital experiences that{" "}
                        <span className="text-white font-bold underline decoration-brand-green underline-offset-4">
                            do not drift
                        </span>
                        .
                    </p>
                </div>
            </section>

            {/* Blog List Section */}
            <section id="blog" className="py-10 bg-brand-black">
                <SectionHeader label="INSIGHTS" title="Few words, Clear thoughts." />
                <BentoGrid onPostClick={handlePostClick} onViewArchive={handleArchiveClick} />
            </section>

            {/* Tech Stack Marquee */}
            <section className="py-20 md:py-32 bg-brand-black group cursor-default border-y border-white/5">
                <div className="flex justify-center mb-10 md:mb-16">
                    <span className="font-mono text-brand-orange group-hover:text-white transition-colors tracking-widest text-sm md:text-base">{`{ MY FOUNDATION }`}</span>
                </div>
                <div className="flex overflow-hidden w-full select-none mask-gradient">
                    <div className="flex shrink-0 items-center gap-8 md:gap-16 py-4 pr-8 md:pr-16 animate-loop-scroll [animation-play-state:paused] group-hover:[animation-play-state:running]">
                        {techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 hover:from-white/60 hover:to-white/20 transition-all duration-500 cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div
                        className="flex shrink-0 items-center gap-8 md:gap-16 py-4 pr-8 md:pr-16 animate-loop-scroll [animation-play-state:paused] group-hover:[animation-play-state:running]"
                        aria-hidden="true"
                    >
                        {techStack.map((tech, i) => (
                            <span
                                key={`clone-${i}`}
                                className="text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 hover:from-white/60 hover:to-white/20 transition-all duration-500 cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                id="contact"
                className="py-12 md:py-20 px-6 border-t border-white/10 bg-[#050505]"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight">
                            Reliable <br /> Connections.
                        </h2>
                        <div className="flex gap-3 md:gap-4">
                            <a
                                href="https://github.com/i2na"
                                className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-white"
                            >
                                <Icons.Github className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                            <a
                                href="#"
                                className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-brand-blue/20 hover:text-[#1DA1F2] transition-colors text-white"
                            >
                                <Icons.Twitter className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                            <a
                                href="#"
                                className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-brand-blue/20 hover:text-[#0A66C2] transition-colors text-white"
                            >
                                <Icons.Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                            <a
                                href="mailto:hello@yena.dev"
                                className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-brand-purple/20 hover:text-brand-purple transition-colors text-white"
                            >
                                <Icons.Mail className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                        </div>
                    </div>
                    <div className="text-right w-full md:w-auto">
                        <div className="flex flex-col gap-2 font-mono text-xs md:text-sm text-white/50 mb-6 md:mb-8">
                            <span>Seoul, KR</span>
                            <span>{new Date().getFullYear()} © Yena.Lee</span>
                        </div>
                        <p className="text-xs text-white/30 max-w-xs ml-auto">
                            Built with silence, focus, and reliability.
                        </p>
                    </div>
                </div>
            </footer>

            <ChatWidget />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPageContent />} />
                <Route path="/blog" element={<BlogArchive />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
