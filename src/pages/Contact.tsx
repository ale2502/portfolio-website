export default function Contact() {
  return (
    <section>
      <div className="container contact-page">
        <h1>Get In Touch</h1>
        <p>
          I'm actively looking for my first role in software development.
          If you'd like to chat, feel free to reach out!
        </p>
        <div className="contact-links">
          <a href="mailto:your.email@example.com" className="contact-item">
            <span className="contact-icon">&#9993;</span>
            your.email@example.com
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noreferrer" className="contact-item">
            <span className="contact-icon">&#60;&#47;&#62;</span>
            GitHub
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer" className="contact-item">
            <span className="contact-icon">&#9654;</span>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
