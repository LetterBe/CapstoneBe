interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button className="cyan-100 hover:text-teal-400 active:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-cyan-700 buttonFont"
                onClick={props.onClick}>
            {props.label}
        </button>
    )
}