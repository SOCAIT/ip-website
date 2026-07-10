"use client";
import React from 'react';
import './css/Publications.css';

const publications = [
  {
    title: "Multi-Agent System for Automated Red Teaming Workflows: Methodology and Architecture",
    venue: "Manuscript PDF",
    year: "2026",
    link: "/publications/multi-agent-system-automated-red-teaming-workflows.pdf",
    authors: "I. Pastellas, S. Karagiorgou, E. Kafantaris"
  },
  {
    title: "Adaptive Policy-Driven Network Intelligence for Edge-to-Cloud Continuum",
    venue: "31st ICE IEEE/ITMC Conference (Valencia, Spain)",
    year: "2025",
    link: "https://orcid.org/0009-0008-2648-7910",
    authors: "I. Pastellas, S. Karagiorgou, M. Konidi"
  },
  {
    title: "Explanation-Driven Adversarial Attacks against Multimedia Edge Applications",
    venue: "6th International Conference in EEITE, Greece",
    year: "2025",
    link: "https://www.cygnus-project.eu/images/publications/Explanation_Driven_Adversarial_Attacks_against_Multimedia_Edge_Applications_1.pdf",
    authors: "T. Anastasiou, I. Pastellas, S. Karagiorgou, M. Konidi"
  },
  {
    title: "Adversarial Explanations for Informed Civilian and Environmental Protection",
    venue: "IEEE International Conference on Big Data (pp. 2672-2681)",
    year: "2024",
    link: "https://www.cygnus-project.eu/images/publications/2024_Adversarial-Explanations-for-Informed-Civilian.pdf",
    authors: "T. Anastasiou, I. Pastellas, S. Karagiorgou"
  },
  {
    title: "AI-fuelled Dimensioning and Optimal Resource Allocation of 5G/6G Wireless Communication Networks",
    venue: "IEEE MeditCom (pp. 413-418)",
    year: "2024",
    link: "https://ieeexplore.ieee.org/document/10635639",
    authors: "P. Papaioannou, I. Pastellas, C. Tranoris, S. Karagiorgou, S. Denazis"
  }
];

function Publications() {
  return (
    <section id="publications" className="editorial-section">
      <h2 className="editorial-title">Publications</h2>
      <div className="publications-list">
        {publications.map((pub, index) => (
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="publication-row"
            key={index}
          >
            <span className="pub-year">{pub.year}</span>
            <div className="pub-info">
              <h3 className="pub-title">{pub.title}</h3>
              <p className="pub-venue">{pub.venue}</p>
              <p className="pub-authors">{pub.authors}</p>
            </div>
            <span className="pub-arrow">&#8599;</span>
          </a>
        ))}
      </div>

      <div className="orcid-container">
        <a
          href="https://orcid.org/0000-0002-1193-6280"
          target="_blank"
          rel="noopener noreferrer"
          className="orcid-link"
        >
          <img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID" className="orcid-logo" />
          View full profile on ORCID
        </a>
      </div>
    </section>
  );
}

export default Publications;
