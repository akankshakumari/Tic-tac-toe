import { useState } from 'react';
import './grid-cell.scss';

export const GridCell = ({gridkey, gridcell, chance, onClickGridCell}) => {
    const [cellValue, setCellValue] = useState(null);

    const onClick = () => {
        if(cellValue !== null) return;

        setCellValue(chance ? 'X' : 'O');
        onClickGridCell(gridkey, gridcell, chance ? 'X' : 'O');
    }

    return (
        <div className='grid-cell' onClick={onClick}>{cellValue}</div>
    )
}