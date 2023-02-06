import Sound from "react-sound";


const PlaySound = ({ isPlaying, winning, url }) => {
  return (
    <div>
      <Sound
        url={url}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
      />
    </div>
  );
};

export default PlaySound;
