const API_NOKKEL = "03dddedffdea2d4f195fe999";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_NOKKEL}`;

const fraValuta = document.getElementById("fraValuta");
const tilValuta = document.getElementById("tilValuta");
const belopInput = document.getElementById("belop");
const resultat = document.getElementById("resultat");
const konverterKnapp = document.getElementById("konverter");

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


// Konvertering
konverterKnapp.addEventListener("click", async () => {
  const belop = parseFloat(belopInput.value);
  const fra = fraValuta.value;
  const til = tilValuta.value;

  if (!belop) {
    alert("Skriv inn et beløp");
    return;
  }

  try {
    const respons = await fetch(`${BASE_URL}/latest/${fra}`);
    const data = await respons.json();

    const kurs = data.conversion_rates[til];
    const konvertert = (belop * kurs).toFixed(2);

    resultat.textContent = `${belop} ${fra} = ${konvertert} ${til}`;

  } catch (feil) {
    console.error("Feil ved konvertering:", feil);
  }
});