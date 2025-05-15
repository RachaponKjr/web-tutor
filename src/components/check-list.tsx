interface CheckItem {
  label: string;
  value: string;
}

interface CheckListProps {
  name: string;
  items: CheckItem[];
  selectedValues: string[];
  onChange: (name: string, selected: string[]) => void;
  readOnly?: boolean;
}

const CheckList: React.FC<CheckListProps> = ({
  name,
  items,
  selectedValues,
  onChange,
  readOnly = false,
}) => {
  const handleToggle = (value: string) => {
    if (readOnly) return;
    const isSelected = selectedValues.includes(value);
    const updated = isSelected
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(name, updated);
  };

  return (
    <div className="space-y-2">
      {items.map(item => (
        <label key={item.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(item.value)}
            onChange={() => handleToggle(item.value)}
            className="w-4 h-4"
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckList;
