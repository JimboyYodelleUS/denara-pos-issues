import styles from "./styles/TextArea.module.css";
import { ITextAreaProps } from "./types";

export default function TextArea(props: ITextAreaProps) {
    const { onChange, styleClass, value, placeholder } = props;
    const style = styleClass ? styleClass : styles.textareaField;
    const textAreaPlaceholder = placeholder ? placeholder : "";
    const textAreaValue = value ? value : "";
    const textAreaRequired = props.required ? true : false;
    return (
        <textarea
          className={style}
          placeholder={textAreaPlaceholder}
          value={textAreaValue}
          onChange={onChange}
          required={textAreaRequired}
        />
    );
}