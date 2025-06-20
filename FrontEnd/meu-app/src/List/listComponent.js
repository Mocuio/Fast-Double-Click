import { format } from 'date-fns';

function ListComponent({ itens }) {
  return (
    <div>
      {itens.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            color: 'gray',
            fontSize: '1.5rem',
            textAlign: 'center',
          }}
        >
          Nenhum item encontrado.
        </div>
      ) : (
        itens.map((item, idx) => {
          const dataObj = new Date(item.dataHora);
          const dataFormatada = !isNaN(dataObj)
            ? format(dataObj, 'dd/MM/yyyy HH:mm:ss')
            : 'Data inválida';

          return (
            <div
              key={item.id || idx}
              style={{
                color: 'black',
                padding: '20px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <div className="List-body-results-row">
                <div className="List-body-results-time">
                  <span>{item.tempo}</span>
                </div>
                <div className="List-body-results-data">
                  <span>{dataFormatada}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ListComponent;
