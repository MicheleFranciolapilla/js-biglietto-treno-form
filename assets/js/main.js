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

// Costanti utilizzate per determinare il codice nel ticket
const       max_car_nr      = 15;
const       max_seat_row    = 32;

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

let         pass_ticket     = "";

// Variabili stringa rappresentanti le variabili numeriche regular_price, final_price, discount con due cifre decimali
let         regular_str     = "";
let         final_str       = "";  
let         discount_str    = "";     

// Variabili stringa che riceveranno i valori in input relativamente a nome, cognome, genere
let         passenger_name  = "";
let         passenger_surn  = "";
let         passenger_gend  = ""; 

// Variabile stringa che conterrà le classi relative all'icona f.a. da stampare sul ticket, a seconda del genere
let         passenger_icon  = "";

// Variabile che identificherà la carrozza
let         passenger_car   = 0;

// Variabile che identificherà il posto a sedere
let         passenger_seat  = "";

// Variabile che identificherà il codice del ticket
let         passenger_code  = "";

// Funzione che genera un numero intero randomico entro un valore massimo
function int_random_max(max_v)
{
    return Math.floor(Math.random() * max_v);
}

// Funzione che genera un numero intero randomico entro un range (min/max)
function int_random_range(min_v, max_v)
{
     if (max_v > min_v)
     {
         return min_v + int_random_max(max_v - min_v);
     }
     else
     {
         return -1;
     }
 }

//  Funzione che disabilita tutti i campi di input, pulsanti inclusi, dopo la conferma dei dati stessi
// Il parametro booleano dovrebbe consentire il toggling (disattivazione/attivazione) ma nel programma la funzione viene richiamata solo una volta, per la disattivazione (disabilitazione)
function input_toggle(bool_str)
{
    let toggleable_tags = document.querySelectorAll(".en_dis_toggle");
    console.log(toggleable_tags);

    for (let i = 0; i < toggleable_tags.length; i++)
    {
        toggleable_tags[i].disabled = (bool_str);
    }
}

// Funzione che consente l'uscita da offcanvas, senza l'obbligo del click sul campo apposito, con conseguente ricaricamento della pagina
function quit_offcanvas_reload()
{
    // DIO BENEDICA STACK OVERFLOW
    let offcanvas_var = bootstrap.Offcanvas.getInstance(your_ticket);
    offcanvas_var.hide();
    window.location.reload();
}

// Funzione che dialoga con l'utente in modi differenti, a seconda che si richieda la stampa cartacea del ticket o l'invio attraverso email
function print_mail_ticket(do_mail)
{
    let info_box = "";

    // Funzione locale che augura buon viaggio al cliente, dopo aver stampato il ticket e prima di ricaricare la pagina
    function ready_to_quit()
    {
        info_box.innerHTML = "<h4>Buon viaggio</h4>";
        setTimeout(function(){quit_offcanvas_reload()}, 5000);
    }

    // Disabilitazione di tutti i pulsanti dell'offcanvas dopo che si sia scelto di stampare o inviare con email
    document.querySelector("#print_ticket").disabled = true;
    document.querySelector("#mail_ticket").disabled = true;
    document.querySelector("#close_offcanvas").disabled = true;

    if (do_mail)
    {
        // Caso in cui si sia scelto di inviare con email
        let mail_input_box = document.createElement("div");
        mail_input_box.setAttribute("id", "mail_dialog");
        mail_input_box.className = "w-75 h-25";
        mail_input_box.className += " p-3 border border-primary border-3 rounded-3";
        mail_input_box.classList.add("position-absolute", "top-0", "start-50", "translate-middle", "bg-dark");
        mail_input_box.innerHTML = 
        `<form class="row p-2">
            <div class="col-1">
                <label for="email_input" class="form_label text-white-50 pt-1">Email:</label>
            </div>
            <div class="col-6 offset-1">
                <input type="email" class="form-control" id="email_input" placeholder="email@dominio.xxx">
            </div>
            <div class="col-3 offset-1">
                <button type="submit" class="btn btn-primary">Conferma email</button>
            </div>
        </form>`;
        document.querySelector(".offcanvas").append(mail_input_box);
    }    
    else
    {
        // Caso in cui si sia scelto di stampare il ticket
        info_box = document.createElement("div");
        info_box.className = "w-25 h-25 bg-dark";
        info_box.className += " p-3 border border-primary border-3 rounded-3 text-white-50 text-center";
        info_box.classList.add("position-absolute", "top-0", "start-50", "translate-middle");
        info_box.innerHTML = "<h5>Biglietto in stampa</h5>";
        document.querySelector(".offcanvas").append(info_box);
        setTimeout(function(){ready_to_quit()}, 7000);
    }
}

// Funzione che restituisce una card esaustiva di output e consente l'elaborazione di un nuovo ticket
function output_data()
{
    let seat_index = int_random_max(4) + 1;
    let seat_nr = int_random_max(max_seat_row) + 1;
    passenger_seat = seat_nr.toString();
    // Lo switch seguente viene usato per attribuire una lettera al posto a sedere
    switch (seat_index)
    {
        case 1:
            passenger_seat += "A";
            break;
        case 2:
            passenger_seat += "B";
            break;        
        case 3:
            passenger_seat += "C";
            break;        
        default:
            passenger_seat += "D";
    }

    // Carrozza random
    passenger_car = int_random_max(max_car_nr) + 1;

    // A seguire, vengono attribuiti tutti i valori al biglietto, molti dei quali randomici
    // A seconda del genere del viaggiatore viene mostrato uno specifico messaggio di cortesia ed una specifica icona
    document.querySelector("#passenger #p_title").innerHTML = passenger_gend;
    document.querySelector("#p_icon > i").className = passenger_icon;
    document.querySelector("#passenger #p_surn").innerHTML = passenger_surn;
    document.querySelector("#passenger #p_name").innerHTML = passenger_name;
    document.querySelector("#pass_car h4").innerHTML = passenger_car;
    document.querySelector("#pass_seat h4").innerHTML = passenger_seat;
    document.querySelector("#pass_code h4").innerHTML = passenger_code;
    document.querySelector("#pass_fare h4").innerHTML = pass_ticket;
    document.querySelector("#pass_price h4").innerHTML = `${final_str} €`;
  
    // Output parziale dei dati e pulsanti di avanzamento al ticket completo o alla ricarica della pagina
    document.getElementById('output_area').innerHTML += 
    `<div class="row w-100 p-3 border border-info rounded-3 py-2">
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
    </div>
    <div class="align-self-center mt-3">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#your_ticket" aria-controls="your_ticket">Ottieni biglietto</button>
        <button class="btn btn-success" type="button" onclick="window.location.reload()">Nuovo biglietto</button>
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

    // Costanti che identificano il genere
    const   gend_w  = document.getElementById('woman').checked; 
    const   gend_m  = document.getElementById('man').checked; 
    const   gend_o  = document.getElementById('other').checked; 

    // Variabili di identificazione dei dati inseriti
    let     km_str  = "";
    let     jas_str = "";
    let     gnd     = 3;

    // Richiamo della funzione che disabilita tutti i campi di input_toggle, pulsanti inclusi
    input_toggle("true");

    // Elaborazione dei dati di input ed inizializzazione (sul genere: altro) del titolo di cortesia e delle classi dell'icona f.a. specifica
    passenger_name = document.getElementById('given_name').value;
    passenger_name = passenger_name.toLowerCase();
    passenger_name = passenger_name.charAt(0).toUpperCase() + passenger_name.slice(1);
    passenger_surn = document.getElementById('last_name').value;
    passenger_surn = passenger_surn.toUpperCase();
    passenger_gend = "Gentile ";
    passenger_icon = "fa-solid fa-user";
    gnd = 3;

    if (gend_w)
    {
        // Caso in cui il passeggero è una donna
        passenger_gend += "Signora ";
        passenger_icon = "fa-regular fa-user";
        gnd = 1;
    }
    else if (gend_m)
    {
        // Caso in cui il passeggero è un uomo
        passenger_gend += "Signor ";
        passenger_icon = "fa-solid fa-user-tie";
        gnd = 2;
    }

    // Acquisizione percorrenza nella variabile globale km
    km      = document.getElementById('distance').value;

    // Inizializzazione di alcune variabili sul caso di default di viaggiatore adulto (prezzo pieno) e di alcuni dati che comporranno il codice del ticket
    percent_price = adult_price;
    traveler = "Adulto/a";
    percent_str = "Prezzo Standard";
    pass_ticket = "Standard";
    jas_str = "a";
    km_str = "050C";

    // Controllo relativo alla congruità della percorrenza chilometrica (inclusione nell'intervallo min/max e valore intero) e dei dati nome e cognome (diversi da stringa vuota)
    if (km >= min_km && km <= max_km && Math.floor(km) == Math.ceil(km) && passenger_name != "" && passenger_surn != "")
    // Dati congrui
    {
        // Controlli finalizzati a determinare il tipo di viaggiatore (fascia d'età), con conseguente settaggio delle relative variabili
        if (j_18)
        // Caso di viaggiatore junior (minorenne - sconto 20%)
        {
            percent_price = junior_price;
            traveler = "Ragazzo/a";
            percent_str = "Sconto Ragazzi (20%)";
            pass_ticket = "Junior";
            jas_str = "j";
        }
        else if (s_65)
        // Caso di viaggiatore senior (ultra sessantacinquenne - sconto 40%)
        {
            percent_price = senior_price;
            traveler = "Senior";
            percent_str = "Sconto Over 65 (40%)";
            pass_ticket = "Senior";
            jas_str = "s";
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
                km_str = "999L";
            }
            else
            // Caso di viaggio medio
            {
                trip = "Viaggio medio";
                km_str = "250M";
            }
        }

        // Creazione della stringa "codice"
        passenger_code = passenger_surn.charAt(0) + passenger_name.charAt(0) + km_str + jas_str + gnd;
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
        console.log(passenger_gend);
        console.log(passenger_name);
        console.log(passenger_surn);
        console.log(`${trip} - ${km} Km`);
        console.log(`${traveler} - ${percent_str}`);
        console.log(`Prezzo: ${regular_str} €`);
        console.log(`Pagato: ${final_str} €`);
        console.log(`Sconto: ${discount_str} €`);
        console.log("*** FINE ***");
        output_data();
    }
    else
    // Dati non congrui
    {
        console.log("DATI NON VALIDI");
        alert("I DATI INSERITI NON SONO VALIDI. CLICCA PER RICARICARE LA PAGINA");
        window.location.reload();
    }
}

// Creazione del pulsante di abbandono del sito
let quit_page = document.createElement("button");
quit_page.className = "position-absolute bottom-0 start-50 translate-middle-x mb-3";
quit_page.classList.add("btn", "btn-light");
quit_page.setAttribute("type", "button");
quit_page.setAttribute("onclick", "window.close()");
quit_page.innerText = "Abbandona il sito";
document.querySelector(".h100vh").append(quit_page);