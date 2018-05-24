(() => {
  'use strict';

  angular
    .module('ngApp')
    .controller('sliderController', ($scope, sliderFactory, $mdToast) => {
      $scope.noOfCustomers = 3;

      sliderFactory
        .getData()
        .then(response => {
          $scope.data = response.data.data;
          $scope.data.sort(
            (a, b) => b.total_transaction_amount - a.total_transaction_amount,
          );

          $scope.maxValue = $scope.data.length;
          $scope.calculatePercent();
        })
        .catch(err => {
          showToast(
            `An error occurred while fetching data :${
              err.data ? err.data.message : '('
            }`,
          );
        });

      $scope.calculatePercent = function() {
        const totalSpendAllCustomers = sliderFactory.calculateTotalSpend(
          $scope.data,
        );
        const totalSpendOfGroup = sliderFactory.calculateTotalSpend(
          sliderFactory.getGroupOfCustomers($scope.data, $scope.noOfCustomers),
        );

        $scope.percent = Math.round(
          totalSpendOfGroup / totalSpendAllCustomers * 100,
        );
      };

      const showToast = message => {
        $mdToast.show(
          $mdToast
            .simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000),
        );
      };
    });
})();
