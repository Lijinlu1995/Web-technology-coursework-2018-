"use strict"
addEventListener("load", start);

function start() {
var h = document.getElementById("userem");

 if(h != null){
        h.innerHTML = " Hello! "+"<font color='green'>"+getUsername()+"</font>";
 }

}
function getUsername() {
    if(document.cookie == null) {
    return "";
    }
    var ca = document.cookie.split(';');
    if(ca== null){
    return "";
    }
    var cu = ca[0].split('=');
    if(cu == null || cu[1]==null){
    return "";
    }
    return cu[1];
}


