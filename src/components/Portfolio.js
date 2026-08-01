"use client";
import React from 'react';
import Card from './Card';
import Footer from './Footer';
import './css/Portfolio.css';

function Portfolio() {
  const projects = [
    {
      title: 'Semideus Learn',
      description: 'LLM - Mastra - Teach-back - Spaced Retrieval - Mastery Score',
      img: 'https://gfzoopjhqhxjomjtxsyy.supabase.co/storage/v1/object/public/article-images/gzx2zsrqdjg-1782996891993.png',
      link: 'https://learn.semideus.io/welcome',
      tags: ['EdTech', 'AI Agents', 'Full Stack']
    },
    {
      title: 'Adeept PiCar AI Control',
      description: 'Raspberry Pi - Computer Vision - LLM Agent - VLA Policy',
      img: '/assets/projects/orion_robotics.jpg',
      link: 'https://github.com/giannisp09/physical-ai-picar',
      tags: ['Robotics', 'Computer Vision', 'AI Agents']
    },
    // {
    //   title: 'SyntraFit - Fitness App',
    //   description: 'Agentic AI - LLM - Workout Generator',
    //   img: '/assets/projects/syntrafit_sm.gif',
    //   link: "https://apps.apple.com/cy/app/syntrafit/id6745785526",
    //   tags: ['AI', 'Mobile', 'Health Tech']
    // },
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
      img: '/assets/projects/tsp.webp',
      tags: ['Quantum Computing', 'Optimization']
    }
  ];

  return (
    <>
      <section id="projects" className="portfolio-section">
        <div className="portfolio-container">
          {/* <div className="portfolio-header">
            <h2 className="portfolio-title">Featured Projects</h2>
            <p className="portfolio-subtitle">
              A showcase of my work in AI, Machine Learning, and Software Engineering
            </p>
          </div> */}

          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div key={index} className="portfolio-item">
                <Card
                  image={project.img}
                  title={project.title}
                  subtitle={project.description}
                  link={project.link}
                />
                {project.tags && (
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer position={"relative"}/>
    </>
  );
}

export default Portfolio;
