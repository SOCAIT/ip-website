"use client";
import React from 'react';
// styles imported globally in app/globals.css

const certifications = [
  {
    title: "Learning How to Learn: Powerful mental tools to help you master tough subjects",
    issuer: "Deep Tech Solutions",
    year: "2025",
    description:
      "Proven techniques for efficient learning, memory, and mindset development.",
    pdf: "/certifications/Coursera LearningHowToLearn.pdf",
  },
  {
    title: "NVIDIA AI Infrastructure & Operations Fundamentals",
    issuer: "Coursera / NVIDIA",
    year: "2025",
    description:
      "Foundational skills in building and operating AI infrastructure on modern platforms.",
    pdf: "/certifications/Coursera NVIDIA AI Infrastructure and Operations Fundamentals.pdf",
  },
  {
    title: "DevOps, DataOps, MLOps",
    issuer: "Coursera / Duke University",
    year: "2024",
    description:
      "Best practices for deploying, monitoring, and scaling production ML systems.",
    pdf: "/certifications/Coursera Duke MLOps.pdf",
  },
];

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Technical Skills</h2>
      <div className="skills-container">
        <div className="skills-item">
          <img
            src="/assets/development-code.png"
            alt="Programming Languages"
            className="skills-icon"
          />
          <div className="skills-description">
            <h3>Programming Languages</h3>
            <hr />
            <p>Python / Java / C / Javascript </p>
          </div>
        </div>

        <div className="skills-item">
          <img src="/assets/ml.png" alt="Machine Learning" className="skills-icon" />
          <div className="skills-description">
            <h3>Machine Learning</h3>
            <hr />
            <p>
              Huggingface / Tensorflow / PyTorch / OpenCV / CUDA / TorchRL / NLTK /
              SpaCy / Langchain
            </p>
          </div>
        </div>

        <div className="skills-item">
          <img src="/assets/db.png" alt="Databases" className="skills-icon" />
          <div className="skills-description">
            <h3>Databases</h3>
            <hr />
            <p>SQL / NoSQL / Hadoop / MongoDB / InfluxDB / ElasticSearch / Kafka </p>
          </div>
        </div>
        <div className="skills-item">
          <img src="/assets/cloud.png" alt="Cloud Platforms" className="skills-icon" />
          <div className="skills-description">
            <h3>Cloud Platforms</h3>
            <hr />
            <p>Amazon Web Services (AWS) / Google Cloud Platform (GCP) </p>
          </div>
        </div>
        <div className="skills-item">
          <img src="/assets/fw.png" alt="Frameworks" className="skills-icon" />
          <div className="skills-description">
            <h3>Frameworks</h3>
            <hr />
            <p>Docker / Kubernetes / Django / Flask / FastAPI / Metasploit</p>
          </div>
        </div>
        <div className="skills-item">
          <img src="/assets/front.png" alt="Frontend" className="skills-icon" />
          <div className="skills-description">
            <h3>Frontend</h3>
            <hr />
            <p>HTML / CSS / Javascript / ReactJS / ReactNative / NodeJS / Bootstrap </p>
          </div>
        </div>
      </div>

      <div className="certifications-block">
        <h3 className="certifications-title">Coursera Certifications</h3>
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <article key={cert.title} className="cert-card">
              <div className="cert-card-header">
                <span className="cert-card-year">{cert.year}</span>
                <h4>{cert.title}</h4>
              </div>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-description">{cert.description}</p>
              <a
                className="cert-link"
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 View Certificate
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;