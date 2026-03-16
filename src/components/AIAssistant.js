"use client";
import React from 'react';
import PersonalChatbot from './PersonalChatbot';
import Footer from './Footer';

const AIAssistant = () => {
  return (
    <section className="ai-assistant-section" style={{
      minHeight: '100vh',
      background: 'transparent',
      paddingTop: '5rem',
    }}>
      <PersonalChatbot />
      <Footer position="relative" />
    </section>
  );
};

export default AIAssistant;
