var request = require('request');
var cheerio = require('cheerio');
var url = 'http://delaware.gov/topics/agencylist_alpha';

var customHeaderRequest = request.defaults({
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A'}
})

customHeaderRequest(url, function(err, resp, body){
  $ = cheerio.load(body);
  links = $('.col-sm-8 a');
  
  $(links).each(function(i, link){
	href = $(link).attr('href')
	
	if(href.indexOf('http') > -1) {
		const execSync = require('child_process').execSync;

		filename = href.replace("https", '').replace("http", '').replace(/\//g, '.').replace('..', '').replace(":", '');
		if(filename[filename.length-1] == "."){
			filename = filename.slice(0,filename.length-1)
		}
		nodeDate = new Date()
		readableDate = (nodeDate.getMonth() + 1).toString() + nodeDate.getDate().toString() + nodeDate.getFullYear().toString()
		code = execSync('blc ' + href + ' -ro > ' + filename + '.brokens-' + readableDate + '.txt');s
	}
  });

  //Now do the top level de.gov site itself
  const execSync = require('child_process').execSync;
  code = execSync('blc ' + url + ' -ro > ' + url + '_brokens.txt' );
});


/* const execSync = require('child_process').execSync;
code = execSync('node -v'); */

//col-sm-8 class of div with links

/* var blc = require('broken-link-checker')

var options = {};

var siteChecker = new blc.SiteChecker(options, {
	robots: function(robots, customData){},
	html: function(tree, robots, response, pageUrl, customData){},
	junk: function(result, customData){},
	link: function(result, customData){

        console.log(result.html.location.line + " " + result.brokenReason + " " + result.url.original)
    },
	page: function(error, pageUrl, customData){},
	site: function(error, siteUrl, customData){},
	end: function(){}
});

siteChecker.enqueue("https://de.gov/"); */