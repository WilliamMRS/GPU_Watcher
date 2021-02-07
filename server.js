// TODO:
// EMAIL ALERTS!

/*

    HOW TO USE:

    1. install nodejs from https://nodejs.org/

    2. navigate to the folder where the server.js file lies.

    3. type 'npm install' in cmd

    4. Call initWatcher function and insert your link to watch as a string:
        - initWatcher("your komplett search results here", "the name of the gpu you're watching (for pimp)");
 
    5. type 'node server' in cmd

    6. ??

    7. profit

    8. eksempel
  
 */
const puppeteer = require('puppeteer'); //API for datamining
const colors = require('colors'); // coloring console

global.browser;
global.page;

initPuppeteer = async () => {
    browser = await puppeteer.launch();
    console.log('puppeteer live...');
    page = await browser.newPage();
}

setTimeout(async ()=>{
    await initPuppeteer();
    await checkAvaliability('https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203060%20Ti',"3060 ti");
    await checkAvaliability(`https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203070&hits=48`,"3070");
    await checkAvaliability('https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203080&hits=48',"3080");
    //checkAvaliability('https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203090&hits=48',
    //            "3090");

    printLastChecked();
}, 10); // Time interval in ms (don't go too fast, or komplett may block ur ip for spam)

setInterval(async ()=>{
    await checkAvaliability('https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203060%20Ti',"3060 ti");
    await checkAvaliability(`https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203070&hits=48`,"3070");
    await checkAvaliability('https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203080&hits=48',"3080");
    //checkAvaliability('https://www.komplett.no/category/10412/datautstyr/pc-komponenter/skjermkort?nlevel=10000%C2%A728003%C2%A710412&cnet=Grafikkprosessorfabrikant_A03616%20%20%C2%A7NVIDIA&cnet=Grafikkprosessor_A00247%20%20%C2%A7NVIDIA%20GeForce%20RTX%203090&hits=48',
    //            "3090");

    printLastChecked();
}, 30000); // Time interval in ms (don't go too fast, or komplett may block ur ip for spam)

checkAvaliability = async (url, gpuToWatch)=>{
    await page.goto(url, { waitUntil: 'networkidle2' });
    let getAvailability = async() => {
        return await page.evaluate(async () => {
            return await new Promise(resolve => {
                gpulist = document.getElementsByClassName("product-list flexbox-list responsive-form list")[0]
                let info = "";
                for (let i = 0; i<gpulist.length; i++){
                    try{
                        let content = gpulist.childNodes[i].getElementsByClassName("text-content")
                        try{
                            content = content[0].innerText;
                            content = content.replace(/(\r\n|\n|\r)/gm, "");
                            let status = gpulist.childNodes[i].getElementsByClassName("subscribe-product__redirect")[0].querySelector("span").innerText
                            info +=  "\x1b[31m\x1b[89m" + "Ikke på lager... - " + status + " : " + content + "\n";
                        }catch{
                            info += "\x1b[32m\x1b[89m" + `PÅ LAGER !!! ======> ${content}\n`
                        }
                    }catch{
                        // do nothing
                    }
                }
                resolve(info)
            })
        })
    }
    console.log(await getAvailability());
}

printLastChecked = () => {
    let date = new Date();
    console.log("\x1b[37m\x1b[89m" + `last checked: ${date}`);
}
