import getdatas from "./getDatas.js";

const params = new URLSearchParams(window.location.search);
const serieId = params.get('id');
const listseasons = document.getElementById('seasons-select');
const sheetSerie = document.getElementById('seasons-episodes');
const sheetdescription = document.getElementById('sheet-description');

// Função para get seasons
function getseasons() {
    getdatas(`/series/${serieId}/seasons/all`)
        .then(data => {
            const seasonsUnicas = [...new Set(data.map(season => season.season))];
            listseasons.innerHTML = ''; // Limpa as opções existentes

            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Select an season'
            listseasons.appendChild(optionDefault); 
           
            seasonsUnicas.forEach(season => {
                const option = document.createElement('option');
                option.value = season;
                option.textContent = season;
                listseasons.appendChild(option);
            });

            const optionall = document.createElement('option');
            optionall.value = 'all';
            optionall.textContent = 'All seasons'
            listseasons.appendChild(optionall); 
        })
        .catch(error => {
            console.error('Error to get the seasons:', error);
        });
}

// Função para get episódios de uma season
function getepisodes() {
    getdatas(`/series/${serieId}/seasons/${listseasons.value}`)
        .then(data => {
            const seasonsUnicas = [...new Set(data.map(season => season.season))];
            sheetSerie.innerHTML = ''; 
            seasonsUnicas.forEach(season => {
                const ul = document.createElement('ul');
                ul.className = 'episodes-list';

                const episodesseasonActual = data.filter(serie => serie.season === season);

                const listHTML = episodesseasonActual.map(serie => `
                    <li>
                        ${serie.episode} - ${serie.title}
                    </li>
                `).join('');
                ul.innerHTML = listHTML;
                
                const paragrafo = document.createElement('p');
                const linha = document.createElement('br');
                paragrafo.textContent = `season ${season}`;
                sheetSerie.appendChild(paragrafo);
                sheetSerie.appendChild(linha);
                sheetSerie.appendChild(ul);
            });
        })
        .catch(error => {
            console.error('Error to get episodes:', error);
        });
}

// Função para get informações da série
function getInfoSerie() {
    getdatas(`/series/${serieId}`)
        .then(data => {
            sheetdescription.innerHTML = `
                <img src="${data.poster}" alt="${data.title}" />
                <div>
                    <h2>${data.title}</h2>
                    <div class="description-texto">
                        <p><b>Avarege rating:</b> ${data.rating}</p>
                        <p>${data.synopsis}</p>
                        <p><b>Starring:</b> ${data.actors}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Erro ao obter informações da série:', error);
        });
}

// Adiciona ouvinte de evento para o elemento select
listseasons.addEventListener('change', getepisodes);

// Carrega as informações da série e as seasons quando a página carrega
getInfoSerie();
getseasons();
