'use client'

import { useRef, useState, memo } from 'react'
import { Pause, Play, VolumeX } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Progress } from '@/components/ui/progress'

interface VideoProps {
  src: string
}

const Video = ({ src }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  const millisecondsToSeconds = (milliseconds: number) => {
    return milliseconds / 1000
  }

  return (
    <div className="relative w-full max-w-[57.0625rem] overflow-hidden rounded-2xl">
      <video
        autoPlay
        ref={videoRef}
        preload="none"
        muted={isMuted}
        controls={false}
        disablePictureInPicture
        aria-label="Video player"
        controlsList="nodownload"
        poster="/video-banner.png"
        className="w-full max-w-[57.0625rem] rounded-2xl"
        onPlaying={() => setIsPlaying(true)}
        onPause={() => {
          setIsPlaying(false)
        }}
        onEnded={() => {
          setIsPlaying(false)
        }}
        onTimeUpdate={e => {
          const currentTime = e?.timeStamp
          const duration = videoRef?.current?.duration

          if (duration) {
            const newProgress =
              (millisecondsToSeconds(currentTime) * 100) / duration
            setProgress(newProgress)
          }
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Progress
        value={progress}
        className="absolute bottom-0 left-0 right-0 z-10 h-2.5 rounded-none bg-transparent"
        indicatorStyle={{
          backgroundColor: '#00ff0c',
        }}
      />

      <div
        className="absolute inset-0 z-0 size-full select-none bg-transparent"
        onClick={() => {
          if (isMuted) return

          if (isPlaying) {
            videoRef?.current?.pause()
          } else {
            videoRef?.current?.play()
          }
        }}
      />

      <Play
        className={cn(
          'pointer-events-none absolute bottom-5 left-3 z-10 size-6',
          isPlaying && 'hidden',
        )}
      />

      <Pause
        className={cn(
          'pointer-events-none absolute bottom-5 left-3 z-10 size-6',
          !isPlaying && 'hidden',
        )}
      />

      <Button
        type="button"
        onClick={() => setIsMuted(false)}
        className={cn(
          'absolute left-1/2 top-1/2 z-10 h-auto -translate-x-1/2 -translate-y-1/2 transform flex-col gap-1',
          !isMuted && 'hidden',
        )}
      >
        <span>O video já começou</span>
        <VolumeX className="size-7" />
        <span>Clique aqui para ouvir</span>
      </Button>
    </div>
  )
}

export default memo(Video)
