import Reveal from "./Reveal";

const CERTIFICATES = [
  {
    title: "Anvil Hackathon",
    issuer: "Scaler School of Technology",
    category: "Hackathon · 2026",
    description: "Recognised for innovation, technical problem-solving and collaboration at the Anvil Hackathon during Ascent 2026.",
    image: "anvil-hackathon.png",
  },
  {
    title: "Young Innovator Internship Challenge",
    issuer: "Scaler School of Technology",
    category: "Certificate of excellence",
    description: "Awarded for outstanding performance and commitment throughout Scaler’s five-week Young Innovator Internship Challenge.",
    image: "scaler-young-innovator.png",
  },
  {
    title: "Computer Science — Bronze Medal",
    issuer: "International Coding Olympiad",
    category: "Achievement · 2026",
    description: "Earned a bronze medal in the Computer Science category at the International Coding Olympiad in February 2026.",
    image: "coding-olympiad-bronze.jpg",
  },
  {
    title: "AI Prompt Lab — Silver Medal",
    issuer: "International Coding Olympiad",
    category: "Achievement · 2025",
    description: "Earned a silver medal in the AI Prompt Lab category at the fifth International Coding Olympiad in November 2025.",
    image: "coding-olympiad-silver.jpg",
  },
  {
    title: "5-Day AI Agents Intensive",
    issuer: "Google & Kaggle",
    category: "Course completion · 2025",
    description: "Earned the course badge for completing Google and Kaggle’s five-day intensive on AI agents.",
    image: "google-ai-agents.png",
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. · Forage",
    category: "Job simulation · 2026",
    description: "Completed practical software engineering tasks covering project setup, Kafka, H2 databases and REST API integration.",
    image: "jpmorgan-software-engineering.jpg",
  },
  {
    title: "AI Workshop",
    issuer: "Newton School of Technology",
    category: "Headstart Bootcamp · 2026",
    description: "Successfully completed the AI Workshop as part of Newton School of Technology’s Headstart Bootcamp 2026.",
    image: "headstart-ai-workshop.jpg",
  },
  {
    title: "Robotics Workshop",
    issuer: "Newton School of Technology",
    category: "Headstart Bootcamp · 2026",
    description: "Successfully completed the Robotics Workshop as part of Newton School of Technology’s Headstart Bootcamp 2026.",
    image: "headstart-robotics-workshop.jpg",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="section" aria-labelledby="certificates-title">
      <div className="container">
        <Reveal>
          <div className="certificates-heading">
            <div>
              <p className="label-mono" style={{ marginBottom: 20 }}>( 05 ) — Certificates</p>
              <h2 id="certificates-title" className="display">Always learning</h2>
            </div>
            <p className="body-text">Courses, competitions and hands-on learning along the way.</p>
          </div>
        </Reveal>

        <div className="certificates-grid">
          {CERTIFICATES.map((certificate) => (
            <Reveal key={certificate.image}>
              <article className="certificate-card">
                <a
                  className="certificate-preview"
                  href={`${import.meta.env.BASE_URL}certificates/${certificate.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${certificate.title} certificate (opens in a new tab)`}
                  data-cursor
                  data-cursor-label="VIEW"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}certificates/${certificate.image}`}
                    alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                  />
                  <span className="certificate-preview__label">View certificate</span>
                </a>
                <div className="certificate-copy">
                  <p className="certificate-category">{certificate.category}</p>
                  <h3>{certificate.title}</h3>
                  <p className="certificate-issuer">{certificate.issuer}</p>
                  <p className="body-text">{certificate.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
