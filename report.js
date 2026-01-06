function printReport(pages)
{
console.log("========");
console.log("REPORT");
console.log("========");

const sortedPages = sortPages(pages);
for(const sortedPages of sortedPages)
{
    const url = sortPages[0];
    const hits = sortedPages[1];
    console.log(`Found ${hits} links to page: ${url}`);
}
console.log("========");
console.log("END REPORT");
console.log("========");


}

function sortPages(Pages)
{
    const pageArr = Object.entries(Pages);
    pageArr.sort((a,b)=>{
        ahits = a[1];
        bhits = b[1];

        return b[1]-a[1];
    })
    return pageArr;
}

module.exports=
{
    sortPages,
    printReport
}