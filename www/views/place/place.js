angular.module('App')
.config(function($stateProvider) {
  $stateProvider.state('place', {
    url: '/places/:place_id',
    controller: 'PlaceController as vm',
    templateUrl: 'views/place/place.html',
    resolve: {
      Place: function($http, $stateParams) {
        var url = 'https://civinfo-apis.herokuapp.com/civic/place?place_id=' + $stateParams.place_id;
        return $http.get(url);
      }
    }
  });
})
.controller('PlaceController', function($scope, $ionicLoading, $ionicActionSheet, Place) {
  var vm = this;

  $scope.$on('$ionicView.afterEnter', function() {
    $ionicLoading.hide();
  });

  vm.place = Place.data.result;

  vm.openSheet = function() {
    var sheet = $ionicActionSheet.show({
      titleText: 'Share this place',
      buttons: [
        { text: 'Share via Twitter' },
        { text: 'Share via Facebook' },
        { text: 'Share via Email'}
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          window.open('https://twitter.com/intent/tweet?text=' +
            encodeURIComponent('I found this great place! ' + vm.place.url));
        } else if (index === 1) {
          window.open('https://www.facebook.com/sharer/sharer.php?u=' + vm.place.url);
        } else if (index === 2) {
          window.open('mailto:?subject=' + encodeURIComponent('I found this great place!') + '&body=' + vm.place.url);
        }
        sheet();
      }
    });
  };

});
