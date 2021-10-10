const http = require("http");
const fs = require("fs");
const url = require("url");
 
const PORT = 3002;
const mimeTypes = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".ico": "image/ico",
    ".csv": "text/csv"
}

data = fs.readFileSync('./public/List.csv', {encoding: "UTF-8"}, function(err, data){
    if(err){
      throw new Error(err)  
    }else{
    return data
    }
})
data = data.substring(1)
let arr = []
        let line = data.split("\r\n")
        for(i of line){
            let el = i.split(";")
            arr.push(el)
        }
console.log(arr)

s=""
arr.forEach(el =>{
    s+=`<div class="row"><img class="coffee" src="${el[0]}"><p class="wr">${el[1]}</p></div>\n`
})
console.log(s)




const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/") {
        fs.readFile("./public/What.html", (e, d) => {
            if(e){
                throw new Error(err)
            }else{
                res.writeHead(200, {
                    "Content-Type": "text/html"
                })
                res.write(d, "utf-8")
                res.write(s, "utf-8");
                res.write("</body></html>");
                res.end()
            }
        })
    } else {
        let fileExt = req.url.split(".");
        fileExt = "." + fileExt[fileExt.length - 1]
        console.log(fileExt)
        if(fileExt !== ".ico" && fileExt !== ".html"){
                res.writeHead(200, {
                "Content-Type": mimeTypes[fileExt]
            })
        }
        if (fileExt === ".png" || fileExt === ".jpg") {
            fs.readFile("./public" + req.url, (e, d) => {
                res.write(d, "binary");
                res.end()
            })
        }else{
            fs.readFile("./public" + req.url, (e, d) => {
                if(!e){
                res.write(d, "utf-8");
                }
                res.end()
            })
        }

    }
})
 
server.listen(PORT, err => console.log("HEEEEEEEEEEE?"))