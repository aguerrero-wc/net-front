// app/routes/videos.$id.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import VideoPlayer from "~/components/Video/VideoPlayer";

// export async function loader({ params }) {
//   const video = await getVideoById(params.id);
//   return json({ video });
// }

export default function VideoDetail() {
  // const { video } = useLoaderData<typeof loader>();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <VideoPlayer
        src={video.videoUrl}
        poster={video.thumbnail}
        onReady={(player) => console.log('Player ready!')}
        onPlay={() => console.log('Video started')}
        onEnded={() => console.log('Video finished')}
      /> */}
    </div>
  );
}