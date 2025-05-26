import { useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export default function VideoPage() {
  // const { id } = useParams();  // ← id, no videoId
  return (
    <div>
      <h2 className="text-xl">ID del video: {id}</h2>
      <p>Contenido dinámico aquí</p>
    </div>
  );
}

// export function loader({ params }: LoaderFunctionArgs) {
//   return json({ videoId: params.id });  // ← params.id, no params.videoId
// }