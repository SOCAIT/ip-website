"use client";
import React from 'react';
// styles imported globally in app/globals.css

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Technical Skills</h2>
      <div className="skills-container">
      
        <div className="skills-item">
          <img src="/assets/development-code.png" alt="Programming Languages" className="skills-icon" />
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
            <p> Huggingface / Tensorflow / PyTorch / OpenCV / CUDA / TorchRL / NLTK / SpaCy / Langchain </p>
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
    </section>
  );
}

export default Skills;