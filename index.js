'use strict';

angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, ['mean']);

});

function processModules(modules) {
  var packageModules = ['ngCookies', 'ngResource', 'ui.router', 'ngMaterial','ngTable','ngMdIcons','datePicker', 'checklist-model','vAccordion'],m,mn;
  for (var index in modules) {
    m = modules[index];
    mn = 'mean.'+m.name;
    angular.module(mn, m.angularDependencies || []);
    packageModules.push(mn);
  }
  angular.module('mean', packageModules);
}
var getJSON = function(url,async, success, error) {
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", url, async);
    xhr.send();

};

getJSON('/_getModules',false, function(data) {
  processModules(data);
}, function(status) {
  alert('Something went wrong.');
});


