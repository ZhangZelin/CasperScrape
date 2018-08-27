// /**
//  * Scrape job title, url, and location from Taleo jobs page at https://l3com.taleo.net/careersection/l3_ext_us/jobsearch.ftl
//  *
//  * Usage: $ casperjs scraper.js 
//  */
// var casper = require("casper").create({
//     pageSettings: {
//         userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
//     }
// });

// var url = 'https://www.walmart.ca/search/6000192385877';
// //var currentPage = 1;
// var jobs = [];

// var terminate = function() {
//     this.echo("Exiting..").exit();
// };

// // Return the current page by looking for the disabled page number link in the pager
// // function getSelectedPage() {
// //     var el = document.querySelector('li[class="navigation-link-disabled"]');
// //     return parseInt(el.textContent);
// // }

// function getJobs() {
//     console.log("TriHard 7");
//     var rows = document.querySelectorAll('div');
//     console.log(rows);
//     console.log(rows.length);
//     var jobs = [];
//     console.log("get jobs");
//     //var a = row.cells[1].querySelector('a[href*="jobdetail.ftl?job="]');
//     //var l = row.cells[2].querySelector('span');
//     //var job = {};

//     //job['link'] = rows.getAttribute('href');
//     //job['url'] = a.getAttribute('href');
//     //job['location'] = l.innerText;
//     jobs.push(rows.getAttribute('href')); 
//     console.log("push jobs");
//     return jobs;       
// }

// var processPage = function() {
//     console.log("starto 2");
//     jobs = casper.evaluate(getJobs);
//     console.log(jobs);
//     require('utils').dump(jobs);

//     // this.thenClick("div#jobPager a#next").then(function() {
//     //     this.waitFor(function() {
//     //         return currentPage === this.evaluate(getSelectedPage);
//     //     }, processPage, terminate);
//     // });
    
//     return terminate.call(casper);
// };

// casper.start(url);
// console.log("starto");

// casper.waitForSelector('article > a[class="product-link"]', processPage, terminate);
// casper.run();

var links = [];
var casper = require('casper').create();

var url = casper.cli.raw.get('url');
var classifyingselector = casper.cli.raw.get('classifying-selector');
//var selector = casper.cli.get('selector');
//var attribute = casper.cli.get('attribute');

function getLinks() {
    var links = document.querySelectorAll('a.product-link');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}
//'https://www.walmart.ca/search/673419233606'
casper.start(url, function() {
   // Wait for the page to be loaded
   this.waitForSelector(classifyingselector);
   //'a[class="product-link"]'
});

// casper.then(function() {
//    // search for 'casperjs' from google form
//    this.fill('form[action="/search"]', { q: 'casperjs' }, true);
// });

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    //this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    //this.echo(links.length + ' links found:');
    this.echo(links[0]).exit();
    //this.echo(' - ' + links.join('\n - ')).exit();
});