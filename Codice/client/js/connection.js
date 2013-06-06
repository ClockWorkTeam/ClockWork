/*
 * 
 *  Nome: {nome del file}
 *  Package: {package di appartenenza}
 *  Autore: {autore del file}
 *  Data: {data di creazione del file}
 *  Versione: {versione del file}
 * 
 *  Modifiche:
 *  +---------+---------------+------------------+
 *  | Data | Programmatore | Modifiche |
 *  +---------+---------------+------------------+
 *  | AAMMGG | NomeCognome | - [label]metodo1 |
 *  | | | - [label]metodo2 |
 *  | | | - ....           |
 *  +---------+---------------+------------------+
 * 
 * 
 */

define(function(){
  var wsc = new WebSocket('ws://127.0.0.1:8787');
  alert('connection');
  return wsc;
});
