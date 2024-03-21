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

