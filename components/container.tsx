import type { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const Container: NextPage<Props> = ({ children }) => {
  return (
    <div className="card w-5/12 bg-base-100 shadow-xl p-2">
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Container;
