// Important: Please read the Readme.md file 
// Important: Please read the Readme.md file 
// Important: Please read the Readme.md file 

const apiUrl = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/BG23_HERO_306';



function createLeftSideElements(data) {
    const imgElement = document.createElement('img');
    imgElement.src = data[0].img;

    const heroName = document.createElement('p');
    heroName.classList.add('heroTitle');
    heroName.textContent = data[0].name;

    const heroText = document.createElement('p');
    heroText.classList.add('heroText');
    heroText.textContent = data[0].text;

    const healthAmount = document.createElement('div');
    healthAmount.classList.add('healthAmount');
    healthAmount.textContent = data[0].health;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('infoContainer');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');

    return { imgElement, heroName, heroText, healthAmount, infoContainer, imgContainer };
}


function createRightSideElements() {
    const fightTitle = document.createElement('p');
    fightTitle.classList.add('fightTitle');
    fightTitle.textContent = 'Measure Against the Former Leader of the Horde!';

    const acceptContainer = document.createElement('div');
    acceptContainer.classList.add('acceptContainer');

    const acceptTitle = document.createElement('p');
    acceptTitle.classList.add('acceptTitle');
    acceptTitle.textContent = 'The Banshee Queen Awaits...';

    const acceptDescription = document.createElement('p');
    acceptDescription.classList.add('acceptDescription');
    acceptDescription.textContent = 'Are You Prepared for the Challenge?';

    const acceptBtn = document.createElement('a');
    acceptBtn.classList.add('acceptBtn');
    acceptBtn.href = '/ChoosePage/Choose.html';
    acceptBtn.textContent = 'Accept';

    acceptContainer.appendChild(acceptTitle);
    acceptContainer.appendChild(acceptDescription);
    acceptContainer.appendChild(acceptBtn);

    return { fightTitle, acceptContainer };
}

async function fetchData(apiUrl) {
    try {
        const data = await fetchApiData(apiUrl);

        if (data.length > 0) {
             sessionStorage.setItem('opponentHero', JSON.stringify(data));

             const leftSide = document.querySelector('.leftSide-questBox');
            const { imgElement, heroName, heroText, healthAmount, infoContainer, imgContainer } = createLeftSideElements(data);
            const { lineElement, line2Element } = createLineElements();
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(lineElement);
            imgContainer.appendChild(line2Element);
            leftSide.appendChild(imgContainer);
            leftSide.appendChild(healthAmount);
            leftSide.appendChild(infoContainer);
            infoContainer.appendChild(heroName);
            infoContainer.appendChild(heroText);

            const rightSide = document.querySelector('.rightSide-questBox');
            const { fightTitle, acceptContainer } = createRightSideElements();
            rightSide.appendChild(fightTitle);
            rightSide.appendChild(acceptContainer);
        } else {
            console.log('Card data not found.');
        }
    } catch (error) {
        console.error(error);
    }
}

function createLineElements() {
    const lineElement = document.createElement('div');
    lineElement.classList.add('line');

    const line2Element = document.createElement('div');
    line2Element.classList.add('line2');

    for (let i = 0; i < 4; i++) {
        const icon = document.createElement('img');
        icon.classList.add('iconCard');
        icon.src = "../assets/infoCard.png";
        icon.alt = 'Icon ' + (i + 1);


        const text = document.createElement('p');
        text.classList.add('iconText');
        text.textContent='?';


        line2Element.appendChild(icon);
        line2Element.appendChild(text);
    }

    return { lineElement, line2Element };
}


document.addEventListener('DOMContentLoaded', function () {

    const navbar = generateNavbar();
    const footer = generateFooter();
    document.getElementById('navbar-placeholder').innerHTML = navbar;
    document.getElementById('footer-placeholder').innerHTML = footer;

    fetchData(apiUrl);
});