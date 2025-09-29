import { useEffect, useRef } from 'react';

const PUBLICATIONS = [
  {
    title: 'Research in Progress – ACM Lab, NYCU',
    venue: 'ACM Lab, NYCU · 2024 – present',
    desc: 'Currently conducting research at ACM Lab, NYCU on LLM, AI Agent Security, Multimodal Learning, and Distributed Systems. Investigating novel approaches to improve robustness of AI agents against adversarial attacks and developing efficient multimodal architectures.',
    tags: ['LLM', 'AI Agent Security', 'Multimodal Learning', 'Distributed Systems'],
    status: 'In Progress',
    icon: '📝',
  },
];

export default function Publications() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="publications" className="section" ref={ref}>
      <div className="section-inner fade-up">
        <h2 className="section-title">
          <span className="section-title-accent">Publications</span> &amp; Research
        </h2>

        <div className="publications-list">
          {PUBLICATIONS.map((pub, i) => (
            <div key={i} className="pub-card card">
              <div className="pub-header">
                <span className="pub-icon">{pub.icon}</span>
                <span className={`pub-status pub-status-${pub.status === 'In Progress' ? 'progress' : 'published'}`}>
                  {pub.status}
                </span>
              </div>
              <h3 className="pub-title">{pub.title}</h3>
              <p className="pub-venue">{pub.venue}</p>
              <p className="pub-desc">{pub.desc}</p>
              <div className="tag-row">
                {pub.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Google Scholar CTA */}
        <div className="scholar-cta card">
          <div className="scholar-inner">
            <span className="scholar-icon">📚</span>
            <div>
              <h3>View on Google Scholar</h3>
              <p>Follow my research updates and citation metrics</p>
            </div>
            <a
              href="https://scholar.google.com/citations?hl=vi&user=TIq18nUAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-scholar"
            >
              Google Scholar →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
