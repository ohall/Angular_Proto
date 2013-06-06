'use strict';

angular.module('SRIProtoWebStormApp')
  .controller('MainCtrl', function ($scope,$location) {
        $scope.trialIndex = 0;
        $scope.testItems = [
            { 	practice:false,
                contentID:'sri.test.instance.6659',
                passage: "One of the reasons racing was so appealing was the excitement. Jeff, John, and Carol " +
                    "were spending their spare time amid the lights and sights, the sounds and the smells of " +
                    "motor racing and with the emotions of winning and losing. The buzzing of the cars " +
                    "around the track, the inherent danger of an accident, and the carnival atmosphere all " +
                    "made racing fun and stimulating. Jeff, the shy little towheaded kid, was the center of " +
                    "attention and his parents were, too, by reflection.",
                question: 'They found racing ________.',
                answers:['scary','fascinating','unethical','profitable']
            },
            { 	practice:false,
                contentID:'sri.test.instance.6660',
                passage: "The Farm had about one hundred acres. Lying in the gently hilly country that stretches" +
                    " southwest of Boston, bordered by primeval forests of pine and dotted with elms and " +
                    "(am I right?) ash trees, with the beautiful river Charles not far away, you can " +
                    "conceive how delightful was the landscape wherever we went; in summer or winter, " +
                    "in the woods or by the river, boating, skating, or walking, there was nothing that " +
                    "was not beautiful. And we were all alone. Except for an occasional farm wagon that " +
                    "rumbled along the quiet country road skirting one side, I never saw any but our own " +
                    "people, though I wandered for miles through the forest and down the river.",
                question: 'The Farm was ________.',
                answers:['rundown','commonplace','gorgeous','productive']
            },
            { 	practice:false,
                contentID:'sri.test.instance.6661',
                passage:"Although he was now 40 years old and an established lawyer and politician, " +
                    "Coolidge was just as careful with money as he had ever been. The Coolidge family" +
                    " home in Northampton was a small, rented, duplex apartment. John and Calvin, Jr.," +
                    " attended public school instead of a private school, which would have been much " +
                    "more expensive. And, unlike many middle-class housewives of the time, " +
                    "Grace did not have a full-time servant or maid. She did much of the housework" +
                    " herself, helped out by a hired girl who came in for the day from time to time. " +
                    "On Mondays, Grace even washed the family laundry, something that few lawyers'" +
                    " wives would have been expected to do themselves, and pinned it to a " +
                    "clothesline in the yard to dry.",
                question: 'The Coolidge family was ________.',
                answers:['famous','frugal','funny','fearful']
            }
        ];

        $scope.questionText = $scope.testItems[$scope.trialIndex].question;


        $scope.selectedIndex  = -1;

        $scope.answerChosen = function(index){
            $scope.selectedIndex = index;
            $scope.getQuestionText();
        };

        $scope.getQuestionText = function(){
            if($scope.selectedIndex > -1){
                $scope.questionText = $scope.testItems[$scope.trialIndex].question.replace('________',$scope.testItems[$scope.trialIndex].answers[$scope.selectedIndex]);
            }else{
                $scope.questionText =  $scope.testItems[$scope.trialIndex].question;
            }
        };

        $scope.goButtonClicked = function(){
            $scope.selectedIndex = -1;

            if ($scope.trialIndex < $scope.testItems.length - 1) {
                $scope.trialIndex++;
                $scope.getQuestionText();
                $scope.$apply();
            } else {
                $scope.endAssessment();
            }

        };

        $scope.endAssessment = function(){
            $location.path('goodbye');
        }
  });




