'use strict';

var app = angular.module('SRIProtoWebStormApp', []);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/',{
      templateUrl:'views/login.html',
      controller: 'GoodByeCtrl'
       })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/goodbye',{
      templateUrl:'views/goodbye.html',
      controller: 'GoodByeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
//
//app.directive('myView', function ($http, $templateCache, $route, $anchorScroll, $compile, $controller) {
//    return {
//        restrict:'ECA',
//        terminal:true,
//        link:function (scope, parentElm, attr) {
//            var TRANSITION_TIME = 1000,
//                partials = [],
//                inClass = attr.inClass,
//                outClass = attr.outClass,
//                currentPartial, lastPartial;
//
//            scope.$on('$routeChangeSuccess', update);
//            update();
//
//            //'Angularize' a partial: Create scope/controller, $compile element, insert into dom
//            function setupPartial(partial) {
//                var cur = $route.current;
//                partial.scope = cur.locals.$scope = scope.$new();
//                partial.controller = $controller(cur.controller, cur.locals);
//                partial.element.contents().data('$ngControllerController', partial.controller);
//                $compile(partial.element.contents())(partial.scope);
//                parentElm.append(partial.element);
//                partial.scope.$emit('$viewContentLoaded');
//            }
//
//            //Create just an element for a partial
//            function createPartial(template) {
//                return {
//                    element: angular.element('<div>').html(template)
//                };
//            }
//
//            function destroyPartial(partial) {
//                partial.scope.$destroy();
//                partial.element.remove();
//                partial = null;
//            }
//
//            /*//Transition end stuff from bootstrap:
//             //http://twitter.github.com/bootstrap/assets/js/bootstrap-transition.js
//             var transEndEventNames = {
//             'WebkitTransition': 'webkitTransitionEnd',
//             'MozTransition': 'transitionend',
//             'OTransition': 'oTransitionEnd otransitionend',
//             'transition': 'transitionend'
//             };
//             function onTransitionEnd(el, callback) {
//             for (name in transEndEventNames) {
//             if (el.style[name] !== undefined) {
//             el.on(transEndEventNames[name], callback);
//             }
//             }*/
//
//            function transition(inPartial, outPartial) {
//                inPartial.element.addClass(inClass);
//                if (outPartial) outPartial.element.addClass(outClass);
//                if (outPartial) destroyPartial(outPartial);
//                setTimeout(function() {
//                    inPartial.element.removeClass(inClass);
//
//                    updatePartialQueue();
//                }, TRANSITION_TIME);
//            }
//
//            function updatePartialQueue() {
//                //Bring in a new partial if it exists
//                if (partials.length > 0) {
//                    var newPartial = partials.pop();
//                    setupPartial(newPartial);
//                    transition(newPartial, currentPartial);
//                    currentPartial = newPartial;
//                }
//            }
//
//            function update() {
//                if ($route.current && $route.current.locals.$template) {
//                    partials.unshift(createPartial($route.current.locals.$template));
//                    updatePartialQueue();
//                }
//            }
//        }
//    };
//});