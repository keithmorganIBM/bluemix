IBMID = {};

// Request IBMID credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
IBMID.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({ service: 'ibm' });
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();

  var scope = (options && options.requestPermissions) || ['openid'];
  //var scope = (options && options.requestPermissions) || ['profile'];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginStyle = OAuth._loginStyle('ibm', config, options);
  var redirectUri = config.redirectUri || OAuth._redirectUri('ibm', config);
  console.log('redirectUri', redirectUri)
  var url = config.loginUrl || 'https://prepiam.toronto.ca.ibm.com/idaas/oidc/endpoint/default/authorize';

  var loginUrl = url +
    '?client_id=' + config.clientId +
    '&scope=' + flatScope +
    '&redirect_uri=' + redirectUri +
    '&response_type=code' +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  OAuth.launchLogin({
    loginService: "ibm",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: { width: 900, height: 450 }
  });
};
