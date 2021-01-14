import gsap from "/node_modules/gsap/all.js"
const gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});



// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/ServiceWorker.js')
//     .then(function(registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     })
//     .catch(function(error) {
//       console.log('Service worker registration failed, error:', error);
//     });
// }



const humb = document.querySelector(".nav_humb");
let navOpen = false;

humb.addEventListener("click", () => !navOpen ? OpenNav() : CloseNav());
window.addEventListener("keydown",(e) => {
    if(e.key == "Escape" && navOpen){
        CloseNav()
    }
})

function OpenNav(){
    gs.to(humb,.2,{
        opacity : 0
    })
    setTimeout(() => {
        humb.src = "/images/icon-close.svg"
    }, 400);
    gs.to(".nav_logo",0,{
        zIndex: 4
    }).to(".nav_options",.3,{
        left: "0vw",
        opacity: 1,
        stagger : 0.2
    }).to(humb,.2,{
        opacity: 1
    },"-=.1")
    document.querySelectorAll(".nav_option").forEach(n => {
        gs.to(n,.25,{
            top: "0px",
            opacity: 1,
            stagger : 0.2
        },"-=.1")
    });
    navOpen = true;
}

function CloseNav(){
    gs.to(humb,.2,{
        opacity : 0
    })
    document.querySelectorAll(".nav_option").forEach(n => {
        gs.to(n,.25,{
            top: "-20px",
            opacity: 0,
            stagger : 0.2
        },"-=.1")
    })
    setTimeout(() => {
        humb.src = "/images/icon-hamburger.svg"
    }, 400);
    gs.to(".nav_options",.3,{
        left: "-100vw",
        opacity: 1,
        stagger : 0.2
    }).to(humb,.2,{
        opacity: 1
    },"-=.2").to(".nav_logo",0,{
        zIndex: 2
    });
    navOpen = false;
}


