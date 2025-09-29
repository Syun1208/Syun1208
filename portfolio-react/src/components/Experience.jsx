import { useEffect, useRef } from 'react';

const EXPERIENCES = [
  {
    company: 'MoMo',
    role: 'Middle AI Engineer',
    period: 'Jun 2025 – Mar 2026',
    prize: '🥈 Top 2 Innovation Product Prize at MoMo',
    logo: 'https://raw.githubusercontent.com/Syun1208/Syun1208/main/images/momo-file-240411162904.svg',
    bullets: [
      'Enhanced Mimir Chatbot Platform with advanced multi-agent orchestration using LangGraph, improving response accuracy and system efficiency for internal business workflows.',
      'Implemented Jira-automated assignment pipeline using LLM-based intent classification, reducing manual ticket routing effort by 80%.',
      'Integrated MCP Server for seamless tool-calling capabilities across enterprise AI services, enabling plug-and-play LLM tool extensions.',
      'Performance: KR 0.98 · TR 0.74 · SQL 0.64 · P90 75.2s',
    ],
    tags: ['LangGraph', 'LangChain', 'FastAPI', 'Redis', 'BigQuery', 'Qdrant', 'Azure OpenAI'],
    color: '#e91e8c',
  },
  {
    company: 'Nexcel Solutions',
    role: 'ML Engineer',
    period: 'Aug 2023 – Jun 2025',
    prize: '⭐ 2× ME+ · 1× EE Performance Ratings',
    logo: 'https://raw.githubusercontent.com/Syun1208/Syun1208/main/images/nexcel.jpeg',
    bullets: [
      'Built Agentic RAG baseline for internal domain knowledge retrieval using LangChain + Qdrant, achieving precision@5 = 0.87 on proprietary corpus.',
      'Designed multi-agent Report Entity Recognition system using fine-tuned Qwen2.5-7B served via Ollama and HAProxy load balancing.',
      'Analyzed XGBoost loss function gradients and feature importance for customer churn prediction, delivering TP: 0.35 · TN: 0.92.',
      'Pioneered CI/CD pipeline for ML model deployment using Airflow + Docker + FastAPI, reducing deployment time from days to hours.',
      'Webiometric Data Streaming pipeline for real-time sports data ingestion and analytics.',
    ],
    tags: ['LangChain', 'Ollama', 'vLLM', 'FastAPI', 'Airflow', 'Qdrant', 'HAProxy'],
    color: '#38bdf8',
  },
  {
    company: 'Unicloud Group',
    role: 'AI Engineer',
    period: 'Feb 2022 – Aug 2023',
    logo: 'https://raw.githubusercontent.com/Syun1208/Syun1208/main/images/unicloud.jpeg',
    bullets: [
      'Designed Unicloud eKYC pipeline integrating YOLOv8 for ID card detection, PaddleOCR for text extraction, and face-matching verification.',
      'Added orientation correction module improving OCR accuracy by 15% on tilted/rotated documents.',
      'Performance: 64 fps · 0.87 mAP@50 · 0.94 mAP50-95 · 0.89 F1 · 1.67 MB model size.',
    ],
    tags: ['YOLOv8', 'PaddleOCR', 'FastAPI', 'Docker', 'GCP'],
    color: '#3fb950',
  },
  {
    company: 'UTE-AI Lab',
    role: 'Research Assistant',
    period: 'May 2021 – Dec 2023',
    icon: '🔬',
    bullets: [
      'Participated in numerous AI competitions including HCMC AI Challenge 2023, UIT Racing Car 2023, achieving top placements.',
      'Tracked SOTA AI research across computer vision, NLP, and multimodal learning domains; implemented and benchmarked new architectures.',
    ],
    tags: ['Research', 'Computer Vision', 'NLP', 'PyTorch', 'CLIP'],
    color: '#a78bfa',
  },
];

function ExperienceItem({ exp, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => ref.current?.classList.add('visible'), index * 150);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div className="timeline-item fade-up" ref={ref}>
      <div className="timeline-dot" style={{ borderColor: exp.color }} />
      <div className="timeline-content card">
        <div className="exp-header">
          <div className="exp-logo-wrap">
            {exp.logo ? (
              <img
                src={exp.logo}
                alt={exp.company}
                className="exp-logo"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span className="exp-icon">{exp.icon}</span>
            )}
          </div>
          <div className="exp-meta">
            <h3 className="exp-company">{exp.company}</h3>
            <p className="exp-role">{exp.role}</p>
            <p className="exp-period">{exp.period}</p>
            {exp.prize && <span className="exp-prize">{exp.prize}</span>}
          </div>
        </div>
        <ul className="exp-bullets">
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="tag-row">
          {exp.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
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
    <section id="experience" className="section" ref={ref}>
      <div className="section-inner fade-up">
        <h2 className="section-title">
          <span className="section-title-accent">Work</span> Experience
        </h2>
        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
