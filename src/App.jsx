import './App.css'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'

function ParticleCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let W, H, id
    const pts = []
    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 70; i++) {
      pts.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        r: Math.random() * 1 + 0.3,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        a: Math.random() * 0.35 + 0.08,
      })
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(230,48,48,' + p.a + ')'
        ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.strokeStyle = 'rgba(230,48,48,' + (0.04 * (1 - d / 110)) + ')'
            ctx.lineWidth = 0.5
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas id="particle-canvas" ref={ref} />
}

function SkillBar({ name, pct, delay }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-row">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div
          className={on ? 'skill-fill on' : 'skill-fill'}
          style={{ width: pct + '%', transitionDelay: (delay || 0) + 'ms' }}
        />
      </div>
    </div>
  )
}

function Reveal({ children, delay, className }) {
  const ref = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (delay || 0) + 'ms'
        e.target.classList.add('visible')
        io.disconnect()
      }
    }, { threshold: 0.08 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={'reveal ' + (className || '')}>
      {children}
    </div>
  )
}

function ProjectCard({ p, i }) {
  return (
    <a
      href={p.github}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-card"
    >
      <div className="proj-left">
        <div className="proj-num">{String(i + 1).padStart(2, '0')}</div>
        <div className="proj-name">{p.title}</div>
        <div className="proj-desc">{p.desc}</div>
        <div className="proj-tags">
          {p.tech.map(t => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="proj-arrow">&#8599;</div>
    </a>
  )
}

const projects = [
  {
    title: 'Job Portal',
    desc: 'Full-stack job portal enabling job listings and user applications. Integrated React frontend with Java backend for efficient data handling and responsive UI.',
    tech: ['React', 'Java', 'Spring Boot', 'MySQL', 'REST API'],
    github: 'https://github.com/MungaraYaswanth/JobPortal.git',
  },
  {
    title: 'Music Streaming App',
    desc: 'Music streaming platform with playback controls and playlist management. Focused on smooth UI/UX and performance optimization.',
    tech: ['React', 'Java', 'REST API', 'MySQL'],
    github: '#',
  },
  {
    title: 'Parcel Detection System',
    desc: 'Custom YOLOv8-based parcel detection system with real-time object detection using OpenCV and Ultralytics. Includes both Streamlit web and Tkinter GUI applications.',
    tech: ['Python', 'YOLOv8', 'OpenCV', 'Ultralytics', 'Streamlit', 'Tkinter'],
    github: '#',
  },
  {
    title: 'Lane Detection',
    desc: 'Advanced lane detection pipeline using OpenCV with gradient/color thresholding, perspective transformation, sliding window search, and polynomial lane fitting for real-time visualization.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
    github: '#',
  },0
]

const skillGroups = [
  {
    label: 'Programming Languages',
    items: [
      { name: 'Python', pct: 82 },
      { name: 'Java', pct: 80 },
      { name: 'JavaScript', pct: 78 },
      { name: 'C', pct: 70 },
    ],
  },
  {
    label: 'Frontend & Backend',
    items: [
      { name: 'React / Vite', pct: 84 },
      { name: 'HTML & CSS', pct: 88 },
      { name: 'Java Full Stack', pct: 80 },
      { name: 'MySQL', pct: 75 },
    ],
  },
  {
    label: 'AI / ML & Computer Vision',
    items: [
      { name: 'OpenCV', pct: 78 },
      { name: 'YOLOv8 / CNNs', pct: 74 },
      { name: 'Scikit-learn', pct: 70 },
      { name: 'ML / DL Concepts', pct: 72 },
    ],
  },
  {
    label: 'DevOps & Tools',
    items: [
      { name: 'Jenkins / CI-CD', pct: 70 },
      { name: 'Docker / GitHub', pct: 72 },
      { name: 'Apache Tomcat', pct: 68 },
      { name: 'Power BI / Excel', pct: 74 },
    ],
  },
]

const education = [
  {
    period: '2023 — Present',
    degree: 'B.Tech in Computer Science Engineering',
    specialisation: 'AI Systems with Visual Intelligence | Minor: Business Administration',
    inst: 'KL University',
    score: 'GPA: 8.46',
  },
  {
    period: '2021 — 2023',
    degree: 'Intermediate — MPC',
    specialisation: '',
    inst: 'Narayana Educational Institutions',
    score: '78.7%',
  },
  {
    period: '2020 — 2021',
    degree: '10th Grade — SSC',
    specialisation: '',
    inst: 'Narayana Olympiad School',
    score: '100%',
  },
]

const certs = [
  { name: 'Oracle Certified Professional — OCI Generative AI Professional', year: '2025' },
  { name: 'Salesforce AI Associate', year: '2024' },
  { name: 'Aviatrix Certified Engineer — Multicloud Network Associate', year: '2025' },
  { name: 'Scrum Fundamentals Certified — Software Engineering', year: '2025' },
]

export default function App() {
  const typedRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Yaswanth Mungara'],
      typeSpeed: 60,
      showCursor: true,
      cursorChar: '_',
    })
    return () => typed.destroy()
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <ParticleCanvas />

      <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="logo">YM<span>.</span></div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
          <a href="/resume.pdf" download className="nav-cta">Resume</a>
        </div>
      </nav>

      <section className="hero">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CSE · AI Systems with Visual Intelligence · Business Administration
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <span ref={typedRef} />
        </motion.h1>

        <motion.p
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <strong>Full Stack Developer</strong> &nbsp;·&nbsp; <strong>AI / ML Engineer</strong> &nbsp;·&nbsp; Computer Vision
        </motion.p>

        <motion.p
          className="hero-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          B.Tech CSE student at KL University with dual expertise in full-stack development and
          AI/ML systems. Experienced with CI/CD workflows, real-world web applications, and
          computer vision pipelines. Active leader in the University Centre of Innovation,
          Incubation and Entrepreneurship Student Body.
        </motion.p>

        <motion.div
          className="hero-pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
        >
          {['React', 'Java', 'Python', 'YOLOv8', 'OpenCV', 'Spring Boot', 'Docker', 'Jenkins', 'MySQL'].map(t => (
            <span key={t} className="pill">{t}</span>
          ))}
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
        >
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="/resume.pdf" download className="btn btn-ghost">Download Resume</a>
        </motion.div>

        <div className="scroll-hint">
          <div className="scroll-hint-line" />
          <span>scroll</span>
        </div>
      </section>

      <section id="about" className="wrapper">
        <Reveal>
          <div className="sec-label">About</div>
          <h2 className="sec-title">Who I am</h2>
        </Reveal>
        <Reveal delay={80} className="card">
          <div className="about-layout">
            <div className="about-body">
              <p>
                I am a <strong>Computer Science Engineering</strong> student at KL University,
                specialising in <strong>AI Systems with Visual Intelligence</strong> with a minor in
                Business Administration. My work spans full-stack web development and applied AI —
                building real systems, not just prototypes.
              </p>
              <p>
                On the development side I work with <strong>React, Java, Spring Boot and MySQL</strong>,
                deploying via Jenkins CI/CD pipelines and Apache Tomcat. On the AI side I build
                computer vision pipelines using <strong>YOLOv8, OpenCV and Python</strong> — including
                object detection and lane recognition systems.
              </p>
              <p>
                Beyond code, I am an active member of the <strong>University Centre of Innovation,
                Incubation and Entrepreneurship</strong> — driving academic events and hackathons.
                I hold four industry certifications including Oracle OCI and Salesforce AI.
              </p>
            </div>
            <div className="about-right">
              <div className="stat-row">
                {[
                  { n: '8.46', unit: '', label: 'GPA at KL University' },
                  { n: '4', unit: '+', label: 'Projects shipped' },
                  { n: '4', unit: '', label: 'Industry certifications' },
                  { n: '3', unit: '', label: 'Languages spoken' },
                ].map(s => (
                  <div className="stat-box" key={s.label}>
                    <div className="stat-n">{s.n}<em>{s.unit}</em></div>
                    <div className="stat-l">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="cert-list">
                {certs.map(c => (
                  <div className="cert-item" key={c.name}>
                    <div className="cert-dot" />
                    <span>{c.name}</span>
                    <span className="cert-year">{c.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="skills" className="wrapper">
        <Reveal>
          <div className="sec-label">Skills</div>
          <h2 className="sec-title">Technical expertise</h2>
        </Reveal>
        <Reveal delay={80} className="card">
          <div className="skills-grid">
            {skillGroups.map((g, gi) => (
              <div key={g.label}>
                <div className="skill-group-label">{g.label}</div>
                {g.items.map((s, si) => (
                  <SkillBar key={s.name} name={s.name} pct={s.pct} delay={gi * 80 + si * 60} />
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="projects" className="wrapper">
        <Reveal>
          <div className="sec-label">Projects</div>
          <h2 className="sec-title">Things I have built</h2>
        </Reveal>
        <div className="projects-stack">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <ProjectCard p={p} i={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="education" className="wrapper">
        <Reveal>
          <div className="sec-label">Education</div>
          <h2 className="sec-title">Academic background</h2>
        </Reveal>
        <Reveal delay={80} className="card">
          <div className="edu-timeline">
            {education.map((e, i) => (
              <div className="edu-item" key={i}>
                <div className="edu-period">{e.period}</div>
                <div className="edu-degree">{e.degree}</div>
                {e.specialisation ? (
                  <div className="edu-inst" style={{ fontSize: '12px', color: '#555555', marginBottom: '3px' }}>
                    {e.specialisation}
                  </div>
                ) : null}
                <div className="edu-inst">{e.inst}</div>
                <div className="edu-score">{e.score}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="contact" className="wrapper">
        <Reveal>
          <div className="sec-label">Contact</div>
          <h2 className="sec-title">Get in touch</h2>
        </Reveal>
        <Reveal delay={80} className="card">
          <div className="contact-layout">
            <div>
              <p className="contact-intro">
                Open to internships, full-time roles, research collaborations, and interesting
                projects. I respond promptly — feel free to reach out.
              </p>
              {[
                { ico: '✉', label: 'Email', val: 'iyaswanthm@gmail.com', href: 'mailto:iyaswanthm@gmail.com' },
                { ico: '☎', label: 'Phone', val: '+91 6300826599', href: 'tel:+916300826599' },
                { ico: '⚲', label: 'Location', val: 'Andhra Pradesh, India', href: '#' },
                { ico: '↗', label: 'LinkedIn', val: 'linkedin.com/in/yaswanthmungara', href: 'https://linkedin.com' },
              ].map(c => (
                <a href={c.href} key={c.label} className="contact-row" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <div className="contact-ico">{c.ico}</div>
                  <div>
                    <div className="contact-lbl">{c.label}</div>
                    <div className="contact-val">{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="location-card">
              <div className="loc-pulse" />
              <div className="loc-text">
                Andhra Pradesh, India<br />
                <span style={{ fontSize: '11px', color: '#2c2c2c' }}>Open to remote and relocation</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <span className="footer-l">Yaswanth Mungara — CSE, KL University</span>
        <a href="#" className="footer-r">Back to top</a>
      </footer>
    </>
  )
}