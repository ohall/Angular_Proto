'use strict';

var app = angular.module('StudentAssessmentApp');

/**
 * Shared controller for both SRI and SRC
 */
app.controller('QuizCtrl', function ($rootScope, $scope, $location, sharedProperties, trialFactory ) {
    $scope.skipsRemaining  = 3;

    /**
     * Init selected index and listen for updates
     */
    $scope.selectedIndex = -1;
    $rootScope.$on('selectionUpdated', function(){
        $scope.selectedIndex = trialFactory.getSelectedIndex();
    });

    /**
     * Get trials and listen for updates
     */
    trialFactory.updateTrials();
    $rootScope.$on('trialsUpdated', function(){
        $scope.answers = trialFactory.getAnswers();
        $scope.passage = trialFactory.getPassage();
    });

    /**
     * Get question text and listen for updates
     */
    trialFactory.updateQuestionText();
    $rootScope.$on('questionTextUpdate', function(){
        $scope.questionText = trialFactory.getQuestionText();
    });

    $scope.answerChosen = function(pIndex){ trialFactory.answerChosen(pIndex); };
    $scope.nextButtonClicked = function(){ trialFactory.advanceToNextTrialOrEnd(); };
    $scope.skipButtonClicked = function(){
        $scope.skipsRemaining--;
        trialFactory.advanceToNextTrialOrEnd();
    };


    $scope.exitButtonClicked = function(){ trialFactory.endAssessment(); };
    var studentData = JSON.parse( sessionStorage.getItem('studentData') );
    $scope.studentName = studentData.studentName;
    $scope.bookTitle = studentData.bookTitle;
});

app.factory('trialFactory',function($rootScope, $location, sharedProperties){
    /**
     * This is the data we're passing from the LF student interface
     * This is not how we'll be getting student data in the future
     */
    var studentData = JSON.parse( sessionStorage.getItem('studentData') );

    /**
     * Model for trials
     */
    var trialIndex          = 0;
    var questionText        = "";
    var assessmentTrials    = [];
    var selectedIndex       = -1;

    /**
     * Check path to see if this is SRI or SRC
     */
    var path = $location.path();
    var isSRI = path === "/sri";
    var isSRC = path === "/src";

    return{
        /**
         * Get trials for either SRI or SRC
         * @returns {Array}
         */
        updateTrials : function(){//TODO: set by server
            if(isSRI){
                assessmentTrials = sharedProperties.getSRITrials();
            }else if(isSRC){
                var books = sharedProperties.getBooks();
                var bookSelectedTitle = studentData.bookTitle;
                for(var i=0;i<books.length;i++){
                    if (books[i].title === bookSelectedTitle){
                        assessmentTrials = books[i].trials;
                    }
                }
            }else{
                window.console.log("Quiz type not defined");
            }
            $rootScope.$broadcast('trialsUpdated');
        },
        getAnswers : function(){
            return assessmentTrials[trialIndex].answers;
        },
        getPassage : function(){
            return assessmentTrials[trialIndex].passage;
        },
        getQuestionText : function(){
            return questionText;
        },
        getSelectedIndex : function(){
            return selectedIndex;
        },
        /**
         * Set selected index for highlighting and scoring
         * call updateQuestionText
         * @param index
         */
        answerChosen : function(index){
            selectedIndex = index;
            $rootScope.$broadcast('selectionUpdated');
            this.updateQuestionText();
        },
        /**
         * If trials remain, increment index and update model
         * Otherwise call endAssessment()
         */
        advanceToNextTrialOrEnd : function(){
            selectedIndex = -1;
            $rootScope.$broadcast('selectionUpdated');
            if (trialIndex < assessmentTrials.length - 1) {
                trialIndex++;
                $rootScope.$broadcast('trialsUpdated');
                this.updateQuestionText();
            } else {
                this.endAssessment();
            }
        },
        /**
         * if an answer is selected, insert it into the question blank
         * otherwise set text to include the blank
         */
        updateQuestionText : function(){
            var question =  assessmentTrials[trialIndex].question;
            if(selectedIndex > -1){
                questionText = question.replace('________',
                    assessmentTrials[trialIndex].answers[selectedIndex]);
            }else{
                questionText = question;
            }
            $rootScope.$broadcast('questionTextUpdate');
        },
        /**
         * if SRI, go to goodby screen
         * if SRC return to main site
         */
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
        getSRITrials : function() {
            return sriTrials;
        },
        getBooks : function() {
            return books;
        }
    };
});
