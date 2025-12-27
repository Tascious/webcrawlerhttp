const{normaliseUrl, getUrlsFromHtml}= require("./crawl.js");
const {test,expect}= require("@jest/globals");

test("normaliseUrl strip slashes",()=>
{
    const input = "";
    const actual = normaliseUrl(input);
    const expected ="";
    expect(actual).toEqual(expected);
})
test("getUrlFromHtml",()=>
{
    const inputhtmlBody= `
    <html>
        <body>
            <a href="https://blog.tasciousCamp.dev">
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