import { useRouteError } from "react-router-dom";

function Error() {
    const error = useRouteError()

    return (
        <>
            <div className="flex justify-center items-center flex-col mt-5">
                <h1 className="text-lg font-bold">Error Page</h1>
                <p>{error.data}</p>
                <p>{error.status}</p>
                <p>{error.statusText}</p>
            </div>
        </>
    )
}

export default Error;