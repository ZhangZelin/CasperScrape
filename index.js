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
var js;
var links = [];
var casper = require('casper').create(
//);
 {
     pageSettings: {
         loadImages:  false,        // do not load images
         loadPlugins: false         // do not load NPAPI plugins (Flash, Silverlight, ...)
     }
});
casper.options.onResourceRequested = function(C, requestData, request) {
    if ((/https?:\/\/.+?\.css/gi).test(requestData['url']) || requestData['Content-Type'] == 'text/css') {
      //console.log('Skipping CSS file: ' + requestData['url']);
      request.abort();
      }
}
var html;

var url = casper.cli.raw.get('url');
var classifyingselector = casper.cli.raw.get('classifying-selector');

//var url = 'https://www.walmart.ca/en/ip/lego-classic-large-creative-brick-box-10698/6000190449111';
//var classifyingselector = '.pricing-shipping';

//var selector = casper.cli.get('selector');
//var attribute = casper.cli.get('attribute');

// function getLinks() {
//     var links = document.querySelectorAll('a.product-link');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });
// }

casper.options.waitTimeout = 20000;

//'https://www.walmart.ca/search/673419233606'
casper.start(url, function () {
    // Wait for the page to be loaded
    //this.echo(document.querySelectorAll('a.product-link')[0]);
    // js = this.evaluate(function () {
    //         return document;
    // });
    // this.echo(js.all[0].outerHTML);
    //'a[class="product-link"]'
    //console.log(classifyingselector === "a.product-link");
});

casper.then(function(){
    js = this.evaluate(function (classifyingselector) {
         var obj = document.querySelectorAll(classifyingselector);
         return Array.prototype.map.call(obj, function (e) {
             return e.parentElement.innerHTML;
         });
     }, classifyingselector);
    this.waitForSelector(classifyingselector);

    //js = this.evaluate(function () {
    //    return document;
    //});
        // this.echo(js.all[0].outerHTML);
})
// casper.then(function() {
//    // search for 'casperjs' from google form
//    this.fill('form[action="/search"]', { q: 'casperjs' }, true);
// });

// casper.then(function () {
//     html = document.documentElement.outerHTML;
// });

// casper.then(function() {
//     // aggregate results for the 'casperjs' search
//     links = this.evaluate(getLinks);
//     // now search for 'phantomjs' by filling the form again
//     //this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
// });

// casper.then(function() {
//     // aggregate results for the 'phantomjs' search
//     links = links.concat(this.evaluate(getLinks));
// });

//casper.run();
casper.waitForSelector(classifyingselector,function(){
    //this.echo(js.all[0].outerHTML);
    this.echo(js);
});
casper.run(function () {
    // echo results in some pretty fashion
    //this.echo(links.length + ' links found:');
    //this.echo("done").exit();
    this.exit();
    //this.echo(' - ' + links.join('\n - ')).exit();
});