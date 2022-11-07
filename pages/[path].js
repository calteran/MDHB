import { useRouter } from "next/router";

export default function Path () {
    const router = useRouter();
    const { path } = router.query;

    return (
        <div>
            <h1>{path}</h1>
        </div>
    );
}
