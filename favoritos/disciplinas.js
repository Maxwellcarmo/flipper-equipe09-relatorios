// Planilha Google aqui
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyqkDTcLPrAdPn03jO813X-RHTBl87A97c3nXQdhfKjRBAKMwdddDZD3htRNknBFYi8Mw/exec'; // (URL GOOGLE SHEET AQUI)

// Variável para guardar a lista completa de disciplinas
let todasDisciplinas = [];

// Espera o HTML carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    //  Pega a barra de busca e adiciona o "ouvinte"
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', filtrarDisciplinas);
    
    // Carrega as disciplinas como antes
    carregarDisciplinas();
});

// Função para buscar dados da planilha e renderizar
async function carregarDisciplinas() {
    const loadingMessage = document.getElementById('loading-message');

    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        //  Salva os dados na nossa variável
        todasDisciplinas = await response.json();

        // Limpa a mensagem "Carregando..."
        loadingMessage.remove();
        
        //  Chama a nova função de renderização
        renderizarDisciplinas(todasDisciplinas);

    } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
        if (loadingMessage) {
            loadingMessage.innerText = 'Falha ao carregar disciplinas. Verifique sua conexão ou a URL da planilha.';
        }
    }
}

// Para desenhar os cards na tela
function renderizarDisciplinas(disciplinasParaRenderizar) {
    const container = document.getElementById('disciplinas-container');
    container.innerHTML = ''; // Limpa os cards antigos

    //  Verifica se a lista filtrada está vazia
    if (disciplinasParaRenderizar.length === 0) {
        container.innerHTML = '<p class="loading-message">Nenhuma disciplina encontrada.</p>';
        return;
    }

    // Pega os favoritos para saber quais corações pintar
    const favoritos = getFavoritos();

    disciplinasParaRenderizar.forEach(disciplina => {
        const isFavorito = favoritos.includes(disciplina.id);
        const iconClass = isFavorito ? 'fas fa-heart favorite-icon filled' : 'far fa-heart favorite-icon outline';

        const cardHTML = `
            <div class="card" data-id="${disciplina.id}">
                <div class="card-title-group">
                    <h3>${disciplina.nome}</h3>
                    <i class="${iconClass}" onclick="toggleFavorite(this, '${disciplina.id}')"></i>
                </div>
                <div class="card-body">
                    <p>${disciplina.descricao}</p>
                    
                    <p><strong>Sala:</strong> ${disciplina.sala} (${disciplina.diaSemana})</p>
                    
                    <p class="lab-info">${disciplina.labInfo}</p>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

//Chamada toda vez que o usuário digita
function filtrarDisciplinas(evento) {
    // Pega o texto da barra de busca e converte para minúsculas
    const termoBusca = evento.target.value.toLowerCase();
    
    // Filtra a lista COMPLETA de disciplinas
    const disciplinasFiltradas = todasDisciplinas.filter(disciplina => {
        // Verifica se o nome da disciplina (em minúsculas) inclui o texto digitado
        return disciplina.nome.toLowerCase().includes(termoBusca);
    });

    // Manda desenhar na tela apenas os cards filtrados
    renderizarDisciplinas(disciplinasFiltradas);
}

// (Funções de favoritar - sem alteração)
function toggleFavorite(iconElement, disciplinaId) {
    let favoritos = getFavoritos();

    if (favoritos.includes(disciplinaId)) {
        favoritos = favoritos.filter(id => id !== disciplinaId);
        iconElement.classList.remove('filled', 'fas');
        iconElement.classList.add('outline', 'far');
    } else {
        favoritos.push(disciplinaId);
        iconElement.classList.remove('outline', 'far');
        iconElement.classList.add('filled', 'fas');
    }
    localStorage.setItem('flipperFavoritos', JSON.stringify(favoritos));
}

function getFavoritos() {
    const favoritosJSON = localStorage.getItem('flipperFavoritos');
    return favoritosJSON ? JSON.parse(favoritosJSON) : [];
}