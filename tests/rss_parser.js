const feedparser = require('feedparser-promised');
//const rssUrl = 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';
const rssUrl = 'http://www.philly.com/templates/RSS_Feed_of_Recently_Published_PMN_Content';

module.exports = {
  
  'Read PHILLY RSS' : function (browser) {

    feedparser.parse(rssUrl).then( 
      (items) => { items.forEach(function(item) {
        console.log("Title: ", item.title);
        browser.url(item.link + '?viewAll=analyticsPlusThirdParty');
        // browser.url(item.link);
        browser.pause(5000); 
      });
      browser.end();
    }).catch(error => console.error('error: ', error));
    // browser.end(); 
  }

};


function loadUrl(browser, url, counter) {
   browser
      .execute(function() {
        return window.localStorage.getItem('jStorage');
      }, [], function(result) {
        // console.log(result);
        let conneXt = JSON.parse(result.value);
        if (conneXt.Connext_CurrentConversations) {
          this.assert.equal(conneXt.Connext_CurrentConversations.Metered.Props.views, counter);
          this.assert.equal(conneXt.Connext_CurrentConversations.Metered.Props.paywallLimit, 11);
        } else {
          console.log("Uh oh");
        }
      })
}

