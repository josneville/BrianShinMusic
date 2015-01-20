module.exports = {
  tile: function($compile){
    var linker = function(scope, element, attrs) {
        var template = '';
        switch(scope.post.type) {
          case 'audio':
            template = scope.post.embed;
            break;
          case 'video':
            template = scope.post.player[2].embed_code;
            break;
          case 'photo':
            template = "<img ng-src='{{post.photos[0].original_size.url}}'>";
        }
        element.html(template);
        $compile(element.contents())(scope);
    }
    return {
      restrict: 'E',
      terminal: true,
      link: linker,
      scope: {
        post: '=',
        index: '='
      }
    }
  },
  resize: function($window, $timeout){
    return {
      restrict: "A",
      link: function (scope, element) {
        var w = angular.element($window);
        $timeout(function(){
          element.height(element.width());
        });
        w.bind('resize', function(){
          element.height(element.width());
        })
      }
   }
  }
}
