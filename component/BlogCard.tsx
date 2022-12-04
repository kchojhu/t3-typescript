import { FC } from "react";

interface Props {
    title: string;
    description: string
}

const BlogCard: FC<Props> = ({title, description}): JSX.Element => {
  return (
    <div className="rounded bg-green-100 p-2">
      <h1 className="text-3xl font-semibold text-gray-900">
            {title}
      </h1>
      <p className="text-gray-500">
            {description}
      </p>
    </div>
  );
};

export default BlogCard;
