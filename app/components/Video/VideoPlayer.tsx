import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  controls?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  className?: string;
  onReady?: (player: Player) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export default function VideoPlayer({
  src,
  poster,
  width = 800,
  height = 450,
  autoplay = false,
  controls = true,
  responsive = true,
  fluid = true,
  className = "",
  onReady,
  onPlay,
  onPause,
  onEnded
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    // Solo crear el player si no existe
    if (!playerRef.current && videoRef.current) {
      const videoOptions = {
        controls,
        responsive,
        fluid,
        width,
        height,
        autoplay,
        preload: 'auto',
        poster,
        sources: [
          {
            src,
            type: getVideoType(src)
          }
        ],
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        plugins: {
          // Puedes agregar plugins aquí
        }
      };

      const player = videojs(videoRef.current, videoOptions, () => {
        console.log('Video.js player is ready');
        onReady?.(player);
      });

      // Event listeners
      player.on('play', () => {
        console.log('Video playing');
        onPlay?.();
      });

      player.on('pause', () => {
        console.log('Video paused');
        onPause?.();
      });

      player.on('ended', () => {
        console.log('Video ended');
        onEnded?.();
      });

      playerRef.current = player;
    }

    // Cleanup function
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster, width, height, autoplay, controls, responsive, fluid, onReady, onPlay, onPause, onEnded]);

  // Función para determinar el tipo de video
  const getVideoType = (url: string): string => {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogv':
        return 'video/ogg';
      case 'm3u8':
        return 'application/x-mpegURL';
      default:
        return 'video/mp4';
    }
  };

  return (
    <div className={`video-player-container ${className}`}>
      <video
        ref={videoRef}
        className="video-js vjs-theme-forest"
        data-setup="{}"
      >
        <p className="vjs-no-js">
          Para ver este video, por favor habilita JavaScript y considera actualizar a un navegador que 
          <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">
            soporte video HTML5
          </a>.
        </p>
      </video>
    </div>
  );
}

// Componente de ejemplo con video de prueba
export function VideoPlayerExample() {
  const handlePlayerReady = (player: Player) => {
    console.log('Player is ready!', player);
  };

  const handlePlay = () => {
    console.log('¡Video iniciado!');
  };

  const handlePause = () => {
    console.log('Video pausado');
  };

  const handleEnded = () => {
    console.log('Video terminado');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Video Player - Windows Channel
      </h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <VideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          width={800}
          height={450}
          autoplay={false}
          controls={true}
          responsive={true}
          fluid={true}
          onReady={handlePlayerReady}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          className="rounded-lg overflow-hidden"
        />
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Big Buck Bunny - Video de Prueba
          </h2>
          <p className="text-gray-600">
            Este es un video de ejemplo usando Video.js en Remix. 
            El player incluye controles de velocidad, pantalla completa, 
            y es completamente responsive.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              10:34 min
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z" />
              </svg>
              158.4 MB
            </span>
            <span>Video de demostración</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Características del Player:
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Controles de velocidad (0.5x a 2x)
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Pantalla completa y responsive
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Soporte para múltiples formatos
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Events para tracking y analytics
          </li>
        </ul>
      </div>
    </div>
  );
}