interface ErrorMessageProps {
    message: string
}

export default function ErrorMessage(props: ErrorMessageProps) {


    return (
        <div className="border-2 border-blue-400 rounded-md text-orange-500 my-2 p-1">
            {props.message}
        </div>
    )
}