"use client";
import React from "react";

export default function InteractiveLink({ href, children, style, hoverStyle, ...props }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyle = {
    ...style,
    ...(isHovered && hoverStyle ? hoverStyle : {})
  };

  return (
    <a
      href={href}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </a>
  );
}

