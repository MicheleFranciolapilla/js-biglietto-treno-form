// Chiedere a utente 2 dati:
// 1) km da percorrere
// 2) età o fascia d'età

// In base ad una tariffa di 0.21 € per km, calcolare il costo del viaggio ed inoltre, nel caso, applicare scontistica:
// a) 20% di sconto per minorenni
// b) 40% di sconto per over 65.

// Output del prezzo con due cifre decimali
// ****************************************************

//********** Costanti globali di riferimento **********

// Tariffa di riferimento: 0.21 euro X km
const       basic_fare      = 0.21;

// Tariffa percentuale per ragazzi: 80%, ovvero sconto 20%
const       junior_price    = 0.8; 

// Tariffa percentuale per adulti: 100%, ovvero nessuno sconto
const       adult_price     = 1;

// Tariffa percentuale per over 65: 60%, ovvero sconto 40%
const       senior_price    = 0.6;

// Intervallo chilometrico valido per l'input
const       min_km          = 1;
const       max_km          = 999;

//********** Variabili globali di riferimento **********

// Variabile globale che assumerà il valore di percorrenza dato in input
let         km              = 0;

// Coefficiente moltiplicativo che determina il prezzo finale. Può assumere uno dei tre valori delle costanti junior_price, adult_price (default) o senior_price
let         percent_price   = adult_price;

// Variabile che assumerà il valore del prezzo standard (senza sconto)
let         regular_price   = 0;

// Variabile che assumerà il valore del prezzo applicato (scontato o meno, a seconda dei casi)
let         final_price     = 0;

// Variabile che assumerà il valore dello sconto applicato (laddove presente). Sarà uguale alla differenza tra il prezzo standard (regular_price) ed il prezzo applicato (final_price)
let         discount        = 0;

// Variabile stringa che definirà il tipo di viaggio: breve, medio o lungo
let         trip            = "";

// Variabile stringa che definirà il tipo di viaggiatore: ragazzo/a, adulto/a o senior
let         traveler        = "";

// Variabile stringa che definirà il trattamento applicato: Sconto 20%, Prezzo pieno, Sconto 40%
let         percent_str     = "";

// Variabili stringa rappresentanti le variabili numeriche regular_price, final_price, discount con due cifre decimali
let         regular_str     = "";
let         final_str       = "";  
let         discount_str    = "";       

// Funzione che restituisce una card esaustiva di output e consente l'elaborazione di un nuovo ticket
function output_data()
{
    document.getElementById('output_area').innerHTML = 
    `<div class="row flex-column w-100 p-3 border border-info rounded-3 py-2">
        <h3 class="text-center text-black-50">Il tuo biglietto è pronto!</h3>
        <div class="w-100 d-flex justify-content-between">
            <img src="assets/img/person-walking-luggage-solid.svg" alt="...">
            <img src="assets/img/train-solid.svg" alt="...">
        </div>
        <div id="trip_data" class="border border-info rounded-2 m-1 mt-3 py-2">
            <h3>Il tuo viaggio:</h3>
            <h6>${trip} - ${km} Km</h6>
            <h6>${traveler} - ${percent_str}</h6>
            <h6>Prezzo: ${regular_str} €</h6>
            <h6>Pagato: ${final_str} €</h6>
            <h6>Sconto: ${discount_str} €</h6>
        </div>
        <div class="align-self-center mt-3">
            <button class="btn btn-primary" type="submit" onclick="location.reload()">Nuovo biglietto</button>
        </div>
    </div>`;
}

// Funzione che recupera i dati dell'input, calcola tutti i parametri e produce output in console.log
function calc_price()
{
    // ********** Costanti locali **********

    // Costanti booleane che identificano la fascia d'età selezionata
    const   j_18    = document.getElementById('junior').checked;
    const   mid     = document.getElementById('adult').checked;
    const   s_65    = document.getElementById('senior').checked;

    // Acquisizione percorrenza nella variabile globale km
    km      = document.getElementById('distance').value;

    // Inizializzazione di alcune variabili sul caso di default di viaggiatore adulto (prezzo pieno)
    percent_price = adult_price;
    traveler = "Adulto/a";
    percent_str = "Prezzo pieno";

    // Controllo relativo alla congruità della percorrenza chilometrica (inclusione nell'intervallo min/max e valore intero)
    if (km >= min_km && km <= max_km && Math.floor(km) == Math.ceil(km))
    // Percorrenza congrua
    {
        // Controlli finalizzati a determinare il tipo di viaggiatore (fascia d'età), con conseguente settaggio delle relative variabili
        if (j_18)
        // Caso di viaggiatore junior (minorenne - sconto 20%)
        {
            percent_price = junior_price;
            traveler = "Ragazzo/a";
            percent_str = "Sconto 20%";
        }
        else if (s_65)
        // Caso di viaggiatore senior (ultra sessantacinquenne - sconto 40%)
        {
            percent_price = senior_price;
            traveler = "Senior";
            percent_str = "Sconto 40%";
        }

        // Inizializzazione della stringa identificativa del tipo di viaggio, al valore di default (viaggio breve)    
        trip = "Viaggio breve";
        // Controlli finalizzati a determinare il tipo di viaggio (breve, medio o lungo), con settaggio della relativa variabile
        if (km > 50)
        // Caso di viaggio NON breve
        {
            if (km > 250)
            // Caso di viaggio lungo
            {
                trip = "Viaggio lungo";
            }
            else
            // Caso di viaggio medio
            {
                trip = "Viaggio medio";
            }
        }

        // Calcolo del prezzo standard
        regular_price = km * basic_fare;
        regular_str = regular_price.toFixed(2);

        // Calcolo del prezzo effettivo (eventualmente scontato)
        final_price = regular_price * percent_price;
        final_str = final_price.toFixed(2);

        // Calcolo dello sconto eventualmente applicato
        discount = regular_price - final_price;
        discount_str = discount.toFixed(2);

        // ********** Output in console **********
        console.log(" ");
        console.log("** INIZIO **");
        console.log(`${trip} - ${km} Km`);
        console.log(`${traveler} - ${percent_str}`);
        console.log(`Prezzo: ${regular_str} €`);
        console.log(`Pagato: ${final_str} €`);
        console.log(`Sconto: ${discount_str} €`);
        console.log("*** FINE ***");
        output_data();
    }
    else
    // Percorrenza non congrua
    {
        console.log("DATI NON VALIDI");
        alert("I DATI INSERITI NON SONO VALIDI. CLICCA PER RICARICARE LA PAGINA");
        location.reload();
    }
}