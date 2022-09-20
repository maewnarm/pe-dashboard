import { DropdownType } from "@/types/common";
import { Select } from "antd";
import React from "react";
const { Option } = Select;

interface SelectorProps {
  placeholder: string;
  options: { value: string; text: string }[];
  popupClassName?: string;
  value: string;
  set: React.Dispatch<React.SetStateAction<DropdownType>>;
}

const DropdownSelector: React.FC<SelectorProps> = (props) => {
  const { placeholder, options, popupClassName, value, set } = props;
  return (
    <div className="selector-product">
      <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        value={value}
        onChange={(v, option) =>
          set({
            // @ts-ignore
            name: option.children,
            value: v,
          })
        }
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
