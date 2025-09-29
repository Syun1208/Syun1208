import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    name: 'Mimir Chatbot Platform',
    org: 'MoMo',
    period: 'Jun 2025 – Mar 2026',
    desc: 'Enterprise-grade multi-agent chatbot platform with LangGraph orchestration, SQL generation, and knowledge retrieval for internal business workflows.',
    metrics: [
      { label: 'KR', value: '0.98' },
      { label: 'TR', value: '0.74' },
      { label: 'SQL', value: '0.64' },
      { label: 'P90', value: '75.2s' },
    ],
    tags: ['LangGraph', 'FastAPI', 'Azure OpenAI', 'BigQuery'],
    color: '#e91e8c',
  },
  {
    name: 'Report Entity Recognition',
    org: 'Nexcel Solutions',
    period: 'Feb – Jun 2025',
    desc: 'Multi-agent NER system for financial report parsing using fine-tuned Qwen2.5-7B with Ollama inference and HAProxy load balancing.',
    link: { label: 'HuggingFace', href: 'https://huggingface.co/leonpham1208' },
    tags: ['Qwen2.5-7B', 'Ollama', 'HuggingFace', 'HAProxy'],
    color: '#38bdf8',
  },
  {
    name: 'Domain Chatbot Betting Knowledge',
    org: 'Nexcel Solutions',
    period: 'Dec 2024 – Jun 2025',
    desc: 'Domain-specific RAG chatbot for betting knowledge base with Llama-3.2-7B served on vLLM, Next.js frontend and Qdrant vector store.',
    metrics: [
      { label: 'Precision', value: '0.74' },
      { label: 'Faithfulness', value: '0.89' },
      { label: 'Relevance', value: '0.67' },
    ],
    tags: ['Llama-3.2-7B', 'vLLM', 'Next.js', 'Qdrant'],
    color: '#f97316',
  },
  {
    name: 'Customer Performance Prediction',
    org: 'Nexcel Solutions',
    period: 'Jun – Dec 2024',
    desc: 'Customer churn prediction using XGBoost with RFM feature engineering, K-Means segmentation, and UMAP dimensionality reduction.',
    metrics: [
      { label: 'TP', value: '0.35' },
      { label: 'TN', value: '0.92' },
    ],
    tags: ['XGBoost', 'K-Means', 'RFM Model', 'UMAP'],
    color: '#3fb950',
  },
  {
    name: 'Text-Video Retrieval',
    org: 'HCMC AI Challenge 2023',
    period: '2023',
    desc: 'Cross-modal text-to-video retrieval system using CLIP embeddings, BERT text encoding, and Faiss/Elasticsearch for large-scale similarity search.',
    tags: ['CLIP', 'BERT', 'Faiss', 'Elasticsearch', 'FastAPI'],
    color: '#a78bfa',
  },
  {
    name: 'Smart Menu Application',
    org: 'Graduation Project',
    period: '2023',
    desc: 'Mobile app for restaurant menu digitization using PaddleOCR for text extraction, BERT for menu understanding, deployed on GCP.',
    tags: ['Java', 'PaddleOCR', 'BERT', 'GCP'],
    color: '#818cf8',
  },
  {
    name: 'ID Card Verification eKYC',
    org: 'Unicloud Group',
    period: '2022 – 2023',
    desc: 'End-to-end eKYC pipeline for Vietnamese ID card verification with real-time detection, OCR, and face matching at 64fps.',
    metrics: [
      { label: 'FPS', value: '64' },
      { label: 'mAP@50', value: '0.87' },
      { label: 'F1', value: '0.89' },
    ],
    tags: ['YOLOv8', 'PaddleOCR', 'Docker', 'FastAPI'],
    color: '#f85149',
  },
  {
    name: 'Autonomous Car CV&DL',
    org: 'UIT Racing Car 2023',
    period: '2023',
    desc: 'Computer vision system for autonomous racing car with lane detection (UNET 3+), object detection (YOLOv8) on Jetson Nano edge device.',
    tags: ['YOLOv8', 'UNET 3+', 'Jetson Nano', 'Unity'],
    color: '#38bdf8',
  },
];

function ProjectCard({ proj, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => ref.current?.classList.add('visible'), (index % 4) * 100);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div className="project-card card fade-up" ref={ref}>
      <div className="project-card-top">
        <div className="project-dot" style={{ background: proj.color }} />
        <span className="project-org">{proj.org}</span>
        <span className="project-period">{proj.period}</span>
      </div>
      <h3 className="project-name">{proj.name}</h3>
      <p className="project-desc">{proj.desc}</p>
      {proj.metrics && (
        <div className="project-metrics">
          {proj.metrics.map((m) => (
            <div key={m.label} className="metric">
              <span className="metric-label">{m.label}</span>
              <span className="metric-value">{m.value}</span>
            </div>
          ))}
        </div>
      )}
      {proj.link && (
        <a href={proj.link.href} target="_blank" rel="noopener noreferrer" className="project-link">
          {proj.link.label} →
        </a>
      )}
      <div className="tag-row">
        {proj.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
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
    <section id="projects" className="section" ref={ref}>
      <div className="section-inner fade-up">
        <h2 className="section-title">
          <span className="section-title-accent">Featured</span> Projects
        </h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} proj={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
