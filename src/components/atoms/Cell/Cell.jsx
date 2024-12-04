import styles from './Cell.module.scss';

export const Cell = ({ value, onClick }) => {
    return (
        <button className={styles.cell} onClick={onClick}>
            {value} 
        </button>
    );
};