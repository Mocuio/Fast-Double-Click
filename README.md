Fast-Double-Click
📝 Descrição do Projeto – Registrador de Tempos

Você irá desenvolver uma aplicação web composta por um front-end integrado com um back-end, cujo objetivo é funcionar como um registrador de tempos.

🔧 Funcionalidades Principais

Página Inicial:

Um botão estará disponível para que o usuário possa registrar o tempo atual (data e hora exata do clique).

Cada registro será enviado para o back-end e armazenado em um banco de dados JSON, que servirá como base persistente da aplicação.

Página de Histórico:

Exibe uma lista com todos os registros de tempos previamente salvos.

A lista poderá ser:

Filtrada por data (selecionando intervalos específicos).

Ordenada de forma crescente ou decrescente de acordo com os tempos registrados.

Serão disponibilizados controles visuais (botões, filtros ou selects) para facilitar essa interação.

🖥️ Aspectos Técnicos

Front-end: Interface intuitiva para registrar, visualizar, filtrar e ordenar registros.

Back-end: API responsável por receber os registros e gerenciar os dados no arquivo JSON.

💾 Persistência dos Dados

Todos os registros de tempos são armazenados de forma permanente em um arquivo JSON, garantindo que as informações permaneçam disponíveis mesmo após reiniciar o servidor.

🚀 Como executar o projeto

Importante: Para que a aplicação funcione corretamente, é necessário que os dois projetos estejam rodando ao mesmo tempo. O back-end, responsável por armazenar e fornecer os dados. E o front-end, que é a interface onde você interage com os registros.

Passos para rodar o Back-end:

Acesse a pasta do back-end digitando cd BackEnd

Instale as dependências com o comando npm install

Rode o servidor do back-end com o comando node index.js

Observação: Caso tenha criado um script no package.json, também pode rodar com npm start.

Passos para rodar o Front-end:

Acesse a pasta do front-end digitando cd FrontEnd/meu-app

Instale as dependências com o comando npm install

Rode o front-end com o comando npm start

⚙️ Observação final:

Sempre inicie primeiro o back-end e, em seguida, o front-end. Assim, a comunicação entre eles funcionará corretamente.
