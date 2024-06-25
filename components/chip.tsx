type ChipProps = {
  data: any;
  isSelected: boolean;
  onChipTap: (udo: Udo, event: React.MouseEvent<HTMLElement>) => void;
};

export const Chip: React.FC<ChipProps> = ({ data, isSelected, onChipTap }) => {
  // STYLE
  const style =
    "border-black/50 text-black/50 hover:border-black hover:text-black";
  const selectedStyle = "border-primary bg-primary/20 text-primary";
  return (
    <section
      key={data.id}
      onClick={(event) => onChipTap(data, event)}
      className={`w-fit rounded-md border px-2 py-1 text-sm font-medium ${isSelected ? selectedStyle : style}`}
    >
      {data.name}
    </section>
  );
};
