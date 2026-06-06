const skills = [
  'JavaScript', 'TypeScript', 'React', 'HTML', 'CSS',
  'Node.js', 'SQLite', 'Git', 'TDD', 'Pair Programming',
]

export default function About() {
  return (
    <section>
      <div className="container">
        <h1>About Me</h1>
        <div className="about-content">
          <p>
            I'm a junior software developer who recently graduated from{' '}
            <strong>Dev Academy Aotearoa</strong> in New Zealand. I've built a
            solid foundation in full-stack web development and I'm excited to
            launch my career in tech.
          </p>
          <p>
            During the bootcamp I learned to build applications using{' '}
            <strong>JavaScript, TypeScript, and React</strong>, working both
            independently and in teams. I'm comfortable with Git, test-driven
            development, and the day-to-day workflows of a professional dev team.
          </p>
        </div>

        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
