const{normaliseUrl, getUrlsFromHtml}= require("./crawl.js");
const {test,expect}= require("@jest/globals");

test("normaliseUrl strip slashes",()=>
{
    const input = "";
    const actual = normaliseUrl(input);
    const expected ="";
    expect(actual).toEqual(expected);
})
test("getUrlFromHtml absolute",()=>
{
    const inputhtmlBody= `
    <html>
        <body>
            <a href="https://blog.tasciousCamp.dev/path/">
                Camp.tascious Blog
            </a>
        </body>
    </html>        
                `;
    const inputBaseUrl="http://blog.tasciousCamp.dev"
    const actual = getUrlsFromHtml(inputhtmlBody,inputBaseUrl);
    const expected =["http://blog.tasciousCamp.dev/path/"];
    expect(actual).toEqual(expected);
})
test("getUrlFromHtml relative",()=>
{
    const inputhtmlBody= `
    <html>
        <body>
            <a href="/path/">
                Camp.tascious Blog
            </a>
        </body>
    </html>        
                `;
    const inputBaseUrl="http://blog.tasciousCamp.dev"
    const actual = getUrlsFromHtml(inputhtmlBody,inputBaseUrl);
    const expected =["http://blog.tasciousCamp.dev"];
    expect(actual).toEqual(expected);
})
test("getUrlFromHtml both",()=>
{
    const inputhtmlBody= `
    <html>
        <body>
            <a href="https://blog.tasciousCamp.dev/path1/">
                Camp.tascious Blog
            </a>
            <a href=/path2/>
            camp.tascious.Blog
            </a>
        </body>
    </html>        
                `;
    const inputBaseUrl="http://blog.tasciousCamp.dev"
    const actual = getUrlsFromHtml(inputhtmlBody,inputBaseUrl);
    const expected =["http://blog.tasciousCamp.dev/path1/","http://blog.tasciousCamp.dev/path2/"];
    expect(actual).toEqual(expected);
})
test("getUrlFromHtml invalid",()=>
{
    const inputhtmlBody= `
    <html>
        <body>
            <a href="invalid">
            Unknown url
            </a>
        </body>
    </html>        
                `;
    const inputBaseUrl="http://blog.tasciousCamp.dev"
    const actual = getUrlsFromHtml(inputhtmlBody,inputBaseUrl);
    const expected =[];
    expect(actual).toEqual(expected);
})

