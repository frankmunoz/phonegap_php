var todos = angular.module('todos', ['ui.bootstrap']);

todos.controller('TodoController', function($scope) {
   $scope.filteredTodos = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 5
  ,$scope.maxSize = 5;

  $scope.makeTodos = function() {
    $scope.todos = [];
    for (i=1;i<=1000;i++)
    $scope.todos=[

       {'phone': 'Nexus S'},
       {'phone': 'Motorola XOOM™ with Wi-Fi'},
       {'phone': 'MOTOROLA XOOM™'},
       {'phone': 'Nexus S'},
       {'phone': 'Motorola XOOM™ with Wi-Fi'},
       {'phone': 'eeeeee XOOM™'},
       {'phone': 'Nexus S'},
       {'phone': 'Motorola XOOM™ with Wi-Fi'},
       {'phone': 'MOTOROLA XOOM™'},
       {'phone': 'Nexus S'},
       {'phone': 'ffffff XOOM™ with Wi-Fi'},
       {'phone': 'MOTOROLA XOOM™'},
       {'phone': 'Nexus S'},
       {'phone': 'Motorola XOOM™ with Wi-Fi'},
       {'phone': 'MOTOROLA XOOM™'},
       {'phone': 'Nexus S'},
       {'phone': 'Motorola XOOM™ with Wi-Fi'},
       {'phone': 'MOTOROLA XOOM™'}




    ];
  };
  $scope.makeTodos();

  $scope.numPages = function () {
    return Math.ceil($scope.todos.length / $scope.numPerPage);
  };

  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;

    $scope.filteredTodos = $scope.todos.slice(begin, end);
  });
});
