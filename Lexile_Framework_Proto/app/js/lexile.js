var app = angular.module('LexileFrameWorkStudent',[]);

app.controller('PageController', function($scope, sharedProperties){
    $scope.student = sharedProperties.getStudent();
})


/**
 * Controller for Results Tab
 */
app.controller('ResultsTab',function($scope, sharedProperties){
    $scope.books = sharedProperties.getBooks();
    $scope.student = sharedProperties.getStudent();


})

/**
 * Controller for Quiz Tab
 */
app.controller('QuizTab', function($scope, sharedProperties){
    $scope.NUM_SELECTABLE_CATAGORIES = 3;
    $scope.title            = "";
    $scope.author           = "";
    $scope.isQuizOnly       = false;
    $scope.isInLibraryOnly  = false;
    $scope.isInMyLexileOnly = false;
    $scope.catagories       = sharedProperties.getCatagories();
    $scope.books            = sharedProperties.getBooks();

    $scope.resultsDivVisible   = false;
    $scope.quizDivVisible      = false;
    $scope.searchDivVisible    = true;

    $scope.quizPassed = true;

    $scope.quizResults = {
        numQuestions:10,
        numCorrect:8,
        numAttempts:1,
        studentComment:""
    };

    /**
     * Calculate percent quiz correct
     * @returns {number}
     */
    $scope.percentCorrect = function(){
        return ($scope.quizResults.numCorrect / $scope.quizResults.numQuestions)*100;
    }

    $scope.selectedIndices = [];

    /**
     * Pushes selected index to array of selected indices,
     * if more than NUM_SELECTABLE_CATAGORIES
     * contained there, drops first
     * @param pIndex
     */
    $scope.itemSelected = function(pIndex){

        if($scope.selectedIndices.length >= $scope.NUM_SELECTABLE_CATAGORIES){
            $scope.selectedIndices.shift();
        }
        $scope.selectedIndices.push(pIndex)
    }

    /**
     * Returns true if param index is in array of those selected
     * @param pIndex
     * @returns {boolean}
     */
    $scope.isSelectedIndex = function(pIndex){
        return ( $.inArray(pIndex, $scope.selectedIndices) != -1 );
    }


    /**
     * Search button click in Quiz Tab fades out our search form and replaces it
     * with the selection screen from where we'll be selecting a quiz
     */
    $scope.searchButtonClick = function(){
        $scope.quizDivVisible = true;
        $scope.searchDivVisible = false;
    }

    $scope.quizButtonClicked = function(){
        $scope.quizDivVisible = false;
        $scope.searchDivVisible = false;
        $scope.resultsDivVisible = true;
    }

    $scope.reviewButtonClicked = function(){
        $scope.quizDivVisible = false;
        $scope.searchDivVisible = true;
        $scope.resultsDivVisible = false;
    }

})


/**
 * Controller for Reading List Tab
 */
app.controller('ReadingListTab',function($scope, sharedProperties){
    $scope.lexile = 350;
    $scope.nextTestDate = new Date("May 14, 2013").toDateString();
    $scope.booksRead = 3;
    $scope.wordsRead = 1200;
    $scope.booksReviewed = 4;

    $scope.interests = ["Animals","Ninjas","Travel"];

    $scope.quizButtonClicked = function(){
        //do some stuff

    }

    $scope.books = sharedProperties.getBooks();
})







/**
 * Service for sharing properties between controllers
 */
app.service('sharedProperties', function() {

    var student = {
        name: 'Jacoby Ellsbury',
        school:'Fenway Elementary School',
        lexile:350,
        books:11,
        words:1200
    }

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

    var catagories  = [ "Action & Adventure",
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
        "Fun & Games"
    ];

    return {
        getStudent: function() {
            return student;
        },
        getBooks: function() {
            return books;
        },
        getCatagories: function() {
            return catagories;
        }
    }
});
