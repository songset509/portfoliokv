import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> training
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Foundation in Programming and DSA</h4>
                <h5>Lovely Professional University Bootcamp</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed structured training in arrays, linked lists, stacks,
              queues, trees, graphs, recursion, sorting, and searching with
              hands-on coding practice in C, C++, and Java.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analysis and Visualization Projects</h4>
                <h5>Academic and Personal Portfolio Work</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built projects focused on predictive analytics and social welfare
              beneficiary analysis using Python, Pandas, NumPy, Matplotlib, and
              Seaborn to generate practical, data-driven insights.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine Learning and Cloud Learning Track</h4>
                <h5>Continuous Upskilling</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Expanding capabilities in model evaluation, data pipelines,
              Tableau/Power BI dashboards, and cloud fundamentals with AWS and
              Azure to build deployment-ready data solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
