"use client";
import React from 'react';
import AIAssistantHero from './AIAssistantHero';
import PersonalChatbot from './PersonalChatbot';
import Footer from './Footer';

const AIAssistant = () => {
  return (
    <section className="ai-assistant-section" style={{ 
      minHeight: '100vh',
      background: 'transparent'
    }}>
      {/* AI Assistant Hero Section */}
      <AIAssistantHero />

      {/* Chatbot Section */}
      <PersonalChatbot />
      
      <Footer position="relative" />
    </section>
  );
};

export default AIAssistant;

