// Função para alternar o estado de favorito
function toggleFavorite(iconElement) {
    
    // Verifica se o ícone tem a classe 'filled' (favorito)
    if (iconElement.classList.contains('filled')) {
        // Se sim, este é o bloco de "remover dos favoritos"

        // ---  ---
        // 1. Encontra o elemento "pai" que é o card inteiro
        const card = iconElement.closest('.card');
        
        // 2. [OPCIONAL, MAS MELHOR] Pega o nome da disciplina para o alert
        const subjectName = card.querySelector('h3').textContent;

        // Troca o ícone de sólido (fas) para regular (far)
        iconElement.classList.remove('filled');
        iconElement.classList.add('outline');
        iconElement.classList.remove('fas');
        iconElement.classList.add('far');
        
        // Alert modificado
        alert(`'${subjectName}' foi removido dos seus favoritos!`);

        // ---  ---
        // 3. Remove o card inteiro da página
        card.remove();

    } else {
        // Se não, este é o bloco de "adicionar aos favoritos"
        // (Este bloco não deve ser chamado nesta página, 
        // mas o deixamos aqui para o caso de você usar em outro lugar)
        
        iconElement.classList.remove('outline');
        iconElement.classList.add('filled');
        iconElement.classList.remove('far');
        iconElement.classList.add('fas');
        
        alert('Adicionado aos favoritos!');
        // Note que aqui nós NÃO removemos o card
    }
    
}