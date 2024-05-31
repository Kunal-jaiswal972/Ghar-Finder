import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./quill.customTextArea.css";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CustomTextarea = ({ control, name, label, placeholder }) => {
  const [value, setValue] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-2 !mb-20">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactQuill
              value={value}
              onChange={setValue}
              placeholder={placeholder}
              theme="snow"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomTextarea;
