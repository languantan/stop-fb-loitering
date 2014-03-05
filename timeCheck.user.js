// ==UserScript==
// @name       Facebook Time Check
// @namespace  http://github.com/languantan/stop-fb-loitering
// @updateURL  https://raw.github.com/languantan/stop-fb-loitering/master/timeCheck.user.js
// @downloadURL https://raw.github.com/languantan/stop-fb-loitering/master/timeCheck.user.js
// @version    0.1.1
// @description  stops user from spending too much time on facebook by logging user out after some time
// @match      https://www.facebook.com/*
// @copyright  2012+, languantan
// ==/UserScript==


function timeScript(){
      
    window.lgtan = {};
    window.lgtan.timeCheck = function() {
    	var timeout, logoutForm;
        
        //keep trying to find logoutForm
        var findLO = function(){
            logoutForm = document.getElementById('logout_form');
            if (logoutForm){
                console.log('found logoutForm');
                main();
            } else {
                console.log('not logged in');
            }
        }
        
       var main = function(){
            
            timeout = sessionStorage.getItem('fbtime');
            if (!timeout){
                timeout =  prompt('How long do you wanna stay on Facebook?', 'in minutes') * 60000;
                sessionStorage.setItem('fbtime', timeout);
            }
            setInterval(timerAction, 5000);
        }
        
        var timerAction = function(){
            console.log(timeout/1000 + " seconds left");
            timeout -= 5000;
            if (timeout > 0){
                sessionStorage.setItem('fbtime', timeout);
            } else {
                logoutAction();
            }
        }
        
        var logoutAction = function(){
            console.log('Logging out');
            alert('your personally defined time is up');
            sessionStorage.removeItem('fbtime');
            logoutForm.submit();   
        }
        
        findLO();
    }
    
    window.lgtan.timeCheck();
    
}

if (window.top==window.self){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ timeScript +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
}



