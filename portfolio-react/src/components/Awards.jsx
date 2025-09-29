import { useEffect, useRef } from 'react';

const AWARDS = [
  {
    icon: '🥈',
    title: 'Top 2 Innovation Product Prize',
    org: 'MoMo',
    year: '2025',
    color: '#e91e8c',
  },
  {
    icon: '🎓',
    title: 'Valedictorian – Computer Engineering',
    org: 'HCMUTE K19',
    year: '2023',
    color: '#f97316',
  },
  {
    icon: '⭐',
    title: 'EE Performance Rating',
    org: 'Nexcel Solutions',
    year: '2024',
    color: '#38bdf8',
  },
  {
    icon: '🏁',
    title: 'HCMC AI Challenge',
    org: 'Ho Chi Minh City',
    year: '2023',
    color: '#3fb950',
  },
  {
    icon: '🚗',
    title: 'UIT Racing Car Competition',
    org: 'UIT',
    year: '2023',
    color: '#a78bfa',
  },
  {
    icon: '🌐',
    title: 'IELTS 7.5',
    org: 'British Council',
    year: '2022',
    color: '#818cf8',
  },
];

const AWS_CERTS = [
  {
    name: 'Solutions Architect Associate',
    img: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    href: '#',
  },
  {
    name: 'Machine Learning Engineer Associate',
    img: 'https://img-c.udemycdn.com/open-badges/v2/badge-class/2042649863/56a4f532-ea3f-4747-88df-ba9e93755e5713452559103964002541.png',
    href: '#',
  },
  {
    name: 'SysOps Administrator Associate',
    img: 'https://images.credly.com/size/340x340/images/f0d3fbb9-bfa7-4017-9989-7bde8eaf42b1/image.png',
    href: '#',
  },
];

const PYTORCH_LOGO = 'https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg';
const COURSERA_CERTS = [
  'Deep Learning with PyTorch: Siamese Network',
  'Deep Learning with PyTorch: GAN',
  'Deep Learning with PyTorch: Neural Style Transfer',
  'Deep Learning with PyTorch: Object Localization',
  'Deep Learning with PyTorch: GradCAM',
  'Convolutional Neural Networks',
  'Facial Expression Recognition with PyTorch',
  'Aerial Image Segmentation with PyTorch',
  'Deep Learning with PyTorch: Image Segmentation',
];

export default function Awards() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="awards" className="section" ref={ref}>
      <div className="section-inner fade-up">
        <h2 className="section-title">
          <span className="section-title-accent">Awards</span> &amp; Certifications
        </h2>

        {/* Awards Grid */}
        <div className="awards-grid">
          {AWARDS.map((a, i) => (
            <div key={i} className="award-card card" style={{ '--award-color': a.color }}>
              <span className="award-icon">{a.icon}</span>
              <div className="award-info">
                <strong className="award-title">{a.title}</strong>
                <span className="award-org">{a.org} · {a.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AWS Certifications */}
        <div className="cert-section">
          <h3 className="cert-heading">☁️ AWS Certifications</h3>
          <div className="aws-certs">
            {AWS_CERTS.map((c) => (
              <a key={c.name} href={c.href} className="aws-cert-card card" target="_blank" rel="noopener noreferrer">
                <img src={c.img} alt={c.name} className="aws-cert-img" />
                <span className="aws-cert-name">{c.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Coursera Certifications */}
        <div className="cert-section">
          <h3 className="cert-heading">📖 Coursera Certifications</h3>
          <div className="coursera-grid">
            {COURSERA_CERTS.map((c) => (
              <div key={c} className="coursera-card card">
                <img src={PYTORCH_LOGO} alt="PyTorch" className="coursera-logo" />
                <span className="coursera-name">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
