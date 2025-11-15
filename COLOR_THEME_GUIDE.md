# 🎨 Color Theme Consistency Guide

## Overview
Your website now has a **unified, elegant color theme** across all pages using CSS variables for easy maintenance and consistency.

---

## 🎨 Color Palette

### CSS Variables (Defined in `globals.css`)

```css
:root {
  /* Gradients */
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  
  /* Background Colors */
  --dark-bg: #0f0f23;
  --dark-secondary: #1a1a2e;
  --dark-tertiary: #16213e;
  
  /* Glass Effect */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  
  /* Text Colors */
  --text-primary: #ffffff;
  --text-secondary: #b8b8d1;
  
  /* Accent Colors */
  --accent-purple: #9d7ff5;
  --accent-blue: #4facfe;
  --accent-pink: #f093fb;
}
```

---

## 📐 Usage Guidelines

### 1. **Page Backgrounds**
All pages use the same gradient background:
```css
background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
```

### 2. **Page Titles**
All major headings use the gradient text effect:
```css
fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
fontWeight: '600',
background: 'linear-gradient(135deg, #ffffff 0%, #9d7ff5 50%, #4facfe 100%)',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
backgroundClip: 'text',
fontFamily: 'Playfair Display, serif'
```

**Used on:**
- ✅ Homepage: "Ioannis Pastellas"
- ✅ About Page: "About Me"
- ✅ Portfolio Page: "Some Projects"
- ✅ Articles Page: "📚 Articles"
- ✅ Info Page: "Get In Touch"

### 3. **Typography**

**Headings:**
- Font: `Playfair Display, serif`
- Purpose: Elegant, sophisticated titles
- Usage: All H1, H2, major headings

**Body Text:**
- Font: `Inter, sans-serif`
- Purpose: Clean, readable body content
- Usage: Paragraphs, descriptions, labels

**Text Colors:**
- Primary: `var(--text-primary)` - White (#ffffff) for main text
- Secondary: `var(--text-secondary)` - Light gray (#b8b8d1) for descriptions

### 4. **Cards & Components**

**Glassmorphism Effect** (used everywhere):
```css
background: var(--glass-bg);
backdrop-filter: blur(20px);
border: 1px solid var(--glass-border);
border-radius: 20px;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
```

**Hover States:**
```css
transform: translateY(-10px);
border-color: var(--accent-purple); /* or blue/pink */
box-shadow: 0 15px 50px rgba(157, 127, 245, 0.4);
```

### 5. **Interactive Elements**

**Buttons:**
```css
background: var(--glass-bg);
backdrop-filter: blur(20px);
border: 1px solid var(--glass-border);
border-radius: 15px;
transition: all 0.3s ease;
```

**Links:**
```css
color: var(--accent-purple);
text-decoration: none;
font-weight: 600;
transition: all 0.3s ease;
```

On hover:
```css
color: var(--accent-blue);
```

---

## 🎯 Page-by-Page Consistency

### Homepage (`Home.js`)
- ✅ Gradient title
- ✅ Glass-effect cards for Work Experience & Education
- ✅ Purple/pink accent colors
- ✅ Particle background with theme colors

### About Page (`About.js`)
- ✅ Gradient title: "About Me"
- ✅ Text color: `var(--text-secondary)`
- ✅ Glass-effect CV link box
- ✅ Purple accent links

### Portfolio Page (`Portfolio.js`)
- ✅ Gradient title: "Some Projects"
- ✅ Glass-effect project cards
- ✅ Blue accent hover effects
- ✅ Consistent button styling

### Articles Page (`articles/page.js`)
- ✅ Gradient title: "📚 Articles"
- ✅ Glass-effect article cards
- ✅ Purple accent for titles
- ✅ Blue accent for metadata
- ✅ Consistent hover effects

### Info/Contact Page (`Info.js`)
- ✅ Gradient title: "Get In Touch"
- ✅ Glass-effect social buttons
- ✅ Each button has unique accent color (blue/purple/pink)
- ✅ Glass-effect contact form
- ✅ Gradient submit button

---

## 🔧 Quick Reference: Common Patterns

### Pattern 1: Section Container
```jsx
<section style={{
  minHeight: '100vh',
  background: 'transparent',
  padding: '80px 0'
}}>
```

### Pattern 2: Section Title
```jsx
<h2 style={{
  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
  fontWeight: '600',
  background: 'linear-gradient(135deg, #ffffff 0%, #9d7ff5 50%, #4facfe 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontFamily: 'Playfair Display, serif',
  marginBottom: '3rem'
}}>Title</h2>
```

### Pattern 3: Glass Card
```jsx
<div style={{
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(20px)',
  border: '1px solid var(--glass-border)',
  borderRadius: '20px',
  padding: '2rem',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
}}>
```

### Pattern 4: Glass Button with Hover
```jsx
<Button style={{
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(20px)',
  border: '1px solid var(--glass-border)',
  borderRadius: '15px',
  padding: '15px 25px',
  transition: 'all 0.3s ease'
}}
onMouseOver={(e) => {
  e.currentTarget.style.transform = 'translateY(-5px)';
  e.currentTarget.style.borderColor = 'var(--accent-purple)';
  e.currentTarget.style.boxShadow = '0 10px 30px rgba(157, 127, 245, 0.4)';
}}
onMouseOut={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.borderColor = 'var(--glass-border)';
  e.currentTarget.style.boxShadow = 'none';
}}>
```

---

## ✨ Benefits of This System

1. **Consistency**: All pages look cohesive and professional
2. **Maintainability**: Change colors in one place (CSS variables)
3. **Scalability**: Easy to add new pages with the same theme
4. **Performance**: Reusable styles reduce CSS bloat
5. **Elegance**: Modern, sophisticated design throughout

---

## 🎨 Accent Color Usage

Use different accent colors to create visual variety while maintaining consistency:

- **Purple** (`var(--accent-purple)`): Primary actions, titles, main links
- **Blue** (`var(--accent-blue)`): Secondary actions, metadata, alternative highlights
- **Pink** (`var(--accent-pink)`): Tertiary accents, special highlights

**Example from Info page:**
- LinkedIn button: Blue accent on hover
- GitHub button: Purple accent on hover
- Message button: Pink accent on hover
- Email button: Blue accent on hover

This creates visual interest while staying within the theme!

---

## 🚀 Adding New Pages

When adding new pages, follow this checklist:

- [ ] Use gradient background
- [ ] Apply gradient text to main heading
- [ ] Use Playfair Display for headings
- [ ] Use Inter for body text
- [ ] Apply glassmorphism to cards
- [ ] Use CSS variables for colors
- [ ] Add hover effects with accent colors
- [ ] Use `clamp()` for responsive text sizes
- [ ] Test color consistency across devices

---

Your website now has a beautiful, consistent, and maintainable design system! 🎉

