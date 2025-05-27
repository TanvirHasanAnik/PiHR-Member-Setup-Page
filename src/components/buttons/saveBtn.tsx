import { VKButton } from "@vivakits/react-components";
import clsx from "clsx";

type TProps = {
  title: any;
  type?: "submit" | "reset" | "button" | undefined;
  handleAction?: any;
  args?: any;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: JSX.Element;
  className?: string;
};
export default function SaveBtn(props: TProps) {
  const handleOnClick = (e: any) => {
    !props.handleAction ? undefined : props.handleAction(e, props.args);
  };

  return (
    <VKButton
      type={props.type ? props.type : "submit"}
      className={clsx("min-w-[7.69rem] !h-10 !px-11 !py-2.5 !bg-primary-600 !text-white !rounded-md", props.className)}
      loading={props.isLoading}
      disabled={props.isLoading || props.isDisabled}
      onClick={(e: any) => handleOnClick(e)}
    >
      {props.icon}
      <span>{props.title}</span>
    </VKButton>
  );
}
