export default function Contact() {
  return (
    <section>
      <div className="container contact-page">
        <h1>Get In Touch</h1>
        <p>
          I'm actively looking for my first role in software development. If
          you'd like to chat, feel free to reach out!
        </p>
        <div className="contact-icon-row">
          <a
            href="mailto:ale_jablonski@hotmail.com"
            className="contact-icon-link"
            aria-label="Email"
          >
            <svg>
              <use href="/icons.svg#mail-icon" />
            </svg>
          </a>
          <a
            href="https://wa.me/64272540442"
            target="_blank"
            rel="noreferrer"
            className="contact-icon-link contact-icon-link--whatsapp"
            aria-label="WhatsApp"
          >
            <svg>
              <use href="/icons.svg#whatsapp-icon" />
            </svg>
          </a>
          <a
            href="https://github.com/ale2502"
            target="_blank"
            rel="noreferrer"
            className="contact-icon-link"
            aria-label="GitHub"
          >
            <svg>
              <use href="/icons.svg#github-icon" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/alessandro-jablonski/"
            target="_blank"
            rel="noreferrer"
            className="contact-icon-link contact-icon-link--linkedin"
            aria-label="LinkedIn"
          >
            <svg>
              <use href="/icons.svg#linkedin-icon" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@stacknfreedom"
            target="_blank"
            rel="noreferrer"
            className="contact-icon-link contact-icon-link--youtube"
            aria-label="YouTube"
          >
            <svg>
              <use href="/icons.svg#youtube-icon" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
