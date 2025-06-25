// Important: Please read the Readme.md file 
// Important: Please read the Readme.md file 
// Important: Please read the Readme.md file 

const API_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';
const HERO_SELECTION = document.getElementById('heroSelect');
const HERO_IMAGE = document.getElementById('heroImage');
const HERO_DESCRIPTION = document.getElementById('heroDescription');
const NUM_CARDS_TO_REVEAL = 4;
let filteredData;
const selectedMinions = [];




// !Loading function
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
}

// !Loading function
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';
    document.body.style.backgroundColor = '';
}

async function populateHeroOptions() {
    try {
        showLoadingIndicator();
        const url = `${API_URL}/cards/types/Hero`;
        const cachedData = JSON.parse(localStorage.getItem(url));

        if (!cachedData) {
            const data = await fetchApiData(url);
            filteredData = data.filter(item => item.cardSet === 'Battlegrounds' && item.img);
            localStorage.setItem(url, JSON.stringify(filteredData));
        } else {
            filteredData = cachedData;
        }
        HERO_SELECTION.innerHTML = filteredData.map(optionData => `<option value="${optionData.cardId}">${optionData.name}</option>`).join('');
        displayHeroInfo();
    } catch (error) {
        console.error('An error occurred:', error);
        hideLoadingIndicator();
    }
}


async function displayHeroInfo() {
    try {
        const selectedCardId = HERO_SELECTION.value;
        const selectedHero = filteredData.find(optionData => optionData.cardId === selectedCardId);
        const { img, text, health } = selectedHero;
        HERO_IMAGE.src = img;
        document.querySelector('.healthAmount').textContent=health;
        HERO_DESCRIPTION.innerHTML = text ? selectedHero.text.replace(/\\n/g, ' ') : 'Hero does not contain a description';
    } catch (error) {
        console.error(error);
    }
}

async function addMinionCards() {
    const minionContainer = document.querySelector('.selectMinionsContent');
    const url = `${API_URL}/cards/types/minion`;
    const cachedData = JSON.parse(localStorage.getItem(url));

    if (cachedData) {
        processMinionData(cachedData);
    } else {
        showLoadingIndicator();
        const data = await fetchApiData(url);
        localStorage.setItem(url, JSON.stringify(data));
        processMinionData(data);
    }
    function processMinionData(data) {

        const minionCards = data.filter(item => item.cardSet === 'Battlegrounds' && item.img).slice();

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * minionCards.length);
            const img = createMinionImage(minionCards[randomIndex]);
            minionContainer.appendChild(img);
        }

        const opponentMinions = [];
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * minionCards.length);
            opponentMinions.push(minionCards[randomIndex]);
        }

        const opponentHero = JSON.parse(sessionStorage.getItem('opponentHero'));
        const opponentTeam = {
            hero: opponentHero[0],
            minions: opponentMinions,
        };
        sessionStorage.setItem('opponentTeam', JSON.stringify(opponentTeam));

    }

    function createMinionImage(minion) {
        const minionImageSrc = minion.img;
        const container = document.createElement('div');
        container.classList.add('cardContainer');
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.classList.add('cardImg');
        img.src = '../assets/closedCard.png';
        img.alt = '';
        img.dataset.minionImgSrc = minionImageSrc;
        container.appendChild(img);
        container.addEventListener('click', () => {
            reveal(container, minionImageSrc, minion);
        });
        hideLoadingIndicator();


        return container;
    }
}


function reveal(container, minionImageSrc, minion) {
    if (selectedMinions.length !== NUM_CARDS_TO_REVEAL) {
        const img = container.querySelector('.cardImg');
        img.onload = function () {
            img.classList.add('cardOpen');
        };
        img.src = minionImageSrc;
        selectedMinions.push(minion);

        if (selectedMinions.length === NUM_CARDS_TO_REVEAL) {
            const btn = document.querySelector('.toBattleBtn');
            btn.classList.remove('disabled');
            const selectedCardId = HERO_SELECTION.value;
            const selectedHero2 = filteredData.find(optionData => optionData.cardId === selectedCardId);
            const yourTeam = {
                hero: selectedHero2,
                minions: selectedMinions,
            };
            sessionStorage.setItem('yourTeam', JSON.stringify(yourTeam));
        }
        setTimeout(function () {
            img.classList.add('cardOpen');
        }, 200);
    }
}

HERO_SELECTION.addEventListener('change', function () {
    const selectedCardId = HERO_SELECTION.value;
    const selectedHero = filteredData.find(optionData => optionData.cardId === selectedCardId);

    if (selectedHero) {
        const selectedHeroJSON = JSON.stringify(selectedHero);
        sessionStorage.setItem('selectedHero', selectedHeroJSON);
    }

    displayHeroInfo(selectedHero);
});

window.addEventListener('load', function () {
    const navbar = generateNavbar();
    const footer = generateFooter();
    document.getElementById('navbar-placeholder').innerHTML = navbar;
    document.getElementById('footer-placeholder').innerHTML = footer;
    populateHeroOptions();
    addMinionCards();
});
