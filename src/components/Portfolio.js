"use client";
import React from 'react';
import Card from './Card';
import Footer from './Footer';
import './css/Portfolio.css';

function Portfolio() {
  const projects = [
    {
      title: 'SyntraFit - Fitness App',
      description: 'Agentic AI - LLM - Workout Generator',
      img: '/assets/projects/syntrafit_sm.gif',
      link: "https://apps.apple.com/cy/app/syntrafit/id6745785526",
      tags: ['AI', 'Mobile', 'Health Tech']
    },
    {
      title: 'Tweet Sentiment Financial Analysis and Generation',
      description: 'NLP - Time Series Analysis - Stock Market - GPT',
      img: '/assets/projects/twitter_stock.jpeg',
      link: "https://github.com/giannisp09/NLP623-Team-6",
      tags: ['NLP', 'FinTech', 'ML']
    },
    {
      title: 'Offline Reinforcement Learning in World of Tanks (MSc Thesis)',
      description: 'TorchRL - PyTorch - NVIDIA',
      img: '/assets/projects/wot.png',
      tags: ['RL', 'Deep Learning', 'Gaming']
    },
    {
      title: 'Object Detection and Explainability using Drone Vision',
      description: 'YOLO - XAI - Real Time Detection',
      img: '/assets/projects/drone.jpeg',
      link: "https://www.cygnus-project.eu/images/publications/2024_Adversarial-Explanations-for-Informed-Civilian.pdf",
      tags: ['Computer Vision', 'XAI', 'Drones']
    },
    {
      title: 'QAOA (Quantum Optimization) of Traveling Salesman Problem (BSc Thesis)',
      description: 'Python3 - Qiskit',
      img: '/assets/projects/tsp.png',
      tags: ['Quantum Computing', 'Optimization']
    }
  ];

  return (
    <>
      <section id="projects" className="portfolio-section">
        <div className="portfolio-container">
          {/* Decorative background elements */}
          <div className="portfolio-bg-decoration"></div>
          
          {/* Header */}
          <div className="portfolio-header">
            <div className="portfolio-icon-wrapper">
              <span className="portfolio-icon">🚀</span>
            </div>
            <h2 className="portfolio-title">
              Featured Projects
            </h2>
            <p className="portfolio-subtitle">
              A showcase of my work in AI, Machine Learning, and Software Engineering
            </p>
          </div>

          {/* Projects Grid */}
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="portfolio-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card
                  image={project.img}
                  title={project.title}
                  subtitle={project.description}
                  link={project.link}
                  tags={project.tags}
                />
                {project.tags && (
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View More Section */}
          <div className="portfolio-view-more">
            <button className="view-more-btn" onClick={() => window.location.href = '#contact'}>
              <span className="btn-text">Interested in collaboration?</span>
              <span className="btn-icon">💬</span>
            </button>
            <p className="view-more-note">Let&apos;s discuss your next project</p>
          </div>
        </div>
      </section>
      <Footer position={"relative"}/>
    </>
  );
}

export default Portfolio;