/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var websocket = null;
var numberOfMessage;
function init() {
    numberOfMessage = 0;
    document.getElementById("close").style.display = "none";
}
function closeServerEndpoint() {
    websocket.close(4001, "close connection from client.");
    document.getElementById("connect").style.display = "block";
    document.getElementById("close").style.display = "none";
    document.getElementById("server-port").disabled = false;
}
function connectServerEndpoint() {
    var host = document.getElementById("server-port").value;
    var wsUri = "ws://" + host + "/WebSocket-HoL/infotrans";
    if ("WebSocket" in window) {
        websocket = new WebSocket(wsUri);
    } else if ("MozWebSocket" in window) {
        websocket = new MozWebSocket(wsUri);
    } else {
        websocket = new WebSocket(wsUri);
    }
    websocket.onopen = function (evt) {
        onOpen(evt);
    };
    websocket.onmessage = function (evt) {
        onMessage(evt);
    };
    websocket.onerror = function (evt) {
        onError(evt);
    };
    websocket.onclose = function (evt) {
        closeServerEndpoint();
    };
    document.getElementById("connect").style.display = "none";
    document.getElementById("close").style.display = "block";
    document.getElementById("server-port").disabled = true;
}
function onOpen(evt) {
    ;
}
function onMessage(evt) {
    writeToScreen(evt.data);
    numberOfMessage++;
}
function onError(evt) {
    writeToScreen("ERROR:" + evt.data);
}
function writeToScreen(message) {
    var table = document.getElementById("TBL");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.style.color = "WHITE";
    var textNode = document.createTextNode(message);
    var z = numberOfMessage % 2;
    if (z === 1) {
        cell1.style.backgroundColor = "#669900";
    } else {
        cell1.style.backgroundColor = "#ED9B09";
    }
    cell1.appendChild(textNode);
}
window.addEventListener("load", init, false);


