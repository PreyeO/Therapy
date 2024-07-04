import { Card } from "@/components/ui/card";
import EmptyGraph from "@/assets/image/EmptyGraph.svg";

const EmptyGraphCard = () => {
  return (
    <Card className="bg-white rounded-lg">
      <img src={EmptyGraph} alt="image of graph" />
    </Card>
  );
};

export default EmptyGraphCard;
