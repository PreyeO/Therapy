interface ChartDatagroupProps {
  title: string;
  className: string;
}

const ChartDataGroup: React.FC<ChartDatagroupProps> = ({
  title,
  className,
}) => {
  return (
    <div className="flex gap-[3px] items-center">
      <h3>{title}</h3>
      <div className={` ${className} rounded w-2 h-2 opacity-60`}></div>
    </div>
  );
};

export default ChartDataGroup;
