import './App.css'
import { motion } from "framer-motion"

function App() {
  return (
    <div className="container">

      {/* HERO */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="gradient-text">Yaswanth Mungara</h1>
        <p>Full Stack Developer | React | Java | DevOps</p>

        <div className="buttons">
          <a href="#projects">View Projects</a>
          <a href="mailto:iyaswanthm@gmail.com">Contact</a>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section 
        className="card"
        whileHover={{ scale: 1.03 }}
      >
        <h2>About Me</h2>
        <p>
          Passionate full stack developer with experience in React, Java,
          and DevOps tools like Jenkins and Tomcat. I enjoy building
          real-world applications and solving problems.
        </p>
      </motion.section>

      {/* PROJECTS */}
      <section id="projects">
        <h2>Projects</h2>

        <div className="grid">

          {[
            {title: "Job Portal", tech: "React + Java"},
            {title: "Music Streaming App", tech: "React + Java"},
            {title: "CI/CD Pipeline", tech: "Jenkins + Tomcat"},
            {title: "Lane Detection", tech: "Computer Vision"}
          ].map((p, i) => (
            <motion.div 
              className="card"
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3>{p.title}</h3>
              <p>{p.tech}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* SKILLS */}
      <motion.section 
        className="card"
        whileHover={{ scale: 1.03 }}
      >
        <h2>Skills</h2>
        <p>C | Java | Python | React | MySQL | Jenkins</p>
      </motion.section>

      {/* CONTACT */}
      <motion.section 
        className="card"
        whileHover={{ scale: 1.03 }}
      >
        <h2>Contact</h2>
        <p>Email: iyaswanthm@gmail.com</p>
        <p>Phone: 6300826599</p>
      </motion.section>

    </div>
  )
}

export default App