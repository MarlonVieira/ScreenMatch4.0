import getdatas from "./getDatas.js";

// Mapeia os elementos DOM que você deseja Actualizar
const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    release: document.querySelector('[data-name="release"]'),
    series: document.querySelector('[data-name="series"]')
};

// Função para criar a list de filmes

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
    const listHTML = datas.map((filme) => `
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

const Categorieselect = document.querySelector('[data-Categories]');
const sectionsParaOcultar = document.querySelectorAll('.section'); // Adicione a classe CSS 'hide-when-filtered' às seções e títulos que deseja ocultar.

Categorieselect.addEventListener('change', function () {
    const category = document.querySelector('[data-name="category"]');
    const Categorieselecionada = Categorieselect.value;

    if (Categorieselecionada === 'all') {

        for (const section of sectionsParaOcultar) {
            section.classList.remove('hidden')
        }
        category.classList.add('hidden');

    } else {

        for (const section of sectionsParaOcultar) {
            section.classList.add('hidden')
        }

        category.classList.remove('hidden')
        // Faça uma solicitAction para o endpoint com a category selecionada
        getdatas(`/series/category/${Categorieselecionada}`)
            .then(data => {
                criarlistFilmes(category, data);
            })
            .catch(error => {
                lidarComErro("Ocorreu um erro ao get os datas da category.");
            });
    }
});

// Array de URLs para as solicitações
geraSeries();
function geraSeries() {
    const urls = ['/series/top5', '/series/release', '/series'];

    // Faz all as solicitações em paralelo
    Promise.all(urls.map(url => getdatas(url)))
        .then(data => {
            criarlistFilmes(elementos.top5, data[0]);
            criarlistFilmes(elementos.release, data[1]);
            criarlistFilmes(elementos.series, data[2].slice(0, 5));
        })
        .catch(error => {
            lidarComErro("Ocorreu um erro ao get os datas.");
        });

}
