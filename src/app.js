
const gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});
let navOpen = false;

const client = new faunadb.Client({secret : "fnAD_msp8xACAThthJrAuyknawamBVgjOg0lMG5B"})
const q = faunadb.query

let db = new Localbase('db')

const CreateDB = new Promise(resolve => {

    let addToDB = new Promise(added => {
        setTimeout(() => {
            db.collection('Header').add(client.query(
                q.Get(q.Ref(q.Collection('Header'), '287512290876457473'))
            ).then((ret) => ret = ret.data).then(ret => ret))
        }, 10);
    
        db.collection('Leader').add(client.query(
            q.Get(q.Ref(q.Collection('Leader'), '287512425134031361'))
        ).then((ret) => ret = ret.data).then(ret => ret))
    
        db.collection("CreationsList").add(client.query(
            q.Get(q.Ref(q.Collection('CreationsList'), '287512968800764417'))
        ).then((ret) => ret = ret.data))
    
        db.collection("Footer").add(client.query(
            q.Get(q.Ref(q.Collection('Footer'), '287513270679503361'))
        ).then((ret) => ret = ret.data)).then(() => {
            added(db)
        }).catch(() => {
            added(db)
        })
    })

    addToDB.then(() => {
        resolve(db)
    })
})



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./../sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
}



CreateDB.then(r => {
        db.collection('Header').get().then(ret => ret[0]).then( ret => {
            document.querySelector("header").innerHTML = `
                <img src=${ret.BackgroundDesktop} class="hero_img" alt="image hero">
        
                <nav class="nav">
        
                <img src="${ret.Logo}" class="nav_logo" alt="logo">
        
                <div class="nav_options">
                    ${NavMap(ret.Nav)}
                </div>
        
                <img src="/images/icon-hamburger.svg" class="nav_humb" alt="hamb">
        
                </nav>
        
                <div class="title">
                <h1 class="title_h">${ret.Header}</h1>
                </div>
                `
        }).then( () => {
            const humb = document.querySelector(".nav_humb");
            humb.addEventListener("click", () => !navOpen ? OpenNav(humb) : CloseNav(humb));
            window.addEventListener("keydown",(e) => {
                if(e.key == "Escape" && navOpen){
                    CloseNav()
                }
            })
        })
    });

function NavMap(r){
    let list = ""
    r.map(p => list += `<p class="nav_option">${p}</p>`)
    return list;
}
function OpenNav(humb){
    gs.to(humb,.2,{
        opacity : 0
    })
    setTimeout(() => {
        humb.src = "/images/icon-close.svg"
    }, 400);
    gs.to(".nav_logo",0,{
        zIndex: 4,
        position: "fixed"
    }).to(".nav_options",.3,{
        left: "0vw",
        opacity: 1,
        stagger : 0.2
    }).to(humb,.2,{
        opacity: 1,
        zIndex: 2000000,
        position: "fixed",
        right: "5vw"
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
function CloseNav(humb){
    gs.to(".main",0,{
        display: "flex"
    })
    gs.to(".footer",0,{
        display: "flex"
    })
    gs.to(humb,.2,{
        opacity : 0,
        position: "absolute",
        right: "5vw"
    })
    document.querySelectorAll(".nav_option").forEach(n => {
        gs.to(n,.25,{
            top: "-20px",
            opacity: 0,
            stagger : 0.2
        },"-=.1")
    })
    setTimeout(() => {
        console.log(humb.src)
        humb.src = "/images/icon-hamburger.svg"
    }, 400);
    gs.to(".nav_options",.3,{
        left: "-100vw",
        opacity: 1,
        stagger : 0.2
    }).to(humb,.2,{
        opacity: 1
    },"-=.2").to(".nav_logo",0,{
        zIndex: 2,
        position : "relative"
    });
    navOpen = false;
}

CreateDB.then(r => {
        db.collection('Leader').get().then((ret) => ret[0]).then(r => {
            document.querySelector(".leader").innerHTML = `
                <img src=${r.BackgroundDesktop} class="interactive_img" alt="image INTERACTIVE">
                <article class="leader_art">
                    <h2 class="l_art_h">${r.Header}</h2>
                    <p class="l_art_p">${r.p}</p>
                </article>
            `
        });
    })


CreateDB.then(r => {
        db.collection('CreationsList').get().then((ret) => ret[0]).then(r => {
            document.querySelector('.Creations').innerHTML = `
                <article class="creations_art_header">
                        <h2 class="c_art_h_h">${r.Header}</h2>
                        <button class="c_art_h_btn">${r.btn}</button>
                </article>
                <article class="creations_grid">
        
                    ${creationsItems(r.creations)}
        
                </article>
            `
        })
    })

function creationsItems(r){
    let list  = "";
    r.map(r => 
        {list +=`
    <div class="grid_item">
        <img class="item_img" src=${r.imgs.Desktop} alt="deep earth">
        <h3 class="item_h">${r.Header}</h3>
    </div>

    `}
    )
    return list;
}

CreateDB.then(r => {
        db.collection('Footer').get().then((ret) => ret[0]).then(r => {
            document.querySelector('.footer').innerHTML = `
            <div class="media">
            <img src=${r.Logo} class="media_logo" alt="logo">
            <div class="social">
              <div class="social_icon"></div>
              <div class="social_icon"></div>
              <div class="social_icon"></div>
              <div class="social_icon"></div>
            </div>
          </div>
        
          <div class="f_nav">
            <div class="f_nav_list">
                ${FooterList(r.Nav)}
            </div>
            <div class="copyRight">
              <p class="copyRight_p">${r.CopyRight}</p>
            </div>
          </div>
            `
        })
    })

function FooterList(r){
    let list = "";
    r.map(n => {
        list += `
        <p class="f_nav_item">${n}</p>
        `
    })
    return list
}


