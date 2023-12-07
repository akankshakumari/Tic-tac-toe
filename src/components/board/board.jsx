import { useState } from 'react';
import { GridCell } from '../grid-cell/grid-cell';
import './board.scss';

const getGrid = () => {
    let grid = [];

    for(let i=0; i<9; i++) {
        grid[i] = { x: 0, y: 0, value: null };
    }

    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            const key = 3*i+j;
            grid[key].x = i;
            grid[key].y = j;
        }
    }

    return grid;
}

let grid = getGrid();

export const Board = () => {
    let [chance, setChance] = useState(true);

    const evaluateDiagonal1 = (value) => {
        if(value === null) return false;

        for(let i=0; i<3; i++) {
            const key = 3*i+i;
            if(grid[key].value !== value) return false;
        }

        return true;
    }

    const evaluateDiagonal2 = (value) => {
        if(value === null) return false;

        for(let i=0; i<3; i++) {
            for(let j=2; j>=0; j--) {
                const key = 3*i+j;
                if(grid[key].value !== value) return false;
            }
        }

        return true;
    }

    const evaluateRow = (x, y, value) => {
        if(value === null) return false;

        for(let i=0; i<3; i++){
            const key = 3*x+i;
            if(grid[key].value !== value) return false;
        }

        return true;
    }

    const evaluateColumn = (x, y, value) => {
        if(value === null) return false;

        for(let i=0; i<3; i++){
            const key = 3*i+y;
            if(grid[key].value !== value) return false;
        }

        return true;
    }

    const evaluateWin = (gridcell) => {
        const { x, y, value } = gridcell;

        return evaluateDiagonal1(value) || evaluateDiagonal2(value) || evaluateRow(x, y, value) || evaluateColumn(x, y, value);
    }

    const onClickGridCell = (gridkey, gridcell, cellValue) => {
        setChance(!chance);
        grid[gridkey].value = cellValue;
        if(evaluateWin(gridcell)) {
            alert(chance ? 'player 1 wins!' : 'player 2 wins!');
        }
    }

    return (
        <div className='board-container'>
            <h1 className='header'>Tic tac toe</h1>
            <div className='grid-container'>
                {grid.map((gridcell, key) => 
                    <GridCell 
                        key={key} 
                        gridkey={key} 
                        gridcell={gridcell} 
                        chance={chance} 
                        onClickGridCell={onClickGridCell}
                    />)}
            </div>
        </div>
    )
}