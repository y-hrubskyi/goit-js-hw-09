!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n=null;function a(){t.startBtn.disabled=!t.startBtn.disabled,t.stopBtn.disabled=!t.stopBtn.disabled}t.startBtn.addEventListener("click",(function(){a(),n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),t.stopBtn.addEventListener("click",(function(){a(),clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.7c6bcb52.js.map