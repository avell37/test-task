import styles from './Button.module.scss';

export const Button = ({ name, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>{name}</button>
    );
};