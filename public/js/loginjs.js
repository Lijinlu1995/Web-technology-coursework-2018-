"use strict"
addEventListener("load", start);

function start() {
var b = document.getElementById("btn_login");
b.addEventListener("click",validateForm,false);
}

function validateForm(){
    validateEmail("emailAdd");
    validateEmpty("password");
}

function validateEmail(eleId){
   if(validateEmpty(eleId)){
   var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
           var obj = document.getElementById(eleId);
           if(!reg.test(obj.value)){
               setFailureStyle(obj);
               return false;
           }else{
               setSuccessStyle(obj);
               return true;
           }
     }
}

function validateEmpty(eleId){
    var obj = document.getElementById(eleId);
    if(obj != undefined){
        if(obj.value == ""){
            setFailureStyle(obj);
            return false;
        }else{
            setSuccessStyle(obj);
            return true;
        }
    }
}


function setFailureStyle(obj){
    obj.className = "failure";
    var spanObj = document.getElementById(obj.id+"Span");
    if(spanObj != null){
        spanObj.innerHTML = "<font color='red'>×</font>";
    }
}

function setSuccessStyle(obj){
    obj.className = "success";
    var spanObj = document.getElementById(obj.id+"Span");
    if(spanObj != null){
        spanObj.innerHTML = "<font color='green'>√</font>";
    }
}




