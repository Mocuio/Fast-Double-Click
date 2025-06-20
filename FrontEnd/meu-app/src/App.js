import { Button } from '@mui/material';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ListPage from './List/ListPage';
import TimerManaging from './TimeManage/TimeClass.js'
import Endpoints from './Endpoints/Endpoints.js'
function Home() {
  const [buttonStats, setButtonStats] = useState(false); // muda Status (valor)
  const [texto, setTexto] = useState('Start'); // muda Status (texto)
  const [seconds, setSeconds] = useState(0); // contador de segundos
  const time = new TimerManaging();
  const endpoints = new Endpoints();

  const navigate = useNavigate();
  const intervaloRef = useRef(null);

  const SaveInJson = () => {
    const agora = new Date();
    const dataHora = agora.toLocaleString();

    return {
      tempo: time.formatarTempo(seconds),
      dataHora: dataHora
    };
  };

  let jsonObject = SaveInJson();

  const alterarTexto = () => {
    setTexto(prev => (prev === 'Start' ? 'Stop' : 'Start'));
  };
  const irParaPagina = () => {
    navigate('/listpage');
  };
  const changeStats = () => {
    setButtonStats(prev => !prev);
  };
  // Controle do cronômetro: start/stop e reset
  useEffect(() => {
    if (buttonStats) {
      intervaloRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else if (seconds > 0) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
      endpoints.postInfo(jsonObject);
      setSeconds(0);
    }
    return () => clearInterval(intervaloRef.current);
  }, [buttonStats]);

  // Exemplo: "19/06/2025 17:25:30" (formato pode variar conforme local)

  return (
    <div className="App">
      <header className="App-header">
        <Button
          variant="contained"
          onClick={() => {
            changeStats();
            alterarTexto();
          }}
          className="main-button"
        >
          <span className="main-button-text">{texto}</span>
        </Button>

        <Button
          variant="contained"
          onClick={irParaPagina}
          className="go-to-listpage">
          <span>List Page</span>
        </Button>
      </header>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listpage" element={<ListPage />} />
    </Routes>
  );
}

export default App;
