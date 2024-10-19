import { Hospital } from "lucide-react";

interface EmptyScreenProps {
  title: string;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ title }) => {
  return (
    <div className="flex flex-col w-[156px] gap-[11px]">
      <Hospital size={30} />
      <h3 className="text-black opacity-[0.3] text-sm font-medium">{title}</h3>
    </div>
  );
};

export default EmptyScreen;
