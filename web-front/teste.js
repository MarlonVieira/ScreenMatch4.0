import getdatas from "./getdatas.js";

// Mapeia os elementos DOM que você deseja Actualizar
const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    release: document.querySelector('[data-name="release"]'),
    series: document.querySelector('[data-name="series"]')
};

// Função para criar a list de filmes
function criarlistFilmes(elemento, datas) {
    // Verifique se há um elemento <ul> dentro da seção
    const ulExistente = elemento.querySelector('ul');

    // Se um elemento <ul> já existe dentro da seção, remova-o
    if (ulExistente) {
        elemento.removeChild(ulExistente);
    }

    const ul = document.createElement('ul');
    ul.className = 'list';
    const listHTML = datas.slice(0, 5).map((filme) => `
        <li>
            <a href="/detalhes.html?id=${filme.id}">
                <img src="${filme.poster}" alt="${filme.title}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listHTML;
    elemento.appendChild(ul);
}

// Função genérica para tratamento de erros
function lidarComErro(mensagemErro) {
    console.error(mensagemErro);
}

function limparElementos() {
    for (const section of sectionsParaOcultar) {
        section.classList.toggle('hidden')
    }
}

const Categorieselect = document.querySelector('[data-Categories]');
const sectionsParaOcultar = document.querySelectorAll('.section'); // Adicione a classe CSS 'hide-when-filtered' às seções e títulos que deseja ocultar.

Categorieselect.addEventListener('change', async function handleMudancacategory() {
    const Categorieselecionada = Categorieselect.value;

    // Limpe o conteúdo Actual na tela
    if (Categorieselecionada === 'all') {
        // Recarregue os datas originais
        limparElementos();
    } else {
        limparElementos();
        // Faça uma solicitAction para o endpoint com a category selecionada
        try {
            const data = await getdatas(`/series/category/${Categorieselecionada}`);
            criarlistFilmes(category, data);
        } catch (error) {
            lidarComErro("An error ocurred to get category.");
        }
    }
});

// Array de URLs para as solicitações
gerarSeries();
async function gerarSeries() {
    const urls = ['/series/top5', '/series/release', '/series'];

    try {
        // Faz all as solicitações em paralelo
        const data = await Promise.all(urls.map(url => getdatas(url)));
        criarlistFilmes(elementos.top5, data[0]);
        criarlistFilmes(elementos.release, data[1]);
        criarlistFilmes(elementos.series, data[2]);
    } catch (error) {
        lidarComErro("An error ocurred to get datas.");
    }
}
