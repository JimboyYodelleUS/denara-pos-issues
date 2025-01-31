export interface ITextAreaProps { 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    styleClass?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
}