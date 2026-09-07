"use client";
import React from 'react';
import Card from './Card';
import Footer from './Footer';
import { projects, projectHref } from '@/content/projects';
import './css/Portfolio.css';

function Portfolio() {
  return (
    <>
      <section id="projects" className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-header">
            <h1 className="portfolio-title">Selected Work</h1>
            <p className="portfolio-subtitle">
              Research and shipped work in reinforcement learning, agent systems, and applied ML.
            </p>
          </div>

          <div className="portfolio-grid">
            {projects.map((project) => {
              const href = projectHref(project);
              const isCaseStudy = Array.isArray(project.blocks);

              return (
                <div key={project.slug} className="portfolio-item">
                  <Card
                    image={project.image}
                    title={project.title}
                    subtitle={project.blurb}
                    href={href}
                    external={!isCaseStudy && Boolean(href)}
                  />

                  <div className="project-tags">
                    {project.tags?.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>

                  {isCaseStudy && (
                    <span className="project-badge" aria-hidden="true">Case study</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer position={"relative"} />
    </>
  );
}

export default Portfolio;
