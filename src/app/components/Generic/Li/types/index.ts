export interface IIssue {
    id: number; title: string; html_url: string
}

export interface IIssuesLabel {
    color: string;
    default: boolean;
    description: string
    id: number;
    name: string
    node_id: string
    url: string
}

export interface ILiProps{
    issue: IIssue;
    styleClass: string;
    labels: Array<IIssuesLabel>;
}