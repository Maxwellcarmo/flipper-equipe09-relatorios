// Planilha Google aqui
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyqkDTcLPrAdPn03jO813X-RHTBl87A97c3nXQdhfKjRBAKMwdddDZD3htRNknBFYi8Mw/exec'; // (URL GOOGLE SHEET AQUI)

document.addEventListener('DOMContentLoaded', () => {
    carregarFavoritos();
});

async function carregarFavoritos() {
    const container = document.getElementById('favoritos-container');
    const loadingMessage = document.getElementById('loading-message');

    try {
        // [PASSO 1: BUSCAR FAVORITOS SALVOS]
        const favoritos = getFavoritos();

        if (favoritos.length === 0) {
            loadingMessage.innerText = 'Você ainda não favoritou nenhuma disciplina.';
            return;
        }

        // [PASSO 2: BUSCAR DADOS - USANDO A URL]
        const response = await fetch(GOOGLE_SHEET_URL);
        const disciplinas = await response.json();
        
        // [PASSO 3: FILTRAR APENAS OS FAVORITOS]
        const disciplinasFavoritas = disciplinas.filter(disciplina => favoritos.includes(disciplina.id));

        if (disciplinasFavoritas.length === 0) {
             loadingMessage.innerText = 'Nenhuma disciplina favorita foi encontrada.';
             return;
        }

        // Limpa a mensagem "Carregando..."
        if(loadingMessage) { // Verifica se a mensagem ainda existe
            loadingMessage.remove();
        }
        container.innerHTML = ''; 

        // [PASSO 4: RENDERIZAR CARDS]
        disciplinasFavoritas.forEach(disciplina => {
            
            const cardHTML = `
                <div class="card" data-id="${disciplina.id}">
                    <div class="card-title-group">
                        <h3>${disciplina.nome}</h3>
                        <i class="fas fa-heart favorite-icon filled" onclick="toggleFavorite(this, '${disciplina.id}')"></i>
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

    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        loadingMessage.innerText = 'Falha ao carregar seus favoritos. Verifique sua conexão ou a URL da planilha.';
    }
}

// [FUNÇÃO PRINCIPAL DESTA PÁGINA]
function toggleFavorite(iconElement, disciplinaId) {
    const card = iconElement.closest('.card');
    const subjectName = card.querySelector('h3').textContent;
    
    alert(`'${subjectName}' foi removido dos seus favoritos!`);
    card.remove();

    let favoritos = getFavoritos();
    favoritos = favoritos.filter(id => id !== disciplinaId); // Remove o ID
    localStorage.setItem('flipperFavoritos', JSON.stringify(favoritos));
    
    const container = document.getElementById('favoritos-container');
    if (container.children.length === 0) {
        container.innerHTML = '<p>Você ainda não favoritou nenhuma disciplina.</p>';
    }
}

// Função auxiliar para pegar favoritos do localStorage
function getFavoritos() {
    const favoritosJSON = localStorage.getItem('flipperFavoritos');
    return favoritosJSON ? JSON.parse(favoritosJSON) : [];
}