type Props = {
    title: string;
}

export default function BreadCrumb({ title }: Props) {
    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}
