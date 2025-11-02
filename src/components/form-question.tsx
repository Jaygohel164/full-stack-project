import { cn } from "@/lib/utils";
import { useRadio, VisuallyHidden, RadioProps } from "@nextui-org/react";

export const FormQuestion = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-center hover:border-pink-400  flex-row-reverse",
        "max-w-[300px] w-60 cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-success"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div
        {...getLabelWrapperProps()}
        className="flex justify-center items-center flex-col space-y-2"
      >
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className=" text-foreground font-bold text-center">
            {description}
          </span>
        )}
        {
          <span {...getWrapperProps()}>
            <span {...getControlProps()} />
          </span>
        }
      </div>
    </Component>
  );
};

export default FormQuestion;
