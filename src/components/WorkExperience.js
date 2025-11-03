"use client";
import React from 'react';

function WorkExperience() {
  return (
    <section id="work-experience" className="work-experience-section">
      <h2 className="work-experience-title">Work Experience</h2>
      <div className="work-experience-container">
        {/* <div className="work-experience-item">
          <div className="work-logo-column">
            <img src={require("../assets/socait_logo_symbol.png")} alt="Crunchyroll" className="work-logo" />
          </div>
          <div className="work-description-column">
            <h3>SOCAIT</h3>
            <p>Founder & CTO</p>
            <p className="work-details">Leading full-stack projects, around AI systems( LLM, RLHF) with Mobile/Web Apps.</p>
          </div>
        </div> */}
        {/* <div className="work-experience-item">
          <div className="work-logo-column">
            <img src={require("../assets/wargaming.png")} alt="Crunchyroll" className="work-logo" />
          </div>
          <div className="work-description-column">
            <h3>Wargaming</h3>
            <p>Research collaboration / Reinforcement Learning</p>
            <p className="work-details">Offline Reinforcement Learning in World of Tanks, Off-Policy Evaluation</p>
            <p className="work-details">2024-2025</p>

          </div>
        </div> */}
        <div className="work-experience-item">
          <div className="work-logo-column">
            <img src="/assets/ubitech.jpeg"alt="Pixstory" className="work-logo" />
          </div>
          <div className="work-description-column">
            <h3>Ubitech</h3>
            <p> Machine Learning Engineer</p>
            <p className="work-details">Developing AI for various EU-funded projects. Deploying components on Kubernetes and Cloud</p>
            <p className="work-details">2021- Now</p>

          </div>
        </div>

        <div className="work-experience-item">
          <div className="work-logo-column">
            <img src="/assets/ucy.png"alt="Pixstory" className="work-logo" />
          </div>
          <div className="work-description-column">
            <h3>University of Cyprus</h3>
            <p> Teaching Assistant</p>
            <p className="work-details">Teaching assistant for Computational Neuroscience master course.</p>
            <p className="work-details">2025</p>

          </div>
        </div>
        
        <div className="work-experience-item">
          <div className="work-logo-column">
            <img src="/assets/goldman.png" alt="Lumin.ai" className="work-logo" />
          </div>
          <div className="work-description-column">
            <h3>AC Goldman</h3>
            <p>Data Scientist Intern</p>
            <p className="work-details">Built XAI(LIME,Shap) Credit Scoring ML system.</p>
            <p className="work-details">2020</p>

          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkExperience;