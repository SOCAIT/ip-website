"use client";
import React from 'react';
import Image from 'next/image';

const skillGroups = [
  {
    title: "Programming Languages",
    items: "Python · Java · C · JavaScript",
    icon: "/assets/development-code.png",
  },
  {
    title: "Machine Learning",
    items: "Huggingface · TensorFlow · PyTorch · OpenCV · CUDA · TorchRL · NLTK · SpaCy · Langchain",
    icon: "/assets/ml.png",
  },
  {
    title: "Databases",
    items: "SQL · NoSQL · Hadoop · MongoDB · InfluxDB · ElasticSearch · Kafka",
    icon: "/assets/db.png",
  },
  {
    title: "Cloud Platforms",
    items: "Amazon Web Services (AWS) · Google Cloud Platform (GCP)",
    icon: "/assets/cloud.png",
  },
  {
    title: "Frameworks",
    items: "Docker · Kubernetes · Django · Flask · FastAPI · Metasploit",
    icon: "/assets/fw.png",
  },
  {
    title: "Frontend",
    items: "HTML · CSS · JavaScript · ReactJS · ReactNative · NodeJS · Bootstrap",
    icon: "/assets/front.png",
  },
];

const certifications = [
  {
    title: "Learning How to Learn",
    issuer: "Coursera / Deep Teaching Solutions",
    year: "2025",
    file: "/certifications/Coursera LearningHowToLearn.pdf",
  },
  {
    title: "NVIDIA AI Infrastructure & Operations",
    issuer: "Coursera / NVIDIA",
    year: "2025",
    file: "/certifications/Coursera NVIDIA AI Infrastructure and Operations Fundamentals.pdf",
  },
  {
    title: "DevOps, DataOps, MLOps",
    issuer: "Coursera / Duke University",
    year: "2024",
    file: "/certifications/Coursera Duke MLOps.pdf",
  },
  {
    title: "Fine-Tuning & RL for LLMs: Intro to Post-Training",
    issuer: "Deeplearning.ai / AMD",
    year: "2026",
    file: "/certifications/ft-and-rl-for-llms-intro-post-training.png",
  },
  {
    title: "Spec-Driven Development with Coding Agents",
    issuer: "DeepLearning.AI / JetBrains",
    year: "2026",
    file: "https://learn.deeplearning.ai/accomplishments/e3b44f75-c2e5-408a-b9fb-2f7b347eea36?usp=sharing",
  },
  {
    title: "Fast & Efficient LLM Inference with vLLM",
    issuer: "DeepLearning.AI / Red Hat",
    year: "2026",
    file: "https://learn.deeplearning.ai/accomplishments/ed42225a-1fef-4305-87eb-907ec87674ae?usp=sharing",
  },
];

function Skills() {
  return (
    <section id="skills" className="editorial-section">
      <h2 className="editorial-title">Skills &amp; Tools</h2>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.title} className="skill-card">
            <Image
              src={group.icon}
              alt={group.title}
              className="skill-icon"
              width={40}
              height={40}
              loading="lazy"
            />
            <h3 className="skill-card-title">{group.title}</h3>
            <p className="skill-card-items">{group.items}</p>
          </div>
        ))}
      </div>

      <div className="certs-section">
        <h3 className="certs-title">Certifications</h3>
        <div className="certs-list">
          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-row"
            >
              <span className="cert-year">{cert.year}</span>
              <div className="cert-info">
                <span className="cert-name">{cert.title}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
              <span className="cert-arrow">&#8599;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
