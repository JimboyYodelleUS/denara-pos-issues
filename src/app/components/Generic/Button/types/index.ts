export interface IButtonProps { 
    label: string;
    onClick?: () => any;
    styleClass?: string;
    is_selected?: boolean;
    type?: 'button' | 'submit' | 'reset';
}