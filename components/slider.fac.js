(() => {
  'use strict';

  const url =
    'https://studio-api.paystack.co/insights/spenders?from=2017-01-01&to=2018-05-23';
  const secretKey = 'sk_test_584bfc762c9d0eeb4f4dc722912f3b22f3c4c925';

  angular.module('ngApp').factory('sliderFactory', ($http) => {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + secretKey;

    const getData = () => $http.get(url);

    const calculateTotalSpend = data => {
      let total = 0;
      for (const datum of data) {
        total += datum.total_transaction_amount;
      }
      return total;
    };

    const getGroupOfCustomers = (data, value) => {
      return data.slice(0, value);
    };

    return {
      getData,
      calculateTotalSpend,
      getGroupOfCustomers,
    };
  });
})();
