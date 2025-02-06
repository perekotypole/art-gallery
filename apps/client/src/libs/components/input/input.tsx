import {
  type FieldPath,
  type Control,
  type FieldErrors,
  type FieldValues,
  type RegisterOptions,
  useController,
} from "react-hook-form";
import clsx from "clsx";

import styles from "./styles.module.css";

type Props<T extends FieldValues> = RegisterOptions<T> & {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: "text" | "number";
  isLabelHidden?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = "",
  type = "text",
  isLabelHidden = false,
}: Props<T>): React.ReactElement => {
  const { field } = useController({ control, name });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label className={styles["input-label"]}>
      <span className={clsx(isLabelHidden && "visually-hidden")}>
        {label} :
      </span>

      <div className={styles["input-container"]}>
        <input
          className={styles["input-field"]}
          name={field.name}
          onChange={field.onChange}
          placeholder={placeholder}
          type={type}
          value={field.value}
        />
      </div>

      {hasError && (
        <span className={styles["input-error"]}>{error as string}</span>
      )}
    </label>
  );
};

export { Input };
