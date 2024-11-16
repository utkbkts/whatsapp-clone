declare module "react-video-thumbnail" {
  export interface VideoThumbnailProps {
    videoUrl: string;
    width?: number;
    height?: number;
  }

  const VideoThumbnail: React.FC<VideoThumbnailProps>;
  export default VideoThumbnail;
}
