/*
 *
 *  Nome: connection
 *  Package: client
 *  Autore: Ceseracciu Marco
 *  Data: 2013/05/19
 *  Versione: 1.0
 *
 *  Modifiche:
 *  +--------+---------------+-----------------------+
 *  | Data   | Programmatore |     Modifiche         |
 *  +--------+---------------+-----------------------+
 *  | 130519 |      CM       | + creazione documento |
 *  +--------+---------------+-----------------------+
 *
 *
 */

define(function(){
  var wsc = new WebSocket('ws://127.0.0.1:8787');
  return wsc;
});
