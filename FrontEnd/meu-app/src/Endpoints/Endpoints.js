class EndpointsClass {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Método para enviar dados (POST)
  postInfo(jsonObject) {
    
    return fetch(`http://localhost:3001/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonObject) // converte objeto para JSON string
    })
    .then(response => response.json());
  }

  // Método para buscar todos os itens (GET)
  getInfo() {
    return fetch(`http://localhost:3001/get`)
      .then(response => response.json());
  }
}

export default EndpointsClass;
