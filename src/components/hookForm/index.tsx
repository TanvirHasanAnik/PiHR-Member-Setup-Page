import React from "react";
import { twMerge } from "tailwind-merge";
import { Controller, useFormContext } from "react-hook-form";
import { clsx, type ClassValue } from "clsx";

function cn(...args: ClassValue[]){
    return twMerge(clsx(args))
}

interface Props {
  children?: any;
  name: string;
  label?: string;
  className?: string;
  errorClassName?: string;
}

const HookFormItem = ({ children, name, className, errorClassName }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={className}>
          {React.cloneElement(children, {
            ...field,
            className: cn("text-sm !h-9 w-full", children.props.className),
            labelClassName: cn("!text-xs", children.props.labelClassName),
            errorMessage: error?.message,
            hasError: !!error,
            errorClassName: cn(
              "static mt-1 px-1 rtl:right-1 rtl:text-right",
              errorClassName,
            ),
            styles: {
              height: "36px",
              ...children.props.styles,
              error: "rtl:right-1 rtl:text-right",
              wrapper: "rtl:right-1 rtl:text-right",
            },
          })}
        </div>
      )}
    />
  );
};

export default HookFormItem;
