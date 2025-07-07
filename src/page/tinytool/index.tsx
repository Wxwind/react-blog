import { useParams } from "react-router-dom";
import { FacePhoto } from "./tools";

export default function TinyTool() {
  const { name } = useParams();

  return <FacePhoto />;
}
