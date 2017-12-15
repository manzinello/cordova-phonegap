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

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        var button = document.getElementById("utenti");
        listaUtenti = document.getElementById("lista");
        button.addEventListener('click', this.aggiornaUtenti, false);
    },

    aggiornaUtenti: function () {

        // URL di test per la chiamata HTTP
        var url = "https://jsonplaceholder.typicode.com/users";

        // Effettuo la chiamata
        app.httpGetAsync(url, function (response) {

            var utenti = JSON.parse(response.toString());

            // Pulisco la view...
            listaUtenti.innerHTML = "";

            // Aggiungo un <li></li> per ogni utente
            for (i = 0; i < utenti.length; i++) {
                var node = document.createElement("LI");
                var textnode = document.createTextNode(utenti[i].name);
                node.appendChild(textnode);
                listaUtenti.appendChild(node);
            }

        });

    },

    // Metodo asincrono per effettuare una chiamata HTTP > GET
    httpGetAsync(theUrl, callback) {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {

            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);

        }

        xmlHttp.open("GET", theUrl, true);

        xmlHttp.send(null);

    }

};

app.initialize();