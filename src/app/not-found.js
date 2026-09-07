import Link from 'next/link';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import './not-found.css';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="status-page">
      <CustomNavbar />
      <section className="status-section">
        <div className="status-container">
          <p className="status-code">404</p>
          <h1 className="status-title">This page doesn&apos;t exist</h1>
          <p className="status-text">
            The link may be out of date, or the page may have moved. Try one of these instead.
          </p>
          <div className="status-links">
            <Link href="/" className="status-link status-link-primary">Home</Link>
            <Link href="/portfolio" className="status-link">Selected work</Link>
            <Link href="/articles" className="status-link">Articles</Link>
            <Link href="/info" className="status-link">Contact</Link>
          </div>
        </div>
      </section>
      <Footer position="relative" />
    </div>
  );
}
