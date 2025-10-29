document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendarDays');
    const form = document.getElementById('agendamentoForm');

    // Função Placeholder para Simular a Seleção de Data
    calendarDays.addEventListener('click', (e) => {
        if (e.target.classList.contains('available') || e.target.classList.contains('selected')) {
            
            // Remove a seleção anterior
            document.querySelectorAll('.day.selected').forEach(d => d.classList.remove('selected'));
            
            // Adiciona a nova seleção
            e.target.classList.add('selected');
            
            const selectedDate = e.target.getAttribute('data-date');
            console.log(`Data selecionada: ${selectedDate}`);
            
            // Aqui, em um sistema real, você faria um FETCH para carregar os horários disponíveis (Back-end)
            // ...
        } else if (e.target.classList.contains('unavailable')) {
            alert('Esta data já está lotada ou indisponível.');
        } else if (e.target.classList.contains('past-day')) {
             alert('Não é possível agendar datas passadas.');
        }
    });

    // Função Placeholder para Simular o Envio do Formulário para o Administrador
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const sala = document.getElementById('sala').value;
        const horario = document.getElementById('horario').value;
        const dataSelecionada = document.querySelector('.day.selected')?.getAttribute('data-date');

        if (!dataSelecionada) {
            alert('Por favor, selecione uma data no calendário.');
            return;
        }

        // Simulação do sucesso do envio para o Back-end (que faria a aprovação do Admin)
        alert(`SUCESSO! Solicitação enviada para aprovação do Administrador.\n\nProfessor: ${nome}\nSala: ${sala}\nData: ${dataSelecionada} às ${horario}`);
        
        // Limpar o formulário e a seleção (apenas no Front-end)
        form.reset();
        document.querySelectorAll('.day.selected').forEach(d => d.classList.remove('selected'));
    });
});