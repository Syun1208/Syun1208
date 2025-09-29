import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Nav from './components/Nav';
import LoginModal from './components/LoginModal';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Publications from './components/Publications';
import Footer from './components/Footer';
import './App.css';

const DEFAULT_DATA = {
  avatar: 'https://raw.githubusercontent.com/Syun1208/Syun1208/main/images/avata.jpg',
  name: 'Pham Minh Long',
  title: '✨ AI Solutions Architect',
  subtitle: 'Researcher @ ACM Lab, NYCU',
  quote: 'BE YOUR BEST SELF!',
  badges: [
    '🤖 LLM / AI Agent',
    '🔬 Multimodal Learning',
    '☁️ MLOps / Cloud',
    '🔐 AI Agent Security',
    '⭐ Distributed Systems',
  ],
  phone: '(+84) 036 762 3811',
  email: 'phamlong12082001@gmail.com',
  languages: 'Vietnamese, English (IELTS 7.5)',
  location: 'Ho Chi Minh City, Vietnam',
};

function loadData() {
  try {
    const stored = localStorage.getItem('portfolio_data');
    if (stored) return { ...DEFAULT_DATA, ...JSON.parse(stored) };
  } catch (_) {}
  return DEFAULT_DATA;
}

export default function App() {
  const [data, setDataState] = useState(loadData);

  function setData(updater) {
    setDataState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem('portfolio_data', JSON.stringify(next));
      return next;
    });
  }

  return (
    <AuthProvider>
      <div className="app">
        <Nav />
        <LoginModal />
        <main>
          <Home data={data} setData={setData} />
          <About data={data} setData={setData} />
          <Experience />
          <Projects />
          <Awards />
          <Publications />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
