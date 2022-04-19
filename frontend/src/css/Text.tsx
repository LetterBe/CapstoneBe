interface TextProps {
    message: string
    size?: string
}

export default function Text(props: TextProps) {


    return (
        <h3 className={`text-cyan-700 hover:text-teal-400 text-${props.size ?? '2xl' }  textFont`}>
            {props.message}
        </h3>
    )
}