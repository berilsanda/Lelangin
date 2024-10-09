
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

interface ImageZoomsProps {
  source: string;
}

const ImageZooms: React.FC<ImageZoomsProps> = ({ source }) => {
  return <ImageZoom uri={source} isDoubleTapEnabled doubleTapScale={2} />;
};

export default gestureHandlerRootHOC(ImageZooms);
