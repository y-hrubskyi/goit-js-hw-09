const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let n=null;function e(){t.startBtn.disabled=!t.startBtn.disabled,t.stopBtn.disabled=!t.stopBtn.disabled}t.startBtn.addEventListener("click",(function(){e(),n=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.stopBtn.addEventListener("click",(function(){e(),clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.17f00e54.js.map