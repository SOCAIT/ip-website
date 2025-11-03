"use client";
import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function ProjectCard({imgUrl, title, desc, onClick}) {

  const handleClick = onClick;
  return (
    <Card
    
    >
    <Card.Img variant="top" src={imgUrl}  height={220} width={200} />
    <Card.Body>
      <Card.Title> {title}</Card.Title>
      <Card.Text>{desc}</Card.Text>
      <Button variant="dark" onClick={handleClick}> Details</Button>
    </Card.Body>
  </Card>
  )
}

export default ProjectCard