import { Card } from "@/components/ui/card";
import Graph from "@/assets/image/Graph.png";

const GraphCard = () => {
  return (
    <Card className="bg-white rounded-lg">
      <img src={Graph} alt="image of graph" />
    </Card>
  );
};

export default GraphCard;
