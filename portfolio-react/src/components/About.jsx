import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';

const EDUCATION = [
  {
    degree: 'B.E. Computer Engineering',
    school: 'Ho Chi Minh City University of Technology and Education (HCMUTE)',
    period: '2019 – 2023',
    gpa: 'GPA: 3.58 / 4.0',
    honor: '🎓 Valedictorian – Class K19',
    logo: 'https://raw.githubusercontent.com/Syun1208/Syun1208/main/images/hcmute.png',
  },
];

const SKILLS = {
  'AI / ML': [
    'LangChain', 'LangGraph', 'LlamaIndex', 'Transformers', 'PyTorch',
    'Scikit-learn', 'XGBoost', 'OpenCV', 'YOLO', 'PaddleOCR',
  ],
  'Backend': ['FastAPI', 'Node.js', 'Flask', 'Redis', 'PostgreSQL', 'MongoDB'],
  'MLOps / Cloud': ['Docker', 'Airflow', 'GCP', 'Azure', 'AWS', 'Qdrant', 'Elasticsearch', 'HAProxy', 'vLLM', 'Ollama'],
  'Languages': ['Python', 'JavaScript', 'Java', 'SQL', 'Bash'],
};

export default function About({ data, setData }) {
  const { isLoggedIn } = useAuth();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  function update(key) {
    return (val) => setData((d) => ({ ...d, [key]: val }));
  }

  return (
    <section id="about" className="section" ref={ref}>
      <div className="section-inner fade-up">
        <h2 className="section-title">
          <span className="section-title-accent">About</span> Me
        </h2>

        <div className="about-grid">
          {/* Basic Info Card */}
          <div className="card">
            <h3 className="card-title">📋 Basic Information</h3>
            <div className="info-list">
              <div className="info-row">
                <span className="info-label">📱 Phone</span>
                <EditableText
                  tag="span"
                  className="info-value"
                  value={data.phone}
                  onSave={update('phone')}
                  isLoggedIn={isLoggedIn}
                />
              </div>
              <div className="info-row">
                <span className="info-label">✉️ Email</span>
                <EditableText
                  tag="span"
                  className="info-value"
                  value={data.email}
                  onSave={update('email')}
                  isLoggedIn={isLoggedIn}
                />
              </div>
              <div className="info-row">
                <span className="info-label">🌐 Languages</span>
                <EditableText
                  tag="span"
                  className="info-value"
                  value={data.languages}
                  onSave={update('languages')}
                  isLoggedIn={isLoggedIn}
                />
              </div>
              <div className="info-row">
                <span className="info-label">📍 Location</span>
                <EditableText
                  tag="span"
                  className="info-value"
                  value={data.location}
                  onSave={update('location')}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="card">
            <h3 className="card-title">🎓 Education</h3>
            {EDUCATION.map((edu, i) => (
              <div key={i} className="edu-item">
                <div className="edu-header">
                  {edu.logo && (
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      className="edu-logo"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <div className="edu-info">
                    <strong>{edu.degree}</strong>
                    <p className="edu-school">{edu.school}</p>
                    <p className="edu-meta">{edu.period} · {edu.gpa}</p>
                    {edu.honor && <span className="edu-honor">{edu.honor}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="card skills-card">
          <h3 className="card-title">🛠️ Technical Skills</h3>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} className="skill-group">
                <h4 className="skill-category">{cat}</h4>
                <div className="skill-tags">
                  {items.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
