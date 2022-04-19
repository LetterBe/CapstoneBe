interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button className="cyan-100 hover:text-teal-500 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-xl text-cyan-700 no-underline hover:underline  buttonFont"
                onClick={props.onClick}>
            {props.label}
        </button>
    )
}