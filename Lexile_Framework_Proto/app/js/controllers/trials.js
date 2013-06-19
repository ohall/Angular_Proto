'use strict';

var app = angular.module('StudentAssessmentApp');

app.controller('TrialCtrl', function ($scope, $location, sharedProperties ) {

    /**
     * Set in html view making use of this controller with ng-init
     * @type {string}
     */
    $scope.quizType = "sri";


    /**
     * Index of trial we're on
     * @type {number}
     */
    $scope.trialIndex = 0;

    $scope.isSRI = $scope.quizType === sharedProperties.getQuizTypeSRI;
    $scope.isSRC = sharedProperties.getQuizTypeSRC() === $scope.quizType;

    /**
     * Get SRI trials if this is and SRI test or books if this is SRC
     * In the latter case grep for book title passed in via sessionStorage
     * @type {Array}
     */
    $scope.trials = function(){//TODO: set by server

        if($scope.isSRI){
            return sharedProperties.getSRITrials();
        }else if($scope.isSRC){
            var books = sharedProperties.getBooks();
            var bookSelectedTitle = sessionStorage.getItem('title');
            var book = $.grep(books, function(e){
                return bookSelectedTitle === e.title; });
            return book.trials;
        }else{
            return [];
        }


    };





    /**
     * Question for current trial
     * @type {string}
     */
    $scope.questionText = $scope.trials()[$scope.trialIndex].question;


    /**
     * Index of answer chosen by student
     * Defaults to -1 for none selected
     * @type {number}
     */
    $scope.selectedIndex  = -1;

    /**
     * Number of questions remaining which student can skip.
     * Will be defined by server in the future.
     * @type {number}
     */
    $scope.skipsRemaining  = 3;

    /**
     * Array of answers available to be selected
     * @type {*}
     */
    $scope.answers = $scope.trials[$scope.trialIndex].answers;

    /**
     * ngClick handler for answers, takes index
     * @param index of the answer selected
     */
    $scope.answerChosen = function(index){
        $scope.selectedIndex = index;
        $scope.getQuestionText();
    };

    /**
     * Update the model with new question text
     */
    $scope.getQuestionText = function(){
        if($scope.selectedIndex > -1){
            $scope.questionText = $scope.trials[$scope.trialIndex].question.replace('________',$scope.trials[$scope.trialIndex].answers[$scope.selectedIndex]);
        }else{
            $scope.questionText =  $scope.trials[$scope.trialIndex].question;
        }
    };

    /**
     * nextButton enabled on answer selection, if clicked, advance
     */
    $scope.nextButtonClicked = function(){
        $scope.advanceToNextTrialOrEnd();
    };


    /**
     * If skips remaining, decrement skipsRemaining and advance
     */
    $scope.skipButtonClicked = function(){
        if($scope.skipsRemaining > 0){
            $scope.skipsRemaining--;
            $scope.advanceToNextTrialOrEnd();
        }
    };

    /**
     * If trials remain, increment trail index and update model accordingly
     * Else end
     */
    $scope.advanceToNextTrialOrEnd = function(){
        $scope.selectedIndex = -1;
        if ($scope.trialIndex < $scope.trials.length - 1) {
            $scope.trialIndex++;
            $scope.addAnswers();
            $scope.getQuestionText();
        } else {
            $scope.endAssessment();
        }
    };

    /**
     * update answers in model
     */
    $scope.addAnswers = function(){
        $scope.answers = [];
        var i = 0;
        while($scope.answers.length < $scope.trials[$scope.trialIndex].answers.length){
            $scope.answers[i] = $scope.trials[$scope.trialIndex].answers[i];
            i++;
        }

    };

    /**
     * End assessment and proceed to next step
     */
    $scope.endAssessment = function(){
        if($scope.isSRI()){
            $location.path('goodbye');
        }else{
            $location.path( 'app/index.html' );
            $scope.$apply();
        }
    };
});


app.service('sharedProperties', function() {
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

    /**
     * Constant for SRC quiz type
     * @type {string}
     */
    var QUIZTYPE_SRI = "sri";

    /**
     * Constant for SRC quiz type
     * @type {string}
     */
    var QUIZTYPE_SRC = "src";


    return {
        getSRITrials: function() {
            return sriTrials;
        },
        getBooks: function() {
            return books;
        },
        getQuizTypeSRI: function() {
            return QUIZTYPE_SRI;
        },
        getQuizTypeSRC: function() {
            return QUIZTYPE_SRC;
        }
    };
});
