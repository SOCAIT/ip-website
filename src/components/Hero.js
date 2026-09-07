"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "./css/Hero.css";

// Left rail: what I am. Right rail: why you should believe it.
const ROLES = [
  { label: "ML Engineer" },
  { label: "Researcher", emphasis: true },
  { label: "Builder" },
];

const PROOF = [
  // { key: "5", rest: "peer-reviewed papers" },
  // { key: "Offline RL", rest: "@ Wargaming" },
  // { key: "MSc AI", rest: "8.94 / 10" },
];

function Hero() {
  return (
    <div className="hero-container">
      {/* Ghost background text */}
      <div className="hero-ghost-text" aria-hidden="true">
        <span>IP</span>
      </div>

      {/* Center photo — position, size and mask are deliberately untouched. */}
      <div className="hero-photo-area">
        <motion.div
          className="hero-photo-motion"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Image
            src="/ipastellas_hero.webp"
            alt="Ioannis Pastellas"
            width={600}
            height={800}
            priority
            className="hero-photo"
          />
        </motion.div>
      </div>

      {/* Keeps the bottom copy legible over the photo at any viewport height. */}
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-bottom">
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          IOANNIS PASTELLAS
        </motion.h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          I work on reinforcement learning and multi-agent systems. Research first, then I ship it.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="/portfolio" className="hero-cta-primary">
            See the work <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="/IoannisPastellas_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-secondary"
          >
            Download CV
          </a>
        </motion.div>

        {/*
          One set of DOM nodes for both layouts. `.hero-meta` is `display:
          contents` on desktop, so the two rails position absolutely against
          `.hero-container` and flank the photo. On narrow screens it becomes a
          flex row and they fall into normal flow under the buttons — the old
          layout hid the roles entirely below 480px.
        */}
        <div className="hero-meta">
          <div className="hero-rail hero-roles">
            {/* Outer element owns position, inner owns the transform — otherwise
                framer-motion's `x` overwrites a CSS centering transform. */}
            <motion.div
              className="hero-rail-inner"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="role-line" />
              <div className="role-list">
                {ROLES.map(({ label, emphasis }) => (
                  <span key={label}>{emphasis ? <strong>{label}</strong> : label}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="hero-rail hero-proof">
            <motion.div
              className="hero-rail-inner"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <span className="role-line" />
              <div className="role-list">
                {PROOF.map(({ key, rest }) => (
                  <span key={key}>
                    <strong>{key}</strong> {rest}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
