const maxScrollTime = 1000 * 15;
const scrollTimeout = 1000 * 4;

class vertretungsplan {
    constructor(name) {
        this.element = document.getElementById(name);
        this.height = this.element.offsetHeight;
        this.scrollPos = 0;
        this.scrollTime = 0;
        this.scrollTimeOut = 0;
    }
}

function tick(plan, delay){
    // Scroll for 15 seconds, then wait 5 seconds and continue
    // And/Or wait 5 seconds when it reaches the end
    // Restart and wait 5 seconds
    // Also add a 5 second delay on top of the page

    if(plan.scrollTimeOut > 0){
        plan.scrollTimeOut -= delay;
        return;
    }

    if(plan.scrollTime <= 0){
        plan.scrollTimeOut = scrollTimeout;
        plan.scrollTime = maxScrollTime;
        plan.element.style.transform = "translateY(0px)";
        return;
    }

    if(plan.scrollTime > 0){
        plan.scrollTime -= delay;
        plan.scrollPos += delay / 10;
        plan.element.style.transform = "translateY(-" + plan.scrollPos + "px)";
        return;
    }

    if(plan.scrollPos >= plan.height){
        plan.scrollTimeOut = scrollTimeout;
        plan.scrollPos = 0;
        return;
    }

    plan.scrollTime = maxScrollTime;
}

const heute = new vertretungsplan("heute");
const morgen = new vertretungsplan("morgen");

const delay = 1000 * 0.01;

setInterval(() => {
    tick(heute, delay);
    tick(morgen, delay);
}, delay);


function fit() {
    var iframes = document.querySelectorAll("iframe")

    for(var id = 0; id < iframes.length; id++) {
        var win = iframes[id].contentWindow
        var doc = win.document
        var html = doc.documentElement
        var body = doc.body
        var ifrm = iframes[id] // or win.frameElement

        var style = win.getComputedStyle(html)
        ifrm.width = parseInt(style.getPropertyValue("width")) // round value
        ifrm.height = parseInt(style.getPropertyValue("height"))
    }

    requestAnimationFrame(fit)
}

addEventListener("load", requestAnimationFrame.bind(this, fit))