import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function useFormWithReinitialize({
  defaultValues,
  enableReinitialize = false,
  ...rest
}) {
  const methods = useForm({ defaultValues, ...rest });
  const defaultValuesStr = JSON.stringify(defaultValues);

  useEffect(() => {
    if (enableReinitialize) {
      methods.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableReinitialize, defaultValuesStr]);

  return methods;
}
