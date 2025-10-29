document.addEventListener('DOMContentLoaded', () => {
    // Carrega a aba "Alunos" por padrão ao iniciar
    loadTab(null, 'alunos'); 
});

// Função para alternar o estado do menu de acordeão (Deve ser global)
window.toggleSubOptions = function(button, id) {
    const el = document.getElementById(id);
    const isVisible = el.classList.contains("show");
    
    // Oculta todos os sub-opções na área de conteúdo ativa
    const activeTabContent = document.getElementById('tab-content-area');
    if (activeTabContent) {
        activeTabContent.querySelectorAll('.sub-options').forEach(div => div.classList.remove("show"));
        activeTabContent.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove("active"));
    }
    
    if (!isVisible) {
        el.classList.add("show");
        button.classList.add("active");
    }
}

// NOVA FUNÇÃO para carregar o conteúdo das abas via fetch/AJAX
window.loadTab = function(evt, tabName) {
    const contentArea = document.getElementById('tab-content-area');
    const tablinks = document.getElementsByClassName("tab-button");
    
    // 1. Atualiza o estado dos botões de navegação
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    if (evt) {
        evt.currentTarget.classList.add("active");
    } else {
        // Ativa o botão 'alunos' no carregamento inicial (DOM Loaded)
        document.querySelector('.tab-button').classList.add("active");
    }

    // 2. Carrega o conteúdo HTML da pasta correspondente
    const filePath = `./${tabName}/${tabName}.html`;
    
    // Simula o carregamento do conteúdo do arquivo HTML na div principal
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                // Se o arquivo não for encontrado, exibe uma mensagem de erro
                throw new Error(`Não foi possível carregar o conteúdo da aba: ${tabName}`);
            }
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
        })
        .catch(error => {
            console.error(error);
            contentArea.innerHTML = `<p style="color: red; padding: 20px;">Erro ao carregar a seção. Verifique se o arquivo ${filePath} existe.</p>`;
        });
}