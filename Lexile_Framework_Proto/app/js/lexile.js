"use strict";

var app = angular.module('LexileFrameWorkStudent',[]);

app.controller('PageController', function($scope, sharedProperties){
    /**
     * Get shared Student object
     * @type {{name: string, school: string, lexile: number, books: number, words: number}}
     */
    $scope.student = sharedProperties.getStudent();
});


app.controller('ResultsTab',function($scope, sharedProperties){

    /**
     * Get shared Array of books
     * @type {Array}
     */
    $scope.books = sharedProperties.getBooks();

    /**
     * Get shared Student object
     * @type {{name: string, school: string, lexile: number, books: number, words: number}}
     */
    $scope.student = sharedProperties.getStudent();


});


app.controller('QuizTab', function($scope, sharedProperties){

    $scope.NUM_SELECTABLE_categories  = 3;
    $scope.searchKeyWord    = "";
    $scope.isQuizOnly       = false;
    $scope.isInLibraryOnly  = false;
    $scope.isInMyLexileOnly = false;
    $scope.categories        = sharedProperties.getcategories ();
    $scope.books            = sharedProperties.getBooks();
    $scope.interests = [];

    /**
     * Used to toggle visibility of results div
     * @type {boolean}
     */
    $scope.resultsDivVisible   = false;

    /**
     * Used to toggle visibility of quiz div
     * @type {boolean}
     */
    $scope.quizDivVisible      = false;

    /**
     * Used to set visibility of search div
     * @type {boolean}
     */
    $scope.searchDivVisible    = true;

    /**
     * Which div we see after a quiz is determined by
     * whether we pass it or not
     * @type {boolean}
     */
    $scope.quizPassed = true;

    /**
     * Mocked quiz results
     * @type {{numQuestions: number, numCorrect: number, numAttempts: number, studentComment: string}}
     */
    $scope.quizResults = {
        numQuestions:10,
        numCorrect:8,
        numAttempts:1,
        studentComment:""
    };//TODO: get actual quiz results

    /**
     * Calculate percent quiz correct
     * @returns {number}
     */
    $scope.percentCorrect = function(){
        return ($scope.quizResults.numCorrect / $scope.quizResults.numQuestions)*100;
    };

    /**
     * Array of NUM_SELECTABLE_categories  length
     * which ar our selected interests for searching
     * @type {Array}
     */
    $scope.selectedIndices = [];

    /**
     * Pushes selected index to array of selected indices,
     * if more than NUM_SELECTABLE_categories 
     * contained there, drops first
     * @param pIndex
     */
    $scope.itemSelected = function(pIndex){

        if($scope.selectedIndices.length >= $scope.NUM_SELECTABLE_categories ){
            $scope.selectedIndices.shift();
            $scope.interests.shift();
        }
        $scope.interests.push($scope.categories [pIndex]);
        $scope.selectedIndices.push(pIndex);
    };

    /**
     * Returns true if param index is in array of those selected
     * @param pIndex
     * @returns {boolean}
     */
    $scope.isSelectedIndex = function(pIndex){
        return ( $.inArray(pIndex, $scope.selectedIndices) !== -1 );
    };


    /**
     * Search button click
     */
    $scope.searchButtonClick = function(){
        $scope.quizDivVisible = true;
        $scope.searchDivVisible = false;
        $scope.resultsDivVisible = false;
    };

    /**
     * Quiz button click
     */
    $scope.quizButtonClicked = function(){
        $scope.quizDivVisible = false;
        $scope.searchDivVisible = false;
        $scope.resultsDivVisible = true;
    };

    /**
     * Review button click
     */
    $scope.reviewButtonClicked = function(){
        $scope.quizDivVisible = false;
        $scope.searchDivVisible = true;
        $scope.resultsDivVisible = false;
    };

});


app.controller('ReadingListTab',function($scope, sharedProperties){

    /**
     * Array of books grabbed from shared service
     * @type {Array}
     */
    $scope.books = sharedProperties.getBooks();

    /**
     * Student Lexile score
     * @type {number}
     */
    $scope.lexile = 350;//TODO: get data from server

    /**
     * Date when next SRI test will be available
     * @type {string}
     */
    $scope.nextTestDate = new Date("May 14, 2013").toDateString();//TODO: get data from server

    /**
     * Number of books read by student
     * @type {number}
     */
    $scope.booksRead = 3;//TODO: get data from server

    /**
     * Number of words read by student
     * @type {number}
     */
    $scope.wordsRead = 1200;//TODO: get data from server

    /**
     * Number of books reviewed by student
     * @type {number}
     */
    $scope.booksReviewed = 4;//TODO: get data from server

    /**
     * ngClick of Quiz button
     */
    $scope.quizButtonClicked = function(pTitle){
        sessionStorage.setItem( 'studentData', JSON.stringify(
                                {bookTitle:pTitle,
                                 studentName:sharedProperties.getStudent().name}));
        window.location = 'assessment.html#/src';//TODO: FIX This kludge and the on in assessmentApp.js
    };


});



app.service('sharedProperties', function() {

    /**
     * Mock student data
     * @type {{name: string, school: string, lexile: number, books: number, words: number}}
     */
    var student = {
        firstName: 'Jacoby',
        lastName: 'Ellsbury',
        school:'Fenway Elementary School',
        lexile:350,
        books:11,
        words:1200
    };

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
            points: 12
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
            points: 9
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
            points: 5
        }
    ];

    /**
     * Array of mock categories 
     * @type {Array}
     */
    var categories   = [ "Action & Adventure",
        "Animals & Pets",
        "Famous People",
        "All Time Favorite Stories (All Time Favourite Stories)",
        "Celebrations","Friends, " +
            "Family & Growing Up Food & Drink",
        "Around the World","In the Past",
        "Funny Stories",
        "Caring & Sharing",
        "Everything Else",
        "Music & Art",
        "Mystery",
        "Folktales & Legends",
        "Nature & the Earth",
        "How Things Work",
        "Science Fiction & Fantasy Space",
        "Fun & Games", "Other", "n' stuff"
    ];

    return {
        getStudent: function() {
            return student;
        },
        getBooks: function() {
            return books;
        },
        getcategories : function() {
            return categories ;
        }
    };
});
