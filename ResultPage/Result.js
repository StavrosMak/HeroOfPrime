// Important: Please read the Readme.md file 
// Important: Please read the Readme.md file 
// Important: Please read the Readme.md file 

let yourTotalHealth = 0;
let opponentTotalHealth = 0;



async function calculateTotalHealth(teamData) {
  let minionHealthSum = teamData.minions.reduce((total, minion) => total + minion.health, 0);
  return minionHealthSum;
}

async function setTeam(teamType) {
  const teamData = JSON.parse(sessionStorage.getItem(`${teamType}Team`));
  console.log(`${teamType}`,teamData);
  if (!teamData) return;

  const totalHealth = await calculateTotalHealth(teamData); // Await here

  const teamSection = document.querySelector(`.${teamType}TeamSection`);
  const teamContainer = document.createElement('div');
  teamContainer.classList.add('leaderSection');

  const heroImg = document.createElement('img');
  const heroData = teamData[`hero`];
  heroImg.src = heroData.img;
  heroImg.classList.add('heroImg');
  heroImg.alt = heroData.name;

  const minionImagesContainer = document.createElement('div');
  minionImagesContainer.classList.add('minionImagesContainer');
  teamData['minions'].forEach(minion => {
    const minionImage = document.createElement('img');
    minionImage.src = minion.img;
    minionImage.classList.add('minionImg');
    minionImage.alt = minion.name;
    minionImagesContainer.appendChild(minionImage);
  });

  teamContainer.appendChild(heroImg);
  teamSection.append(teamContainer, minionImagesContainer);

  return totalHealth;
}

function setResult(yourHealth, opponentHealth) {
  const resultContainer = document.querySelector('.resultStats');

  const leftSide = document.createElement('div');
  leftSide.classList.add('leftSideResult');
  const leftSideText = document.createElement('p');
  (yourHealth > opponentHealth) ? leftSideText.textContent = 'victory' : leftSideText.textContent = 'Defeat'
  leftSideText.classList.add((yourHealth > opponentHealth) ? 'victory' : 'defeat');
  const rightSide = document.createElement('div');
  rightSide.classList.add('rightSideResult');

  const header = document.createElement('h4');
  header.textContent = `Opponent's score:${opponentHealth}`;

  const yourScore = document.createElement('p');
  yourScore.textContent = `Your score:${yourHealth}`;

  const resultText = document.createElement('p');
  (yourHealth > opponentHealth) ? resultText.textContent = 'The dark lady deems you worthy!' : resultText.textContent = 'All bow before the Dark Lady!'


  leftSide.appendChild(leftSideText);
  resultContainer.append(leftSide);

  rightSide.appendChild(header);
  rightSide.appendChild(yourScore);
  rightSide.appendChild(resultText);
  resultContainer.append(rightSide);
}

async function setTeams() {
  let yourHealth = await setTeam('your');
  let opponentHealth = await setTeam('opponent');
  setResult(yourHealth, opponentHealth);
}

setTeams();
