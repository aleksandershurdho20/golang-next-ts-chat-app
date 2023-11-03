import React, { HTMLProps } from "react";

type CustomTextInputProps = HTMLProps<HTMLInputElement> & {
  // Add custom props here
  label?: string;
  wrapperClassname?: string;
};

const TextField: React.FC<CustomTextInputProps> = (props) => {
  const { wrapperClassname, label, ...rest } = props;

  return (
    <div className={`form-floating ${wrapperClassname || ""}`}>
      {/* <input className="form-control" id="floatingInput" {...rest} />
      <label htmlFor="floatingInput">{label}</label> */}
      <input className="form-control" {...rest} />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
};

export default TextField;
