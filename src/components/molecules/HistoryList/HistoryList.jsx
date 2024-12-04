import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../../store/apiSlice';

import styles from './HistoryList.module.scss';

export const HistoryList = () => {

    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.game);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGames());
        }
    }, [status, dispatch])

    if (status === "loading") return <div>Loading...</div>
    if (status === "failed") return <div>Error!</div>

    const historyData = useMemo(() => {
        return data.map((game, index) => (
            <GameResult key={index} game={game} />
        ));
    }, [data]);

    return (
        <div className={styles.history}>
            <h1 className={styles.title}>History</h1>
            <ul className={styles.list}>
                {historyData}
            </ul>
        </div>
    );
};

const GameResult = ({ game }) => {

    const {circle, cross, date} = game;

    const circleText = circle ? "Победа" : "Поражение";
    const circleColor = circle ? "green" : "red";
    const crossText = cross ? "Победа" : "Поражение";
    const crossColor = cross ? "green" : "red";
    const drawColor = "gray";

    if (!circle && !cross) {
        return (
            <li className={styles.item}>
            <div className={styles.data} style={{ color: drawColor }}>
                Нолик
                Ничья
            </div>
            <div className={styles.data} style={{ color: drawColor }}>
                Крестик 
                Ничья
            </div>
            <div className={styles.data}>
                Дата игры {date}
            </div>
        </li>
        );
    }

    return (
        <li className={styles.item}>
            <div className={styles.data} style={{ color: circleColor }}>
                Нолик {circleText}
            </div>
            <div className={styles.data} style={{ color: crossColor }}>
                Крестик {crossText}
            </div>
            <div className={styles.data}>
                Дата игры {date}
            </div>
        </li>
    )
}