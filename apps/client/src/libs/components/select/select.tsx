import { useCallback, useMemo } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  type Path,
  type PathValue,
  useController,
} from "react-hook-form";
import ReactSelect, { type SingleValue } from "react-select";

type SelectOption<T = string> = {
  label: string;
  value: T;
};

type Properties<T extends FieldValues, TOptionValue> = {
  control: Control<T>;
  label: string;
  name: FieldPath<T>;
  options: SelectOption<TOptionValue>[];
  placeholder?: string;
};

const Select = <TFieldValues extends FieldValues, TOptionValue>({
  control,
  label,
  name,
  options,
  placeholder,
}: Properties<TFieldValues, TOptionValue>): React.ReactElement => {
  const { field } = useController({
    control,
    name,
  });

  const value = useMemo(() => {
    const fieldValue = field.value;
    const matchedOption = options.find((option) => option.value === fieldValue);

    return matchedOption ?? null;
  }, [field.value, options]);

  const handleChange = useCallback(
    (selectedOptions: SingleValue<SelectOption<TOptionValue>>) => {
      const singleValue = selectedOptions?.value;
      field.onChange(singleValue ?? null);
    },
    [field],
  );

  return (
    <label>
      <span className="visually-hidden">{label}</span>

      <ReactSelect
        name={name}
        isClearable
        onChange={handleChange}
        options={options as PathValue<TFieldValues, Path<TFieldValues>>}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
};

export { Select };
