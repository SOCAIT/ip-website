"use client";
import React from 'react';
import Image from 'next/image';

const experiences = [
  {
    company: "Ubitech",
    role: "Machine Learning Engineer",
    detail: "AI for EU-funded projects. Deploying on Kubernetes & Cloud.",
    period: "2021 – Present",
    logo: "/assets/ubitech.jpeg",
  },
  {
    company: "Wargaming",
    role: "Research Collaboration / RL",
    detail: "Offline Reinforcement Learning in World of Tanks, Off-Policy Evaluation.",
    period: "2024 – 2025",
    logo: "/assets/wargaming.png",
  },
  {
    company: "University of Cyprus",
    role: "Teaching Assistant",
    detail: "Computational Neuroscience master course.",
    period: "2025",
    logo: "/assets/ucy.png",
  },
  {
    company: "AC Goldman",
    role: "Data Scientist Intern",
    detail: "XAI (LIME, SHAP) Credit Scoring ML system.",
    period: "2020",
    logo: "/assets/goldman.png",
  },
];

function WorkExperience() {
  return (
    <section id="work-experience" className="editorial-section">
      <h2 className="editorial-title">Experience</h2>
      <div className="experience-grid">
        {experiences.map((exp) => (
          <div key={exp.company + exp.period} className="experience-card">
            <div className="experience-card-top">
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="experience-logo"
                width={40}
                height={40}
                loading="lazy"
              />
              <span className="experience-period">{exp.period}</span>
            </div>
            <h3 className="experience-company">{exp.company}</h3>
            <p className="experience-role">{exp.role}</p>
            <p className="experience-detail">{exp.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkExperience;
