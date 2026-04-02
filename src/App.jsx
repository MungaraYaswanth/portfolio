import './App.css'

function App() {
  return (
    <div className="container">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Yaswanth Mungara</h1>
        <p>Full Stack Developer | React | Java | DevOps</p>

        <div className="buttons">
          <a href="#projects">View Projects</a>
          <a href="mailto:iyaswanthm@gmail.com">Contact Me</a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="card">
        <h2>About Me</h2>
        <p>
          I am a B.Tech student at KL University with strong interest in full stack development.
          I have built projects using React and Java and also worked with DevOps tools like Jenkins and Tomcat.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <h2>Projects</h2>

        <div className="grid">

          <div className="card">
            <h3>Job Portal</h3>
            <p>React + Vite + Java + MySQL</p>
            <a href="https://github.com/MungaraYaswanth/JobPortal" target="_blank">GitHub</a>
          </div>

          <div className="card">
            <h3>Music Streaming App</h3>
            <p>React + Java</p>
            <a href="https://github.com/YOUR_USERNAME/music-app" target="_blank">GitHub</a>
          </div>

          <div className="card">
            <h3>CI/CD Pipeline</h3>
            <p>Jenkins + Tomcat</p>
            <a href="#">GitHub</a>
          </div>

          <div className="card">
            <h3>Lane Detection</h3>
            <p>Computer Vision</p>
            <a href="#">GitHub</a>
          </div>

        </div>
      </section>

      {/* SKILLS */}
      <section className="card">
        <h2>Skills</h2>
        <p>
          C | Java | Python (Basics) | JavaScript | React | MySQL | Jenkins | Tomcat
        </p>
      </section>

      {/* CONTACT */}
      <section className="card">
        <h2>Contact</h2>
        <p>Email: iyaswanthm@gmail.com</p>
        <p>Phone: 6300826599</p>
      </section>

    </div>
  )
}

export default App