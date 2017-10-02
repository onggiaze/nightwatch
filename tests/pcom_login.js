module.exports = {
  
  'philly.com: Subscriber Logon' : function (browser) {
    
    let url1 = 'http://www.philly.com/?viewAll=analyticsPlusThirdParty';

    browser
      .url(url1)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('.signinlink', 1000)
      .click('.signinlink')
      .setValue('input.auth0-lock-input[type="email"]', 'tdang@philly.com')
      .setValue('input.auth0-lock-input[type="password"]', 'XXXXXXX')
      .assert.containsText('.auth0-label-submit', 'LOG IN')
      .click('button.auth0-lock-submit[type="submit"]')
      .pause(10000)
      .assert.containsText('.profilelink', 'My Account')
      .end();
  }
  
}
