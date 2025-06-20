const fs = require('fs');
const path = require('path');

class JsonController {
  constructor(filename = 'info.json') {
    this.filePath = path.join(__dirname, filename);
  }

  // Ler os itens do arquivo
  readItems(callback) {
    fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        callback([]);
      } else {
        try {
          const items = JSON.parse(data);
          callback(items);
        } catch (error) {
          callback([]);
        }
      }
    });
  }

  // Salvar os itens no arquivo
  writeItems(items, callback) {
    fs.writeFile(this.filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar os itens:', err);
      }
      callback(items);
    });
  }

  // Adicionar um novo item
  addItem(newItem, callback) {
    this.readItems((items) => {
      items.push(newItem);
      this.writeItems(items, callback);
    });
  }
}

module.exports = JsonController;
