import "./styles/PracticePlatforms.css";

type Platform = {
  name: string;
  username: string;
  solved: string;
  rating: string;
  streak: string;
  highlight: string;
  focus: string;
};

const platforms: Platform[] = [
  {
    name: "LeetCode",
    username: "karnvendrasingh",
    solved: "100+",
    rating: "Top 20% (contest)",
    streak: "45 days",
    highlight: "DSA + interview-style problems",
    focus: "Arrays, Graphs, DP, Binary Search",
  },
  {
    name: "GeeksforGeeks",
    username: "Karnvendra Singh",
    solved: "30+",
    rating: "Institute rank improving",
    streak: "30 days",
    highlight: "Topic-wise coding practice",
    focus: "Core CS, problem playlists, quizzes",
  },
  {
    name: "CodeChef",
    username: "karnvendrasing",
    solved: "50+",
    rating: "2★",
    streak: "Regular contests",
    highlight: "Contest and rating growth",
    focus: "Long Challenge, Starters, Div contests",
  },
  {
    name: "HackerRank",
    username: "Karnvendrasingh",
    solved: "100+",
    rating: "5★ in Problem Solving",
    streak: "Weekly practice",
    highlight: "Skill certification + role tracks",
    focus: "SQL, Python, Problem Solving",
  },
];

const quickSummary = [
  { label: "Total Problems Solved", value: "150+" },
  { label: "Primary Focus", value: "DSA + SQL + Python" },
  { label: "Contest Platforms", value: "LeetCode + CodeChef" },
  { label: "Learning Approach", value: "Daily consistency" },
];

const PracticePlatforms = () => {
  return (
    <section className="practice-section" id="practice">
      <div className="practice-container section-container">
        <h2>
          Coding <span>Practice</span>
        </h2>
        <p className="practice-intro">
          Snapshot of my coding practice journey. This section is intentionally
          self-contained so recruiters can quickly assess my consistency and
          problem-solving depth without opening external links.
        </p>

        <div className="practice-summary-grid">
          {quickSummary.map((item) => (
            <div className="practice-summary-card" key={item.label}>
              <p>{item.label}</p>
              <h4>{item.value}</h4>
            </div>
          ))}
        </div>

        <div className="practice-grid">
          {platforms.map((platform) => (
            <article className="practice-card" key={platform.name}>
              <div className="practice-head">
                <h3>{platform.name}</h3>
                <span className="practice-rating">{platform.rating}</span>
              </div>

              <p className="practice-user">@{platform.username}</p>

              <div className="practice-stats">
                <div>
                  <p>Problems Solved</p>
                  <h4>{platform.solved}</h4>
                </div>
                <div>
                  <p>Consistency</p>
                  <h4>{platform.streak}</h4>
                </div>
              </div>

              <div className="practice-meta">
                <p>
                  <span>Highlight:</span> {platform.highlight}
                </p>
                <p>
                  <span>Focus:</span> {platform.focus}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticePlatforms;
