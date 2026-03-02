const API_NOKKEL = "03dddedffdea2d4f195fe999";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_NOKKEL}`;

const fraValuta = document.getElementById("fraValuta");
const tilValuta = document.getElementById("tilValuta");
const belopInput = document.getElementById("belop");
const resultat = document.getElementById("resultat");
const konverterKnapp = document.getElementById("konverter");
const valutaListe = document.getElementById("valutaListe");

/* Script som kun tillater bruker å velge valuta
// Hent valutaer når siden starter
async function hentValutaer() {
  try {
    const respons = await fetch(`${BASE_URL}/latest/NOK`);
    const data = await respons.json();

    console.log(data); // VIKTIG for feilsøking

    if (data.result !== "success") {
      throw new Error("API-feil");
    }

    const valutaer = Object.keys(data.conversion_rates);

    valutaer.forEach(valuta => {
      const valg1 = document.createElement("option");
      const valg2 = document.createElement("option");

      valg1.value = valg2.value = valuta;
      valg1.textContent = valg2.textContent = valuta;

      fraValuta.appendChild(valg1);
      tilValuta.appendChild(valg2);
    });

  } catch (feil) {
    console.error("Feil:", feil);
    alert("Kunne ikke hente valutaer. Sjekk API-nøkkel.");
  }
}

hentValutaer();
*/

// Script som tillater bruker å skrive inn valuta selv

async function hentValutaer() {
  try {
    const respons = await fetch(`${BASE_URL}/latest/USD`);
    const data = await respons.json();

    if (data.result !== "success") {
      throw new Error("API-feil");
    }

    const valutaer = Object.keys(data.conversion_rates);

    valutaListe.innerHTML = "";

    valutaer.forEach(valuta => {
      const option = document.createElement("option");
      option.value = valuta;
      valutaListe.appendChild(option);
    });

  } catch (feil) {
    console.error("Feil:", feil);
    alert("Kunne ikke hente valutaer.");
  }
}

hentValutaer();

fraValuta.addEventListener("input", () => {
  fraValuta.value = fraValuta.value.toUpperCase();
});

tilValuta.addEventListener("input", () => {
  tilValuta.value = tilValuta.value.toUpperCase();
});

function sjekkUgyldigValuta(valuta) {
  const ugyldigeValutaer = ["ARS", "LYD", "SSP", "SYP", "VES", "YER", "ZWL"]

  if (ugyldigeValutaer.includes(valuta.toUpperCase())) {
    return !confirm(
      `Valutakoden "${valuta.toUpperCase()}" er en usikker valuta.\nVil du likevel fortsette?`
    );
    // Hvis brukeren trykker "OK", returneres false, konverteringen gjøres likevel
    // Hvis brukeren trykker "Avbryt", returneres true, konverteringen stoppes
  }

  return false;
}

// Konvertering
konverterKnapp.addEventListener("click", async () => {
  const belop = parseFloat(belopInput.value);
  const fra = fraValuta.value.toUpperCase();
  const til = tilValuta.value.toUpperCase();

  if (sjekkUgyldigValuta(fra) || sjekkUgyldigValuta(til)) {
    return;
  }

  if (!belop) {
    alert("Skriv inn et beløp");
    return;
  }

  try {
    const respons = await fetch(`${BASE_URL}/latest/${fra}`);
    const data = await respons.json();

    if (data.result !== "success") {
      throw new error("API-feil");
    }

    if (!data.conversion_rates[til]) {
      alert("Ugyldig valutakode");
      return;
    }
    const kurs = data.conversion_rates[til];
    const konvertert = (belop * kurs).toFixed(2);

    resultat.textContent = `${belop} ${fra} = ${konvertert} ${til}`;

  } catch (feil) {
    console.error("Feil ved konvertering:", feil);
  }
});