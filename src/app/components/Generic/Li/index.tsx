import { ILiProps } from "./types";
import styles from "./styles/styles.module.css";
import Button from "../Button";

export default function Li(li_props: ILiProps) {
    const { issue, styleClass, labels } = li_props;
    const { title, html_url } = issue;
    const style = styleClass ? styleClass : styles.issueItem;



    const getLabelColor = (labelName: string) => {
        switch (labelName) {
            case "bug":
                return "buttonBugColor";
            case "documentation":
                return "buttonDocumentationColor";
            case "duplicate":
                return "buttonDuplicateColor";
            case "enhancement":
                return "buttonEnhancementColor";
            case "good first issue":
                return "buttonGoodFirstIssueColor";
            case "help wanted":
                return "buttonHelpWantedColor";
            case "invalid":
                return "buttonInvalidColor";
            case "question":
                return "buttonQuestionColor";
            case "wontfix":
                return "buttonWontfixColor";
            default:
                return "transparentButton";
        }
    }

    return (
        <>
            <li className={style} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ marginBottom: "10px" }}>
                    <a href={html_url} target="_blank" rel="noopener noreferrer" style={{ marginRight: "20px" }}>
                        {title}
                    </a>
                </div>
                <ul style={{ display: "flex", justifyContent: "center" }}>
                    {labels.map((label, index) => {
                        const { name } = label;
                        return (
                            <div key={index} style={{ marginRight: "10px" }}>
                                <Button
                                    key={index}
                                    label={name}
                                    styleClass={getLabelColor(name)}
                                    is_selected={true}
                                />
                            </div>
                        );
                    })}
                </ul>
            </li>
        </>
    );
}