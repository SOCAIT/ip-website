"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// styles imported globally in app/globals.css

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8BtJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//Z";

/**
 * Renders as a real anchor so the card is keyboard-reachable, middle-clickable
 * and crawlable. It used to be a <div> that called window.location.href, which
 * gave project links none of those things.
 */
const Card = ({ image, title, subtitle, href, external = false }) => {
  const body = (
    <>
      <Image
        src={image}
        alt=""
        className="card-image"
        width={600}
        height={400}
        loading="lazy"
        placeholder="blur"
        blurDataURL={BLUR}
      />
      <div className="card-overlay">
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle">{subtitle}</p>
      </div>
    </>
  );

  if (!href) {
    return <article className="card card-static">{body}</article>;
  }

  if (external) {
    return (
      <a className="card" href={href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return (
    <Link className="card" href={href}>
      {body}
    </Link>
  );
};

export default Card;
