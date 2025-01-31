import styles from './styles/Button.module.css'
import { IButtonProps } from './types';

export default function Button(props: IButtonProps) { 
    const { onClick, styleClass, is_selected, label } = props;
    const style = styleClass ? styleClass : styles.button;
    return (
        <button
            type="button"
            className={is_selected ? styles[style] : styles.transparentButton}
            onClick={onClick}
        >
            {label}
        </button>
    );
}