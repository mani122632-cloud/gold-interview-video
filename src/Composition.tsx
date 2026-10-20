import { Composition } from "remotion";
import { GoldInterviewEdit } from "./GoldInterviewEdit";

export const MyComposition = () => {
  return (
    <Composition
      id="GoldInterview"
      component={GoldInterviewEdit}
      durationInFrames={1175}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
