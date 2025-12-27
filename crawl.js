const {JSDOM} = require("jsdom");
function getUrlsFromHtml(htmlBody,baseUrl){
    const urls=[];
    const dom = new JSDOM(htmlBody);
    const linkElements= dom.window.document.querySelectorAll('a');
    for(const linkElements of linkElements)
    {
        console.log(linkElements.href)
    }

    return urls;
}
function normaliseUrl(urlString){
    
    const urlobj = new URL(urlString);
    const hostPath =`${urlobj.hostname}${urlobj.pathname}`;
    if(hostPath.length >0 && hostPath.slice(-1)==='/')
    {
        return hostPath.slice(0,-1);
    }
    return hostPath;
}

module.exports={
    normaliseUrl,
    getUrlsFromHtml
}