/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function () {

        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // Metodo chiamato quando scatta l'evento deviceready
    onDeviceReady: function () {

        // Le sezioni dell'app che andremo a mostrare o nascondere a seconda della sezione "attiva"
        orologio = document.getElementById("orologio");
        allarme = document.getElementById("allarme");

        // Elementi nella sezione Orologio
        ore = document.getElementById("ore");
        minuti = document.getElementById("minuti");
        secondi = document.getElementById("secondi");

        // Elementi nella sezione Allarme
        oreAllarmeHTML = document.getElementById("allarme-ore");
        minutiAllarmeHTML = document.getElementById("allarme-minuti");

        // Variabili intere che rappresentano le ore o i minuti dell'allarme settato
        oreAllarme = 0;
        minutiAllarme = 0;

        // Inserisco timer ogni secondo che aggiorna l'orologio
        setInterval(function () {
            app.aggiornaOrologio();
        }, 1000);

        // Bottoni per switchare tra tutte le sezioni
        var orologioButton = document.getElementById("orologiobutton");
        var allarmeButton = document.getElementById("allarmebutton");

        // Mostro l'orologio al click su Orologio
        orologioButton.addEventListener("click", app.showOrologio, false);

        // Mostro l'allarme al click su Allarme
        allarmeButton.addEventListener("click", app.showAllarme, false);

        // Gestisco le ore dell'allarme
        var aumentaOreButton = document.getElementById("aumenta-ore");
        aumentaOreButton.addEventListener("click", app.aumentaOre, false);
        var diminuisciOreButton = document.getElementById("diminuisci-ore");
        diminuisciOreButton.addEventListener("click", app.diminuisciOre, false);

        // Gestisco i minuti dell'allarme
        var aumentaMinutiButton = document.getElementById("aumenta-minuti");
        aumentaMinutiButton.addEventListener("click", app.aumentaMinuti, false);
        var diminuisciMinutiButton = document.getElementById("diminuisci-minuti");
        diminuisciMinutiButton.addEventListener("click", app.diminuisciMinuti, false);

    },

    // Mostro l'orologio
    showOrologio() {
        orologio.style.display = "block";
        allarme.style.display = "none";
    },

    // Mostro l'allarme
    showAllarme() {
        orologio.style.display = "none";
        allarme.style.display = "block";
    },

    // Mostro gli utenti
    showUtenti() {
        orologio.style.display = "none";
        allarme.style.display = "none";
    },

    // Aumento le ore dell'allarme
    aumentaOre() {
        if (oreAllarme == 23) {
            oreAllarme = 0;
        } else {
            oreAllarme++;
        }
        console.log(oreAllarme);
        app.aggiornaAllarme();
    },

    // Diminuisco le ore dell'allarme
    diminuisciOre() {
        if (oreAllarme == 0) {
            oreAllarme = 23;
        } else {
            oreAllarme--;
        }
        console.log(oreAllarme);
        app.aggiornaAllarme();
    },

    // Aumento i minuti dell'allarme
    aumentaMinuti() {
        if (minutiAllarme == 59) {
            minutiAllarme = 0;
        } else {
            minutiAllarme++;
        }
        console.log(minutiAllarme);
        app.aggiornaAllarme();
    },

    // Diminuisco i minuti dell'allarme
    diminuisciMinuti() {
        if (minutiAllarme == 0) {
            minutiAllarme = 59;
        } else {
            minutiAllarme--;
        }
        console.log(minutiAllarme);
        app.aggiornaAllarme();
    },

    // Aggiorno l'HTML dell'orologio prendendo la data attuale, faccio scattare l'allarme ring() con la condizione...
    aggiornaOrologio() {

        var date = new Date();

        ore.innerHTML = date.getHours();
        minuti.innerHTML = date.getMinutes();
        secondi.innerHTML = date.getSeconds();

        // Condizione per far suonare l'allarme
        if (date.getHours() == oreAllarme && date.getMinutes() == minutiAllarme && date.getSeconds() == 0) {

            console.log("Devo far scattare l'allarme!");
            app.ring();

        }

    },

    // Metodo chiamato per far scattare l'allarme
    ring() {

        // Callback del dialog
        function alertDismissed() {
            console.log("Dialog rimosso...")
        }

        // Faccio vibrare il dispositivo per 2 secondi (2000ms)...
        navigator.vibrate(2000);

        // ...e mostro un dialog
        navigator.notification.alert(
            'Allarme!',
            alertDismissed,
            "Sta suonando l'allarme",
            'Ok'
        );

    },

    // Aggiorno l'HTML dell'allarme
    aggiornaAllarme() {

        console.log("Ore allarme: " + oreAllarme);
        console.log("Minuti allarme: " + minutiAllarme);

        // Mostro uno 0 davanti i numeri di una sola cifra
        if (oreAllarme < 10) {
            oreAllarmeHTML.innerHTML = "0" + oreAllarme;
        } else {
            oreAllarmeHTML.innerHTML = oreAllarme;
        }

        // Mostro uno 0 davanti i numeri di una sola cifra
        if (minutiAllarme < 10) {
            minutiAllarmeHTML.innerHTML = "0" + minutiAllarme;
        } else {
            minutiAllarmeHTML.innerHTML = minutiAllarme;
        }

    }

};

// Inizializzazione dell'app
app.initialize();