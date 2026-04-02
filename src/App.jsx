import './App.css'
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import Typed from "typed.js"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

function App() {

  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Yaswanth Mungara"],
      typeSpeed: 80,
      showCursor: false
    })

    return () => typed.destroy()
  }, [])

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  // CURSOR GLOW FIX
  useEffect(() => {
    const cursor = document.querySelector(".cursor")

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })
  }, [])

  const projects = [
    { title: "Job Portal", tech: "React + Java", github: "https://github.com/MungaraYaswanth/JobPortal.git" },
    { title: "Music Streaming App", tech: "React + Java", github: "#" },
    { title: "Parcel Detection", tech: "Object Detection", github: "#" },
    { title: "Lane Detection", tech: "Computer Vision", github: "#" }
  ]

  return (
    <div>

      {/* CURSOR */}
      <div className="cursor"></div>

      {/* PARTICLES */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#000" },
          particles: {
            number: { value: 30 },
            size: { value: 2 },
            move: { speed: 1 },
            links: { enable: true, color: "#ff0000" }
          }
        }}
      />

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>Yaswanth</h2>
        <div>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="container">

        {/* HERO */}
        <motion.section 
          className="hero"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 ref={el}></h1>
          <p>Full Stack Developer | React | Java | DevOps</p>

          <div className="buttons">
            <a href="#projects">View Projects</a>
            <a href="/resume.pdf" download>Download Resume</a>
          </div>
        </motion.section>

        {/* ABOUT */}
        <motion.section 
          id="about"
          className="card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>About Me</h2>
          <p>
            Passionate full stack developer with experience in React, Java,
            and DevOps tools like Jenkins and Tomcat.
          </p>
        </motion.section>

        {/* PROJECTS */}
        <section id="projects">
          <h2>Projects</h2>

          <div className="grid">

            {projects.map((p, i) => (
              <motion.a 
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card project-card"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              >
                <h3>{p.title}</h3>
                <p>{p.tech}</p>
              </motion.a>
            ))}

          </div>
        </section>

        {/* CONTACT */}
        <motion.section 
          id="contact"
          className="card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <h2>Contact</h2>
          <p>Email: iyaswanthm@gmail.com</p>
          <p>Phone: +91 6300826599</p>
          <p>Location: Vijayawada, Andhra Pradesh, India</p>
        </motion.section>

      </div>
    </div>
  )
}

export default App