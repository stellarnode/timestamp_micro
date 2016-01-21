'use strict';

(function() {
    
    var interaction = document.getElementById("interaction");
    var reqUrl = "";
    
    
    function sendAjax(str) {
        var link = appUrl + "/api/whoami";
        reqUrl = link;
        ajaxFunctions.ajaxRequest("GET", link, displayResult);
    }
    
    function displayResult(res) {
        
        var myNode = document.getElementById("interaction");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        
        var resObj = JSON.parse(res);
        
        var para = document.createElement("p");
        var resWindow = document.createElement("pre");
        var codeFormat = document.createElement("code");
        resWindow.id = "resWindow";
        codeFormat.id = "codeFormat";
        interaction.appendChild(para).innerHTML = "Response in JSON format:";
        interaction.appendChild(resWindow);
        document.getElementById("resWindow").appendChild(codeFormat);
        document.getElementById("codeFormat").innerHTML = JSON.stringify(resObj, null, 4);
    }
    
    
    document.addEventListener("DOMContentLoaded", function() {
        
        sendAjax();
        
    });
    
})();