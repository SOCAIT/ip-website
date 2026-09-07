import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CustomNavbar from '@/components/CustomNavbar';
import ArticleContent from '@/components/ArticleContent';
import Footer from '@/components/Footer';
import { caseStudies, getProject } from '@/content/projects';
import { buildOpenGraph, SITE_URL } from '@/lib/seo';
import './case-study.css';

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.blocks) {
    return { title: 'Project Not Found' };
  }

  const path = `/portfolio/${project.slug}`;
  const image = project.image?.startsWith('http') ? project.image : `${SITE_URL}${project.image}`;

  return {
    title: project.title,
    description: project.summary,
    keywords: project.tags,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: buildOpenGraph({
      title: `${project.title} | Ioannis Pastellas`,
      description: project.summary,
      path,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    }),
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.blocks) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: project.image,
    dateCreated: project.year,
    creator: { '@type': 'Person', name: 'Ioannis Pastellas', url: SITE_URL },
    url: `${SITE_URL}/portfolio/${project.slug}`,
    keywords: project.tags?.join(', '),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE_URL}/portfolio/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="case-study-page">
        <CustomNavbar />

        {project.image && (
          <div className="case-hero">
            <Image
              src={project.image}
              alt=""
              className="case-hero-image"
              fill
              priority
              sizes="100vw"
            />
            <div className="case-hero-overlay" />
          </div>
        )}

        <section className="case-section">
          <div className="case-container">
            <header className="case-header">
              <Link href="/portfolio" className="case-back">
                <span aria-hidden="true">&larr;</span> All work
              </Link>

              <h1 className="case-title">{project.title}</h1>
              {project.tagline && <p className="case-tagline">{project.tagline}</p>}
              <p className="case-summary">{project.summary}</p>

              <dl className="case-facts">
                {project.year && (
                  <div className="case-fact">
                    <dt>Year</dt>
                    <dd>{project.year}</dd>
                  </div>
                )}
                {project.role && (
                  <div className="case-fact">
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
                {project.stack?.length > 0 && (
                  <div className="case-fact case-fact-wide">
                    <dt>Stack</dt>
                    <dd>
                      <ul className="case-stack">
                        {project.stack.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>

              {project.links?.length > 0 && (
                <div className="case-links">
                  {project.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="case-link"
                      >
                        {link.label} <span aria-hidden="true">&#8599;</span>
                      </a>
                    ) : (
                      <Link key={link.href} href={link.href} className="case-link">
                        {link.label} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    ),
                  )}
                </div>
              )}
            </header>

            <div className="case-body">
              <ArticleContent blocks={project.blocks} />
            </div>

            <footer className="case-footer">
              <Link href="/portfolio" className="case-back">
                <span aria-hidden="true">&larr;</span> All work
              </Link>
            </footer>
          </div>
        </section>

        <Footer position="relative" />
      </div>
    </>
  );
}
