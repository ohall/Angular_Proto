'use strict';

var app = angular.module('StudentAssessmentApp');

app.controller('SRICtrl', function ($rootScope, $scope, $location, sharedProperties, trialFactory ) {
    $rootScope.skipsRemaining  = 3;

    sharedProperties.setAssessmentTrials( trialFactory.getTrials() );
    sharedProperties.setQuestionText(sharedProperties.getAssessmentTrials()[0].question);

    $rootScope.questionText = sharedProperties.getQuestionText();

    $scope.assessmentTrials = sharedProperties.getAssessmentTrials();

    $rootScope.answers = $scope.assessmentTrials[0].answers;
    $rootScope.passage = $scope.assessmentTrials[0].passage;

    $scope.answerChosen = function(pIndex){ trialFactory.answerChosen(pIndex); };
    $scope.nextButtonClicked = function(){ trialFactory.advanceToNextTrialOrEnd(); };
    $scope.skipButtonClicked = function(){ trialFactory.nextButtonClicked(); };

});


app.controller('SRCCtrl', function($rootScope, $scope, $location, sharedProperties, trialFactory ){

   sharedProperties.setAssessmentTrials( trialFactory.getTrials() );
   sharedProperties.setQuestionText(sharedProperties.getAssessmentTrials()[0].question);

   $rootScope.questionText = sharedProperties.getAssessmentTrials()[0].question;
   $scope.assessmentTrials = trialFactory.getTrials();

   $rootScope.answers = $scope.assessmentTrials[0].answers;

   $scope.answerChosen = function(pIndex){ trialFactory.answerChosen(pIndex); };
   $scope.nextButtonClicked = function(){ trialFactory.advanceToNextTrialOrEnd(); };



});


app.factory('trialFactory',function($rootScope, $location, sharedProperties){
    var trialIndex = 0;
    var skipsRemaining = 3;
    $rootScope.selectedIndex = -1;
    var path = $location.path();
    var isSRI = path === "/sri";
    var isSRC = path === "/src";
    return{
        getTrials : function(){//TODO: set by server
            if(isSRI){
                return sharedProperties.getSRITrials();
            }else if(isSRC){
                var books = sharedProperties.getBooks();
                var bookSelectedTitle = sessionStorage.getItem('title');
                for(var i=0;i<books.length;i++){
                    if (books[i].title === bookSelectedTitle){
                        return books[i].trials;
                    }
                }
            }else{
                window.console.log("Quiz type not defines");
                return null;
            }
        },
        answerChosen : function(index){
            $rootScope.selectedIndex = index;
            this.updateQuestionText();
        },
        updateQuestionText : function(){
            var question =  sharedProperties.getAssessmentTrials()[trialIndex].question;
            if($rootScope.selectedIndex > -1){
                sharedProperties.setQuestionText(question.replace('________',
                sharedProperties.getAssessmentTrials()[trialIndex].answers[$rootScope.selectedIndex]));
            }else{
                sharedProperties.setQuestionText(question);
            }
            $rootScope.questionText = sharedProperties.getQuestionText();
        },
        skipButtonClicked : function(){
            if(skipsRemaining > 0){
                skipsRemaining--;
                this.advanceToNextTrialOrEnd();
            }
        },
        advanceToNextTrialOrEnd : function(){
            $rootScope.selectedIndex = -1;
            if (trialIndex < sharedProperties.getAssessmentTrials().length - 1) {
                trialIndex++;
                $rootScope.answers = sharedProperties.getAssessmentTrials()[trialIndex].answers;
                $rootScope.passage =  sharedProperties.getAssessmentTrials()[trialIndex].passage;
                this.updateQuestionText();
            } else {
                this.endAssessment();
            }
        },
        endAssessment : function(){
            if(isSRI){
                $location.path('goodbye');
            }else if(isSRC){
                window.location.href = "index.html";
            }
        }
    };

});



app.service('sharedProperties', function() {

    var questionText        = "";
    var assessmentTrials    = [];

    /**
     * Array of mock SRI trials
     * @type {Array}
     */
    var sriTrials = [
        {   practice:false,
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
        {   practice:false,
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
        {   practice:false,
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


    /**
     * Array of mock books data
     * @type {Array}
     */
    var books = [
        {
            title:"Little House in the Big Woods",
            author:"Wilder, Laura Ingalls",
            description:"The book tells about the months the Ingalls " +
                "family spent on the prairie of Kansas, around the town of " +
                "Independence, Kansas.",
            lexile:200,
            cover:"little_house",
            interest:"Animals",
            date: new Date("May 14, 2013").toDateString(),
            score: 8,
            passed: true,
            words: 9698,
            points: 12,
            trials:[
            {
                question:"Little House is in the ________",
                answers:["Big Woods", "Smelly Swamp", "Dirty Ditch", "Dusty Desert"]
            },
            {
                question:"The family lives in ________",
                answers:["Space", "Kansas", "Jelly Beans", "Jakarta"]
            },
            {
                question:"The name of the town is ________",
                answers:["MySpace", "Gondwanaland", "Independence", "Tuna Fish"]
            }]
        },
        {
            title:"Snow Crash",
            author:"Stephenson, Neal",
            description:"Master swordsman Hiro Protagonist delivers pizzas, " +
                "stumbles onto global mind control " +
                "conspiracy, excellence ensues",
            lexile:300,
            cover:"snow_crash",
            interest:"Ninjas",
            date: new Date("May 14, 2013").toDateString(),
            score: 7,
            passed: false,
            words: 53543,
            points: 9,
            trials:[
                {
                    question:"Hiro loses his pizza delivery job with ________",
                    answers:["The CIA", "The Mafia", "Pizza Hut", "NASA"]
                },
                {
                    question:"Y.T. stands for ________",
                    answers:["Yam Transit", "Yellow Tuba", "Yours Truly", "Young Treezy"]
                },
                {
                    question:"Hiro spends a lot of time in the ________",
                    answers:["Tubes", "Smellovision", "Multiverse", "Metaverse"]
                }]
        },
        {
            title:"The Road",
            author:"McCarthy, Cormac",
            description:"Heartwarming tale of a father and son road trip.  ",
            lexile:100,
            cover:"the_road",
            interest:"Travel",
            date: new Date("May 14, 2013").toDateString(),
            score: 3,
            passed: true,
            words: 1234,
            points: 5,
            trials:[
                {
                    question:"Life in The Road is ________",
                    answers:["a party", "grim and desperate", "clean", "easy"]
                },
                {
                    question:"The boy travels with ________",
                    answers:["his father", "jugglers", "an elephant", "Rob Gronkowski"]
                },
                {
                    question:"The boy and the man are looking for ________",
                    answers:["a new pony", "the good guys", "dance moves", "a frisbee"]
                }]
        }
    ];

    return {
        getSRITrials:       function() { return sriTrials; },
        getBooks:           function() { return books; },
        setAssessmentTrials:function(pArrayOfTrials){ assessmentTrials = pArrayOfTrials; },
        getAssessmentTrials:function(){ return assessmentTrials; },
        setQuestionText:    function(pText){ questionText = pText; },
        getQuestionText:    function(){ return questionText; }
    };
});
