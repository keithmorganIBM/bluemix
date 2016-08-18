Template.configureLoginServiceDialogForIBMID.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForIBMID.fields = function () {
  return [
    { property: 'clientId', label: 'Client ID' },
    { property: 'secret', label: 'Client Secret' }
  ];
};
