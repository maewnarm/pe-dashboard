import { Select } from "antd";
import React from "react";
const { Option } = Select;

interface SelectorProps {
  placeholder: string;
  options: { value: string; text: string }[];
  popupClassName?: string;
  set: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownSelector: React.FC<SelectorProps> = (props) => {
  const { placeholder, options, popupClassName, set } = props;
  return (
    <div className="selector-product">
      <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(v) => set(v)}
        // onSearch={onSearch}
        popupClassName={popupClassName}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {options.map(({ value, text }, idx) => (
          <Option key={idx} value={value}>
            {text}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DropdownSelector;
