module.exports = {
  
  
  'Pull one story from philly.com' : function (browser) {
    
    let url1 = 'http://www.philly.com/philly/business/workers-comp-insurance-pennsylvania-pond-lehocky-referrals-20170922.html?viewAll=analyticsPlusThirdParty';

    browser.url(url1, function(result) {
      console.log(result);
      testUrl(browser, url1, 1);
    });

    browser.end();
  },
  
  'Read NYT RSS' : function (browser) {
    let rssUrl = 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';
    
    getRss(rssUrl);
      
    // browser.url(item.link);
      
    browser.end();
 
  }

};


function testUrl(browser, url, counter) {
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

function getRss(rssUrl) {
  
  var FeedParser = require('feedparser');
  var request = require('request'); // for fetching the feed 

  var req = request(rssUrl);
  var feedparser = new FeedParser();
  
  req.on('error', function (error) {
    // handle any request errors 
  });

  req.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream 

    if (res.statusCode !== 200) {
      this.emit('error', new Error('Bad status code'));
    }
    else {
      stream.pipe(feedparser);
    }
  });

  feedparser.on('error', function (error) {
    // always handle errors 
  });

  feedparser.on('readable', function () {
    // This is where the action is! 
    var stream = this; // `this` is `feedparser`, which is a stream 
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
    var item;

    while (item = stream.read()) {
      // console.log(item);
      console.log(item.link);
      
    }
  })
    
  return 1;
}
