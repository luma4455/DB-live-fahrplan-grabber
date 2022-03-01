const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

nightmare
  .goto('https://iris.noncd.db.de/wbt/js/index.html?typ=ab&style=an&bhf=EE&Zeilen=15')
  .wait(1000)
  .evaluate(() => document.body.innerHTML)
  .end()
  .then(function(data){
    const dom = new JSDOM(data);
    //console.log(dom.window.document.getElementById("0").tBodies[0].innerHTML)

                    var tr = dom.window.document.getElementById("0").tBodies[0].querySelectorAll("tr")

                for (let i = 0; i < tr.length; i++) {
                    let item = tr[i];
                    //console.log(item.id)
                    console.log("--------------------------------------------------------------------------------------------------")
                    var time = dom.window.document.getElementById(item.id + "-0").innerHTML
                    var train = dom.window.document.getElementById(item.id + "-1").innerHTML
                    try {
                      var from = dom.window.document.getElementById(item.id + "-2").querySelectorAll("span")[0].innerHTML //!
                      var from = from.replace(/&nbsp;/g, ' ');
                    }catch(err){
                      var from = ""; //!
                    }
                    try {
                      var path = dom.window.document.getElementById(item.id + "-4").querySelectorAll("span")[0].innerHTML //!
                      var path = path.replace(/&nbsp;/g, ' ');
                      var path = path.replace(`<img src="../img/content/plane.png" class="imgflughafen">`, '');
                    }catch(err){
                      var path = ""; //!
                    }
                    try {
                      var tripmessage = dom.window.document.getElementById(item.id + "-5").querySelectorAll("span")[0].innerHTML //!
                      var tripmessage = tripmessage.replace(/&nbsp;/g, ' ');
                    }catch(err){
                      var tripmessage = ""; //!
                    }
                    try {
                      var platform = dom.window.document.getElementById(item.id + "-6").querySelectorAll("span")[0].innerHTML //!
                      var platform = platform.replace(/&nbsp;/g, ' ');
                    }catch(err){
                      var platform = ""; //!
                    }



                    console.log(`[${time}] ${train} - ${from} [ ${path} ] ( ${tripmessage} ) - ${platform}`)
                  }
  })
  .catch(error => {
    console.error('Search failed:', error)
  })

