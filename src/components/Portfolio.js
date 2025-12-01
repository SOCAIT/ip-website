"use client";
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Card from './Card';
import CustomCard from './CustomCard';
import Footer from './Footer';

function Portfolio() {
  return (
    <section id="projects" className="p-5 text-center">
      <Container>
        <h2 className="text-center mb-5" style={{color:'white'}}> Some Projects</h2>
        <Row className="justify-content-center">
          {[{
            title: 'SyntraFit - Fitness App',
            description: 'Agentic AI - LLM - Workout Generator',
            img: '/assets/projects/syntrafit_sm.gif',
            link:"https://apps.apple.com/cy/app/syntrafit/id6745785526"
          },
          {
            title: 'Tweet Sentiment Finacial Analysis and Generation',
            description: 'NLP - Time Series Analysis - Stock Market - GPT',
            img: '/assets/projects/twitter_stock.jpeg',
            link: "https://github.com/giannisp09/NLP623-Team-6",

          }, {
            title: 'Offline Reinforcement Learing in World of Tanks (MSc Thesis)',
            description: 'TorchRL - PyTorch - NVIDIA',
            img: '/assets/projects/wot.png',
          }, {
            title: 'Object detection and Explainability using Drone Vision',
            description: 'YOLO - XAI - Real Time Detection',
            img: '/assets/projects/drone.jpeg',
            link: "https://www.cygnus-project.eu/images/publications/2024_Adversarial-Explanations-for-Informed-Civilian.pdf",
          }, {
            title: 'QAOA (Quantum Optimization) of Traveling Salesman Problem (BSc Thesis)',
            description: 'Python3 - Qiskit',
            img: '/assets/projects/tsp.png',
          }].map((project, index) => (
            <Col    xs={12} sm={6} md={6} lg={6} className="mb-4" key={index}>
              {/* <CustomCard title={project.title} description={project.description} img={project.img} /> */}
              <Card
                 image={project.img}
                 title={project.title}
                 subtitle={project.description}
                 link={project.link}
              />
            </Col>
          ))}
        </Row>
        <div className="view-all">
        <Button variant="dark" href="#" className="m-2" style={{ fontSize: '1.5rem' }}>
            View More
          </Button>          {/* <a href="#" className="view-all-link">VIEW ALL</a> */}
        </div>
      </Container>
      <Footer position={"relative"}/>

    </section>
  );
}

export default Portfolio;