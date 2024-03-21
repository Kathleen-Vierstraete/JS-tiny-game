// inti module

const game = {
    //init : where all the main functionnality are called
    init : function(){
        //getting to the model (that is lower on the page)
        game.model = model

        // defining the playground size
        game.gridSize();
        // drawing the grid
        game.generateMap();
        //detecting the key pressed to make the person move 
        game.detectKeys();

        // getting the closing element on the modal window
        const closeElement = document.querySelector('.message__close');
        //listening to the event click to close the modal window
        closeElement.addEventListener("click", game.handleCloseButtonClick);
    },

    //definiing the properties first :
    // width of the cell
    cellWidth: 50,
    // stocking the playground, on which the grid will be displayed
    grid: document.querySelector('.playground'),
    //stocking in an array the equivalent between symboles and css class for the cells
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'person',
        '-': 'goal'
    },

    //then the functions :
    //defining the size of the playgroud, according the the game model and the size of the cells or squares
    gridSize: function(){
        game.grid.style.width = game.model[0].length * game.cellWidth + 'px';
    },

    //drawing the grid or playground
    generateMap: function(){
        //thanks to a loop in a loop, we draw the lines and the columns
        for (let line = 0; line < game.model.length; ++line) {
            for (let column = 0; column <  game.model[line].length; ++column) {

                //stocking the current cell
                let currentCell = game.model[line][column];

                //creating a div and giving it a class name 
                let square = document.createElement('div');
                square.className = 'square';

                //adding the classes as coordonates, with x & y for columns and lines
                square.classList.add(game.types[currentCell], 'x-'+column, 'y-'+line);

                //adding the cell to the grid
                game.grid.appendChild(square);

                //if the cell is the person, we stock the coordonates in tne properties
                if(currentCell == 'o') 
                {
                    game.personY = line;
                    game.personX = column;
                }
                //same for the objective
                if (currentCell == '-') {
                    game.goalY = line;
                    game.goalX = column;
                }
                
            }
        }
    },

    //function to detect the keys that are pressed 
    detectKeys: function() {
        document.addEventListener('keydown', function(e) {
            //preventing the scroll with keydown when playing the game
            e.preventDefault();
            //detecting which key was pressed and the direction 
            //tried keyCode, but depreciated. used event.key instead, with the keyname with "" to get a string
            // codes for the keys : https://www.toptal.com/developers/keycode
            switch (e.key) { 
                //left
                case "ArrowLeft":
                case "q":
                    var directionX = -1;
                    var directionY = 0;
                break;
                //up
                case "ArrowUp":
                case "z":
                    var directionX  = 0;
                    var directionY  = -1;
                break;
                //right
                case "ArrowRight":
                case "d":
                    var directionX  = 1;
                    var directionY  = 0;
                break;
                //down
                case "ArrowDown":
                case "s":
                    var directionX  = 0;
                    var directionY  = 1;
                break;
            }

            if(directionX !== undefined && directionY !== undefined) {
                // moving the person in the direction in arguments, thanks to the next function
                game.moveTo(directionX, directionY);
            }
    
            //adding a modal window when the person reaches the goal
            if (game.personX === game.goalX && game.personY === game.goalY  ){
                //selecting the element
                const messElement = document.querySelector(".message"); 
                //adding the class to display the modal
                messElement.classList.add("message--on");     
            }
        });
    },
        
    // function to make the person move 
    moveTo: function(directionX, directionY) {
        //the new coordonates are calculated : adding the directions to the current location
        let newX = game.personX + directionX;
        let newY = game.personY + directionY;
    
        //if the coordonates exist and there is no wall :
        if(game.model[newY] !== undefined && game.model[newY][newX] !== undefined && game.model[newY][newX] != '*') {
            //taking the class from the previous square
            document.querySelector('.person').classList.toggle('person');
            //adding the class to the square
            document.querySelector('.x-'+newX+'.y-'+newY).classList.toggle('person');
            //stocking the new coordonates
            game.personX = newX;
            game.personY = newY;
        }
    },

    //function to handle closing the modal window
    handleCloseButtonClick: function() {
        //selecting the element 
        const asideElem = document.querySelector('.message');
        //removing the class on to have a display : none
        asideElem.classList.remove("message--on");
      },
};

//once the page is loaded, let's launch the script
document.addEventListener('DOMContentLoaded', game.init);

//the model for the game, with classic, wall, person and goal. this model can be changed if wanted. 
var model = [
    'xxxxxxxxx**xx',
    'x********xx-x',
    'xxxxxxxx*x**x',
    'xx*****xxx*x*',
    'xxxxxx*x***x*',
    '****xx*x*xxx*',
    'xxx*xx*x*xxxx',
    'x*o*xx**xx*xx',
    'x***xxxxxx*xx',
    'xx*xxx*****xx',
    'xx*xxx**xxxxx',
    'xxxx**xxx****',
    'x***xx*****xx',
];

