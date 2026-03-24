import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const createProjectTileImage = (title: string) => {
  const words = title.split(" ");
  const lines: string[] = [];

  for (let i = 0; i < words.length; i += 3) {
    lines.push(words.slice(i, i + 3).join(" "));
  }

  const textLines = lines
    .slice(0, 3)
    .map(
      (line, index) =>
        `<tspan x="50%" dy="${index === 0 ? "0" : "1.4em"}">${line}</tspan>`
    )
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1f2937"/>
          <stop offset="100%" stop-color="#0ea5e9"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)"/>
      <circle cx="1040" cy="120" r="220" fill="rgba(255,255,255,0.1)"/>
      <circle cx="160" cy="700" r="260" fill="rgba(255,255,255,0.08)"/>
      <text
        x="50%"
        y="44%"
        text-anchor="middle"
        fill="#ffffff"
        font-size="58"
        font-family="Arial, sans-serif"
        font-weight="700"
      >
        ${textLines}
      </text>
      <text
        x="50%"
        y="72%"
        text-anchor="middle"
        fill="rgba(255,255,255,0.85)"
        font-size="30"
        font-family="Arial, sans-serif"
      >
        Project Showcase
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const projects = [
  {
    title: "Predictive Analytics and Data Modeling",
    category: "Machine Learning Project",
    tools: "Python, Pandas, NumPy, Scikit-learn, Matplotlib",
    image: createProjectTileImage("Predictive Analytics and Data Modeling"),
  },
  {
    title: "Social Welfare Beneficiary Analysis",
    category: "Data Analysis and Visualization",
    tools: "Python, Seaborn, Matplotlib, IQR Outlier Detection",
    image: createProjectTileImage("Social Welfare Beneficiary Analysis"),
  },
  {
    title: "Multi-country Data Normalization Pipeline",
    category: "Data Engineering and ETL Concepts",
    tools: "Python, SQL, Data Cleaning, Standardization",
    image: createProjectTileImage("Multi-country Data Normalization Pipeline"),
  },
  {
    title: "Interactive BI Reporting Dashboard",
    category: "Business Intelligence",
    tools: "Power BI, Excel, SQL, Data Storytelling",
    image: createProjectTileImage("Interactive BI Reporting Dashboard"),
  },
  {
    title: "Cloud-ready Data Workflow",
    category: "Deployment and Tooling",
    tools: "Docker, AWS EC2/S3 Basics, Linux, GitHub",
    image: createProjectTileImage("Cloud-ready Data Workflow"),
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
