import { FC } from "react";
import BlogCard from "../../component/BlogCard";

interface Props {}

const Blogs: FC<Props> = () => {
  return (
    <div className="mx-auto max-w-3xl p-5 space-y-5">
      <BlogCard
        title="This is my blog"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste deleniti aliquam aut ipsam maxime autem aliquid minus incidunt quae."
      />
      <BlogCard
        title="This is my blog"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste deleniti aliquam aut ipsam maxime autem aliquid minus incidunt quae."
      />
      <BlogCard
        title="This is my blog"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste deleniti aliquam aut ipsam maxime autem aliquid minus incidunt quae."
      />
    </div>
  );
};

export default Blogs;
