
document.addEventListener('DOMContentLoaded', function() {
// Etsitään sivun eri elementit ja tallennetaan ne muuttujiin


function showOrientationMessage() {
  const orientationMessage = document.getElementById('orientationMessage'); 
  orientationMessage.style.display = 'block'; 
}

function isPortrait() {
  return window.innerHeight > window.innerWidth;
}

function checkOrientation() {
  const body = document.body;
  const otherContent = document.getElementById('otherContent');

  // Lisätään tarkistus mobiililaitteille ja pystysuoralle asennolle
  if (window.innerWidth <= 1024 && isPortrait()) {
    showOrientationMessage();
    // Vaihda taustakuva landscape.png:ksi ja piilota muu sisältö
    body.style.backgroundImage = "url('img/landscape.png')";
    body.style.backgroundSize = 'contain'; // Säilytä alkuperäinen kuvasuhde
    body.style.backgroundRepeat = 'no-repeat'; // Estä toisto
    body.style.backgroundPosition = 'center'; // Sijoita kuva keskelle
    otherContent.style.display = 'none';
  } else {
    // Vaihda taustakuva takaisin bar.png:ksi ja näytä muu sisältö
    body.style.backgroundImage = "url('img/bar.png')";
    body.style.backgroundSize = '100vw 100vh';
    otherContent.style.display = 'block';
  }
}

// Kutsutaan funktiota sivun latautuessa ja ikkunan koon muuttuessa
checkOrientation();

window.addEventListener('resize', checkOrientation);


const counterElement = document.getElementById('counter');
const beerButton = document.getElementById('beerButton');
const resetButton = document.getElementById('resetButton');
const blondeButton = document.getElementById('blondeButton');


// Etsitään ääniefektit ja tallennetaan ne muuttujiin
const beerSound = document.getElementById('beerSound');
const womanSound = document.getElementById('womanSound');
const burbSound = document.getElementById('burbSound');
const tySound = document.getElementById('tySound');
const ladySound = document.getElementById('ladySound');
const homeSound = document.getElementById('homeSound');
const jiihaaSound = document.getElementById('jiihaaSound');
const piikkiSound = document.getElementById('piikkiSound');

// Etsitään ja tallennetaan juomien tarjoamiseen liittyvät painikkeet
const tarjoaKaljaButton = document.getElementById('tarjoaKaljaButton');
const tarjoaDrinkkiButton = document.getElementById('tarjoaDrinkkiButton');
const tarjoaKierrosButton = document.getElementById('tarjoaKierrosButton');

// Alustetaan muuttuja seuraamaan pelaajan rahamäärää
let clickCount = 0;



// Päivitetään laskuri, joka näyttää rahamäärän
function updateCounter() {
  counterElement.textContent = `Rahaa: ${clickCount} €`;

  // Tarkistetaan, onko rahamäärä negatiivinen ja soitetaan ääni tarvittaessa
  if (clickCount === -1) {
    piikkiSound.play();
  }
}


// Käsittelijäfunktio napsautuksille "beerButton" -painikkeessa
function handleClick() {
  // Lisätään rahamäärää ja päivitetään laskuri
  clickCount++;
  updateCounter();

// Tarkistetaan, onko pelaaja saavuttanut tiettyjä rahamääriä ja soitetaan ääniefektejä
  if ([1, 45, 100, 150].includes(clickCount)) {
    beerSound.play();
  }

 
  if ([50].includes(clickCount)) {
    homeSound.play();
  }


  if ([80, 120, 190].includes(clickCount)) {
    burbSound.play();
  }

  if (clickCount === 200) {
    // Soitetaan ääni, näytetään viesti ja nollataan rahamäärä
    womanSound.play();
    clickCount = 0;
    updateCounter();
  }

  
  // Päivitetään painikkeiden tila
  updateButtons();
}

// Käsittelijäfunktio "resetButton" -painikkeen napsautuksille
function handleReset() {
  // Nollataan rahamäärä, näytetään viesti ja päivitetään painikkeiden tila
  clickCount = 0;
  updateCounter();
  updateButtons();
}

// Käsittelijäfunktio "handleWomanClick" -ääniefektin soittamiselle
function handleWomanClick() {
  womanSound.play();
}

function handleBlondeClick() {
  if (clickCount === -1) {
      homeSound.play();
    } else if (clickCount === 50 || clickCount === -25) {
      homeSound.play();
    }
  }


// Vähennetään rahamäärää annetulla määrällä
function subtractAmount(amount) {
  clickCount -= amount;
  updateCounter();
  updateButtons();
}

// Päivitetään juomien tarjoamiseen liittyvien painikkeiden tila
function updateButtons() {
  tarjoaKaljaButton.disabled = clickCount < 8;
  tarjoaDrinkkiButton.disabled = clickCount < 22;
  tarjoaKierrosButton.disabled = clickCount < 100;
}


function disableButtons() {
  tarjoaKaljaButton.disabled = true;
  tarjoaDrinkkiButton.disabled = true;
  tarjoaKierrosButton.disabled = true;
}

// Estetään painikkeiden käyttö alussa
disableButtons();

// Lisätään kuuntelijät eri painikkeille
beerButton.addEventListener('click', handleClick);
resetButton.addEventListener('click', handleReset);
resetButton.addEventListener('click', handleWomanClick);
blondeButton.addEventListener('click', handleBlondeClick);


tarjoaKaljaButton.addEventListener('click', function() {
  subtractAmount(8);
  tySound.play();
});

tarjoaDrinkkiButton.addEventListener('click', function() {
  subtractAmount(15);
  ladySound.play();
});

tarjoaKierrosButton.addEventListener('click', function() {
  subtractAmount(100);
  jiihaaSound.play();
});

blondeButton.addEventListener('click', function() {
  subtractAmount(1);
  
});


// Alustetaan laskuri alkuperäiseen rahamäärään
updateCounter();

});


