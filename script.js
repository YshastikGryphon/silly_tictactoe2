document.addEventListener('DOMContentLoaded', () => {




  class TicTacToe {
    pl1Color = '#ffff00';
    pl2Color = '#ff00ff';
    
    // create layout
    init(htmlElement) {
      /*
      this._rootElement = htmlElement;
      htmlElement.innerHTML = '';

      // name
      let gameTitle = document.createElement('h1');
      gameTitle.classList.add('tictactoe__title')
      gameTitle.textContent = 'Tic-tac-toe';

      // playfield
      let gameField = document.createElement('div');
      gameField.classList.add('tictactoe__field');
      this._htmlElementField = gameField;
      this.setField(htmlElement);
      */

      
      const temp = document.querySelector('.tictactoe__field');
      this._htmlElementField = temp;
      temp.innerHTML = ''

      // append
      // htmlElement.append(gameTitle);
      temp.append(this.setField());
    }

    // self contained table creator
    setField() {
      let buttons = [];
      let fieldTable = document.createElement('table');
      fieldTable.classList.add('tictactoe__table');
      
      // row
      for (let irow = 0; irow < 3; irow++) {
        let fieldRow = document.createElement('tr');
        fieldRow.classList.add('tictactoe__table-row');
        // cell
        for (let icell = 0; icell < 3; icell++) {
          let fieldCell = document.createElement('td');
          fieldCell.classList.add('tictactoe__table-row-cell');

          let fieldCellSymbol = document.createElement('button');
          fieldCellSymbol.classList.add('tictactoe__table-row-cell-symbol');
          fieldCellSymbol.setAttribute('id', `${icell + (irow * 3)}`);
          buttons.push(fieldCellSymbol);

          fieldCell.append(fieldCellSymbol);
          fieldRow.append(fieldCell);
        }
        fieldTable.append(fieldRow);
      }

      this.setCellEvents(buttons);
      return fieldTable;
    }

    // add events
    setCellEvents(buttons) {
      let winConditions = [
        // 0 1 2
        // 3 4 5
        // 6 7 8
      
        [0,1,2], // -
        [3,4,5],
        [6,7,8],

        [0,4,8], // /
        [6,4,2],

        [0,3,6], // |
        [1,4,7],
        [2,5,8],
      ];
      const _htmlElementField = this._htmlElementField;
      let protectedTurns = 1;
      let maxSymbols = 4;
      let _curTurn = 0;
      let _memory = [];
      let pl1protected = [];
      let pl2protected = [];

      const turnTextSpan = document.querySelector('.tictactoe__text span');

      buttons.forEach(button => {
        button.addEventListener('click', function() {
          //console.log(this.id)
          //console.log(this.classList)

          // reset if pressed again
          if (_memory.includes(`${this.id}`)) {
            _memory.splice(_memory.indexOf(this.id), 1);
            this.classList.remove('_tic');
            this.classList.remove('_tac');
            this.classList.remove('_protecc');
          }

          if (_curTurn == 0) {
            // player 1 - tic
            _memory.push(this.id);
            this.classList.add('_tic');

            // protect
            if (pl1protected.length > protectedTurns) {
              pl1protected.shift().classList.remove('_protecc');
            }
            pl1protected.push(this);
            this.classList.add('_protecc');
            _curTurn = 1;
            turnTextSpan.textContent = 'O';
          } else {
            // player 2 - tac 
            _memory.push(this.id);
            this.classList.add('_tac');

            // protect
            if (pl2protected.length > protectedTurns) {
              pl2protected.shift().classList.remove('_protecc');
            }
            pl2protected.push(this);
            this.classList.add('_protecc');
            _curTurn = 0;
            turnTextSpan.textContent = 'X';
          };
          
          clearPrev();
          checkWin();
        });
      });

      function clearPrev() {
        if (_memory.length > (maxSymbols * 2)) {
          let elemToCut = _memory.shift()
          buttons[elemToCut].classList.remove('_tic');
          buttons[elemToCut].classList.remove('_tac');
          buttons[elemToCut].classList.remove('_protecc');
        };
      };

      function checkWin() {
        let arrayTics = [];
        let arrayTacs = [];
        let allTics = document.querySelectorAll('.tictactoe__table-row-cell-symbol._tic');
        let allTacs = document.querySelectorAll('.tictactoe__table-row-cell-symbol._tac');

        if (allTics.length <= 2) {
          return;
        };

        allTics.forEach(tics => {
          arrayTics.push(Number(tics.id));
        });
        allTacs.forEach(tacs => {
          arrayTacs.push(Number(tacs.id));
        });


        winConditions.forEach(winCondition => {
          let hit = 0;
          arrayTics.forEach(arrayTicsItem => {
            if (winCondition.includes(arrayTicsItem)) {
              hit++;
            };
          });
          if (hit >= 3) {
            _htmlElementField.classList.add('--is-won');
            _htmlElementField.classList.add('_pl1');
            console.log('1 победил')
          };

          hit = 0;
          arrayTacs.forEach(arrayTacsItem => {
            if (winCondition.includes(arrayTacsItem)) {
              hit++;
            };
          });
          if (hit >= 3) {
            _htmlElementField.classList.add('--is-won');
            _htmlElementField.classList.add('_pl2');
            console.log('2 победил')
          };
        });
      };

      function restart() {
        _curTurn = 0;
        turnTextSpan.textContent = 'X';
        pl1protected = [];
        pl2protected = [];
        _memory = [];
        buttons.forEach(button => {
          button.classList.remove('_tic');
          button.classList.remove('_tac');
          button.classList.remove('_protecc');
        });
        _htmlElementField.classList.remove('--is-won');
        _htmlElementField.classList.remove('_pl1');
        _htmlElementField.classList.remove('_pl2');
      };
      document.querySelector('.tictactoe__restart-btn').addEventListener('click', restart);
    }
  };

  let tictactoeGame = new TicTacToe().init(document.querySelector('.tictactoe'));


  function updateColor() {
    const placeSpace = document.querySelector('.playspace');
    const player1Color = document.querySelector('#player1Color');
    const player2Color = document.querySelector('#player2Color');

    player1Color.addEventListener('input', () => {
      placeSpace.style.setProperty('--pl-1', player1Color.value);
    });
    player2Color.addEventListener('input', () => {
      placeSpace.style.setProperty('--pl-2', player2Color.value);
    });
  };
  updateColor();
});