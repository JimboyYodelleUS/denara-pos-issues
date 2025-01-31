import styles from './styles/Input.module.css';
import { IInputProps } from './types';

export default function Input(props: IInputProps) {
    const { onChange, styleClass, value , type, placeholder, required } = props;
    const style = styleClass ? styleClass : styles.inputField;
    const inputPlaceholder = placeholder ? placeholder : "";
    let inputValue = value ? value : "";
    return (
        <input
          className={style}
          type={type}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={onChange}
          required={required}
        />
    );
}