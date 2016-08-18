Package.describe({
  name: 'keithmorganIBM:ibmid',
  version: '1.0.0',
  summary: 'IBM ID OAuth flow',
  git: 'https://github.com/keithmorganIBM/ibmid.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.use('oauth2@1.0.0', ['client', 'server']);
  api.use('oauth@1.0.0', ['client', 'server']);
  api.use('http@1.0.0', ['server']);
  api.use('underscore@1.0.0', 'client');
  api.use('templating@1.0.0', 'client');
  api.use('random@1.0.0', 'client');
  api.use('service-configuration@1.0.0', ['client', 'server']);

  api.export('IBMID');

  api.addFiles(['ibmid_configure.html', 'ibmid_configure.js'], 'client');

  api.addFiles('ibmid_server.js', 'server');
  api.addFiles('ibmid_client.js', 'client');
});
