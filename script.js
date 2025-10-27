/*
 * script.js
 * Controla o formulário de gastos, envia os dados ao endpoint do Apps Script
 * e apresenta feedback visual ao casal.
 */

const scriptURL = 'https://script.google.com/macros/s/AKfycbweWJRj2pOJRzl3x6J5SnzF77MgxN4pUi7hTQscu_6hvYRna8EQdq2rTbNHDZ6rdBPfKw/exec';

const form = document.getElementById('expense-form');
const statusElement = document.getElementById('status');
const peopleOptions = document.getElementById('people-options');

/**
 * Monta dinamicamente a lista de pessoas a partir do atributo data-people.
 */
function renderPeopleChoices() {
    try {
        const data = peopleOptions.getAttribute('data-people');
        const people = JSON.parse(data);

        const fragment = document.createDocumentFragment();

        people.forEach((person, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'person';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'person';
            input.id = `person-${index}`;
            input.value = person;
            input.required = true;

            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            label.textContent = person;

            wrapper.appendChild(input);
            wrapper.appendChild(label);
            fragment.appendChild(wrapper);
        });

        peopleOptions.innerHTML = '';
        peopleOptions.appendChild(fragment);
    } catch (error) {
        console.error('Não foi possível montar a lista de pessoas', error);
        peopleOptions.innerHTML = '<p>Configure os nomes em data-people.</p>';
    }
}

/**
 * Limpa o estado da mensagem de status.
 */
function resetStatus() {
    statusElement.dataset.state = '';
    statusElement.textContent = '';
}

/**
 * Exibe uma mensagem com estado (success ou error).
 */
function setStatus(message, state) {
    statusElement.dataset.state = state;
    statusElement.textContent = message;
}

/**
 * Exibe o spinner enquanto os dados estão sendo enviados.
 */
function showSpinner() {
    statusElement.innerHTML = '<span class="spinner" aria-hidden="true"></span> Enviando...';
    statusElement.dataset.state = '';
}

renderPeopleChoices();
form.addEventListener('input', resetStatus);

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!scriptURL || scriptURL === 'COLE_A_URL_DO_APPS_SCRIPT_AQUI') {
        setStatus('Antes de enviar, configure a constante scriptURL com a URL do seu Apps Script.', 'error');
        return;
    }

    const formData = new FormData(form);
    const payload = {
        person: formData.get('person'),
        date: formData.get('date'),
        category: formData.get('category'),
        description: formData.get('description'),
        amount: formData.get('amount'),
        notes: formData.get('notes'),
        submittedAt: new Date().toISOString(),
    };

    try {
        form.querySelector('button[type="submit"]').disabled = true;
        showSpinner();

        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Resposta inesperada: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.status !== 'success') {
            throw new Error(result.message || 'Resposta desconhecida do servidor.');
        }

        setStatus('Gasto salvo com sucesso! Obrigado ❤️', 'success');
        form.reset();
        renderPeopleChoices(); // Garantir que a seleção seja resetada
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        setStatus(`Não foi possível salvar. ${error.message}`, 'error');
    } finally {
        form.querySelector('button[type="submit"]').disabled = false;
    }
});
