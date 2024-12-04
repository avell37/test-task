import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeMove, restartGame, sendGameResult } from '../../../store/gameSlice';

import { Cell } from '../../atoms/Cell/Cell';
import { Button } from '../../atoms/Button/Button';

import styles from './GameBoard.module.scss';

export const GameBoard = () => {

    const board = useSelector((state) => state.game.board);
    const currentPlayer = useSelector((state) => state.game.currentPlayer);
    const winner = useSelector((state) => state.game.winner);
    const dispatch = useDispatch();

    const handleCellClick = useCallback((index) => {
        if (!board[index] && !winner) {
            dispatch(makeMove({ index }));
        }
    }, [board, winner, dispatch]);

    useEffect(() => {
        if (winner) {
            const nowDate = new Date();
            const hours = String(nowDate.getHours()).padStart(2, '0');
            const minutes = String(nowDate.getMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`;
            const date = nowDate.toLocaleDateString();
            const formattedDate = `${date} ${time}`

            const gameResult = {
                circle: winner === "O",
                cross: winner === "X",
                date: formattedDate,
            };
            dispatch(sendGameResult(gameResult))
        }
    }, [winner, dispatch])

    return (
        <div className={styles.gameBoard}>
            <h2 className={styles.current}>Текущий игрок: {currentPlayer}</h2>
            {winner && <h2 
            className={winner === "Ничья" ? styles.draw : styles.winner}>
                {winner === "Ничья" ? "Ничья" : `Победитель: ${winner}`}</h2>}
            <div className={styles.board}>
                {board.map((value, index) => (
                    <Cell key={index} value={value} onClick={() => handleCellClick(index)} />
                ))}
            </div>
            {winner && (
                <Button name="Начать заново" onClick={() => dispatch(restartGame())} />
            )}
        </div>
    );
};