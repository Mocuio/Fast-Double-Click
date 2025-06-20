import ListComponent from './listComponent';
import './List.css';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ptBR from 'date-fns/locale/pt-BR';
import { useState, useEffect, useMemo } from 'react';
import Endpoints from '../Endpoints/Endpoints';

function ListPage() {
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDescending, setIsDescending] = useState(false);
  const [itens, setItens] = useState([]);

  const endpoints = useMemo(() => new Endpoints('http://localhost:3001'), []);

  useEffect(() => {
    endpoints.getInfo()
      .then(data => setItens(data))
      .catch(err => console.error('Erro ao buscar dados:', err));
  }, [endpoints]);

  // Ajuste horário para filtro
  const startOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const endOfDay = (date) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  };

  // Converte "HH:mm:ss" em segundos para ordenar
  const tempoParaSegundos = (tempo) => {
    const [horas, minutos, segundos] = tempo.split(':').map(Number);
    return horas * 3600 + minutos * 60 + segundos;
  };

  // Filtra por data
  const itensFiltrados = itens.filter(item => {
    if (!startDate || !endDate) return true;

    const itemDate = new Date(item.dataHora);
    if (isNaN(itemDate)) return false;

    return (
      itemDate >= startOfDay(startDate) &&
      itemDate <= endOfDay(endDate)
    );
  });

  // Ordena pelo tempo, crescente ou decrescente
  const itensOrdenados = [...itensFiltrados].sort((a, b) => {
    const tempoA = tempoParaSegundos(a.tempo);
    const tempoB = tempoParaSegundos(b.tempo);
    return isDescending ? tempoB - tempoA : tempoA - tempoB;
  });

  return (
    <header>
      <div className="square-header">
        <Box className="box-custom">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Box display="flex" gap={2} sx={{ flexWrap: 'wrap' }}>
              <DatePicker
                label="Data Início"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
              />
              <DatePicker
                label="Data Fim"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
              />
              <Button
                variant="outlined"
                onClick={() => { setStartDate(null); setEndDate(null); }}
                size="small"
                sx={{ height: 39, minWidth: 80 }}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsDescending(prev => !prev)}
                size="small"
                sx={{ height: 39, minWidth: 130, backgroundColor: 'orange' }}
              >
                 {isDescending ? 'Descendente' : 'Ascendente'}
              </Button>
            </Box>
          </LocalizationProvider>
        </Box>

        <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', top: 15 }}>
          <span style={{ display: 'flex', position: 'relative', left: '100%' }}>Data</span>
          <span style={{ display: 'flex', position: 'relative', left: '-262%' }}>Time</span>
        </div>
      </div>

      <div className="List-body square">
        <ListComponent itens={itensOrdenados} />
      </div>

      <Button variant="contained" onClick={goHome} className="go-to-homePage">
        Back Page
      </Button>
    </header>
  );
}

export default ListPage;
