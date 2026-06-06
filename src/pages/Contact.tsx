export default function Contact() {
  return (
    <section>
      <div className="container contact-page">
        <h1>Get In Touch</h1>
        <p>
          I'm actively looking for my first role in software development. If
          you'd like to chat, feel free to reach out!
        </p>
        <div className="contact-links">
          <a href="mailto:ale_jablonski@hotmail.com" className="contact-item">
            <span className="contact-icon">&#9993;</span>
            ale_jablonski@hotmail.com
          </a>
          <a
            href="https://github.com/ale2502"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <span className="contact-icon">&#60;&#47;&#62;</span>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/alessandro-jablonski/"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <span className="contact-icon">&#9654;</span>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
