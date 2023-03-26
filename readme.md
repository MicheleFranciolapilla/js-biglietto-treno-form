# PROGRAMMA "BIGLIETTO DEL TRENO" #

---

### Il programma è un ampliamento del precedente ###

---

**Il programma, scritto essenzialmente in *Javascript* (con abbondante utilizzo di classi *Bootstrap*) riceve una serie di dati in input:**
-   *dati anagrafici (nome, cognome, genere)*
-   *fascia di età*
-   *chilometraggio del viaggio*

**ed elabora due differenti output:**
-   *riquadro riassuntivo*
-   *biglietto completo*

---

#### Sezione di input: ####
-   **I campi *nome* e *cognome* sono in formato `text` ed hanno un numero minimo e massimo di caratteri preimpostato.**
-   **Il campo *genere* è di tipo `radio-button` e presenta tre opzioni possibili: donna, uomo, altro.**
-   **Il campo *fascia d'età*, anch'esso di tipo `radio-button`, presenta a sua volta tre campi: junior (minorenne), adulto (18/65) e senior (over 65).**
-   **Il campo *distanza*, di tipo `number`, accetta valori interi, compresi tra 1 e 999.**

**In basso sono presenti due pulsanti; il primo dei quali conferma i dati inseriti e rimanda al calcolo del biglietto ed alle sezioni di output, mentre il secondo consente di ricaricare la pagina e reinserire i dati.**
**Alla pressione del pulsante di conferma viene eseguito un *controllo sommario* sulla validità dei dati inseriti e, in caso di esito sfavorevole, compare un messaggio di `alert` che ricarica la pagina, consentendo un nuovo inserimento.**
**Nel caso in cui i dati inseriti siano considerati validi, il programma provvede alla disabilitazione di tutti gli elementi di input (pulsanti inclusi) per poi passare all'output.**

##### Criticità: #####

**La sezione di input è stata realizzata senza il tag `<form>`, ragion per cui i controlli di validità dei dati digitati non sono assolutamente sufficienti ad evitare incongruità.**

---

#### Prima sezione di output: ####

**Nella prima sezione di output, visualizzata subito dopo la conferma degli input, compare un riquadro al cui interno, oltre a due icone *font awesome*, vi sono, riepilogati, alcuni dei dati del viaggio:**
-   ***Percorrenza del viaggio (breve - medio - lungo) con dettaglio dei km.***
-   ***Dettaglio fascia di età con relativo prezzo (scontato o no)***
**Sono inoltre presenti due pulsanti, il primo dei quali consente di passare all'output del ticket completo, mentre il secondo ricarica la pagina, dando la possibilità di ripetere il processo per un nuovo ticket.**

##### Criticità: Nessuna #####

---

#### Seconda sezione di output: offcanvas con ticket ####

**Nella seconda sezione di output (*Bootstrap offcanvas*) è presente il biglietto, completo di tutti i dati inseriti, nonchè di altri dati randomici (carrozza e posto a sedere) o customizzati (titolo di cortesia ed icona f.a. e codice unico)**
**Sotto il ticket sono presenti due pulsanti:**
-   ***stampa***
-   ***via email***

**che consentono, appunto (figurativamente) l'operazione indicata.**
**Entrambi i pulsanti (unitamente al pulsante di uscita dall'offcanvas) vengono disabilitati alla selezione di uno dei due.**
**La selezione dell'opzione *stampa* avvia una simulazione con tanto di tempo di attesa e messaggio di saluto, al termine della quale una funzione *Javascript* provvede alla chiusura dell'offcanvas ed al ricaricamento della pagina.**
**La selezione dell'opzione *via email* apre una finestra di input dell'indirizzo email, con pulsante di conferma e controllo di congruità (avendo, in questa sezione, usato il tag `<form>`), con conseguente ritorno alla home page.**

##### Criticità: #####

**L'utilizzo del tag `<form>` e del pulsante `submit` non consente un ritorno fluido alla home page, inibendo la funzionalità del pulsante *abbandona il sito*.**

---
---
---

**All'interno del file *main.js* sono state utilizzate variabili e costanti al bisogno e sono state definite ed utilizzate una serie di funzioni:**

-   **`function int_random_max(max_v)`: restituisce un numero intero randomico nel range [0..max_v - 1]**
-   **`function int_random_range(min_v, max_v)` restituisce un intero randomico nel range dato dai parametri.**
-   **`function input_toggle(bool_str)` esegue un *toggle* di disabilitazione/abilitazione dei campi di input.**
-   **`function quit_offcanvas_reload()` chiude l'offcanvas e ricarica la pagina.**
-   **`function print_mail_ticket(do_mail)` consente il dialogo con la simulazione di stampa (o invio mail) del ticket.**
-   **`function ready_to_quit()` interna alla funzione precedente ed utilizzata dalla stessa.**
-   **`function output_data()` consente la visualizzazione del primo output.**
-   **`function calc_price()` controlla i dati in ingresso, li elabora e produce tutti i dati utili ai due output.**

---
