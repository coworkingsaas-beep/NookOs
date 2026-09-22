import design from "@/data/coworking-design.json";
import PenCanvas, { type PenNode } from "../pen-canvas";

export default function RegisterPage() {
  const scene = design.children.find((node) => node.type === "frame" && node.name === "NookOS / Register");
  if (!scene) return null;
  const reusable = design.children.filter((node) => node.type === "frame" && node.reusable === true) as unknown as PenNode[];
  return <PenCanvas scene={scene as unknown as PenNode} reusable={reusable} />;
}
