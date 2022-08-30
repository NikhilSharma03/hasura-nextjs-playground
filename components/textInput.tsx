import type { NextPage } from "next";

interface Props {
  value: string;
  onChange: any;
  placeholder: string;
}

const TextInput: NextPage<Props> = ({ placeholder, value, onChange }) => {
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className="input input-bordered input-primary w-full mb-3"
        />
      </div>
    </div>
  );
};

export default TextInput;
