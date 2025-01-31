export interface IInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    styleClass?: string;
    value?: string;
    type: string;
    placeholder?: string;
    required?: boolean;
}