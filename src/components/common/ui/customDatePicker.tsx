import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { VKLabel } from "@vivakits/react-components";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import CalenderIcon from "../../../assets/icons/calendar";
import { getYear, getMonth } from "date-fns";
import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import langfmt from "../../../langfmt";
import "../../../App.css"

function cn(...args: ClassValue[]){
    return twMerge(clsx(args))
}

interface IDateProps {
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  selected?: any;
  onChange?: any;
  onBlur?: any;
  hasError?: boolean;
  errorMessage?: string;
  minDate?: Date;
  maxDate?: Date;
  yearPicker?: boolean;
  className?: string;
  popperPlacement?: string;
  popperClassName?: string;
  datePickerClassName?: string;
  showTimeSelect?: boolean;
  dateFormat?: string;
  labelClassName?: string;
  disabled?: boolean;
  maxFutureYearForSelect?: number;
  showYearPicker?: boolean;
}

const CustomHeader = (
  { date, changeYear, changeMonth }: any,
  maxFutureYearForSelect: number | undefined,
) => {
  const years = Array.from({ length: 80 }, (_, i) =>
    maxFutureYearForSelect
      ? maxFutureYearForSelect - i
      : getYear(new Date()) - i,
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" }),
  );

  return (
    <div className="flex justify-around">
      {/* <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button> */}
      <div>
        <select
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button> */}
    </div>
  );
};

const CustomDatePicker = React.forwardRef<HTMLDivElement, IDateProps>(
  function CustomDatePicker(
    {
      label,
      hasError,
      isRequired,
      placeholder,
      className,
      labelClassName,
      onBlur,
      onChange,
      popperPlacement,
      popperClassName,
      errorMessage,
      datePickerClassName,
      showTimeSelect = false,
      disabled,
      maxFutureYearForSelect,
      dateFormat,
      showYearPicker,
      ...rest
    },
    ref,
  ) {
    return (
      <div className={cn("flex  flex-col gap-2 w-full", className)} ref={ref}>
        <VKLabel
          className={(cn("text-xs font-medium text-gray-750"), labelClassName)}
          isRequired={isRequired}
        >
          {label}
        </VKLabel>
        <ErrorBoundary
          fallback={<p className="text-danger">{"ERROR_IN_DATEPICKER"}</p>}
        >
          <div className="w-full">
            <DatePicker
              disabled={disabled}
              popperPlacement={popperPlacement as any}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {}}
              showIcon
              popperClassName={popperClassName ?? "react-datepicker__popper"}
              autoComplete={"off"}
              showYearPicker={showYearPicker}
              renderCustomHeader={(e) =>
                CustomHeader(e, maxFutureYearForSelect)
              }
              dateFormat= {dateFormat ?? langfmt}
              
              // dateFormat={
              //   !dateFormat
              //     ? `${convertMomentToDateFnsFormat(langFmt)}${!showTimeSelect ? "" : ", hh:mm a"}`
              //     : dateFormat
              // }
              showTimeSelect={showTimeSelect}
              className={
                hasError
                  ? `!border  focus:outline-none border-danger focus:ring-danger focus:ring-1 rounded-lg w-full text-sm h-9 ${datePickerClassName}`
                  : `!border focus:outline-none text-gray-900 focus:border-primary-500  focus:ring-primary-500 focus:ring-1 rounded-lg w-full text-sm h-9 block ${datePickerClassName}`
              }
              icon={<CalenderIcon />}
              placeholderText={placeholder ? placeholder : "SELECT_DATE"}
              calendarIconClassName="cursor-pointer absolute top-1 end-1"
              {...rest}
            />
            {hasError && errorMessage && (
              <div className="px-1 mt-1 text-xs  text-danger text-start">
                {errorMessage}
              </div>
            )}
          </div>
        </ErrorBoundary>
      </div>
    );
  },
);
export default CustomDatePicker;
