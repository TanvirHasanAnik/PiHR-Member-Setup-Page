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
      className={clsx("save-btn-wrapper", props.className)}
      loading={props.isLoading}
      disabled={props.isLoading || props.isDisabled}
      onClick={(e: any) => handleOnClick(e)}
    >
      {props.icon}
      <span>{props.title}</span>
    </VKButton>
  );
}
