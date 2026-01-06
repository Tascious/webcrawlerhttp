const {JSDOM} = require("jsdom");

async function crawlPage(baseURL,currentURL,pages){
const baseURLobj = new URL(baseURL);
const currentURLobj = new URL(currentURL);

if(baseURLobj.hostname!==currentURLobj.hostname)
{return pages;
}

const normalisedCurrentURL = normaliseUrl(currentURL);


if(pages[normalisedCurrentURL]>0)
{pages[normalisedCurrentURL]++;
}

pages[normalisedCurrentURL]=1;
console.log(`actively crawling:${currentURL}`);

const resp    = await fetch(CurrentURL);
const htmBody = await resp.text();
const nextURLs = getUrlsFromHtml(htmlBody,baseURL);

for(const nextURLs of nextURLs)
{
    pages= await crawlPage(baseURL,nextURLs,pages);
}
try
{
if(resp.status>399)
{console.log(`error in fetch with status code:${resp.status} on page:${currentURL}`);
return pages;
}
const contentType = resp.headers.get("content-type");
if(!contentType.includes("text/html"))
{console.log(`non html response, content type:${contentType} on page:${currentURL}`);
return pages;
}
}
catch(err)
{
    console.log(`error in fetch : ${err.message}`)
}
return pages;
}
function getUrlsFromHtml(htmlBody,baseUrl){
    const urls=[];
    const dom = new JSDOM(htmlBody);
    const linkElements= dom.window.document.querySelectorAll('a');
    for(const linkElements of linkElements)
    {    if(linkElements.href.slice(0,1)==='/')
            {
            try{
                const urlString = new URL(`${baseUrl}${linkElements.href}`)
                urls.push(urlString.href)

            }catch(err)
            {
                console.log(`error with relative url :${err.message}}`);
            }
                
            }else
            {
                try{
                    const urlString = new URL(linkElements.href)
                    urls.push(urlString.href)

                    }
                catch(err)
                    {
                    console.log(`error with absolute url :${err.message}}`);
                    }
            }
    
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
    getUrlsFromHtml,
    crawlPage
}