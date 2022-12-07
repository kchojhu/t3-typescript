import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { readPostInfo } from '../../../lib/helper';
import { PostApiResponse } from '../../../utils/types';
import BlogCard from '../../component/BlogCard';

export const getStaticProps = async () => {
  //   const { dir }: PostApiResponse = await fetch(
  //     'http://localhost:3000/api/posts'
  //   ).then((data) => data.json());
  const dir: PostApiResponse = readPostInfo();
  return {
    props: {
      posts: dir,
    },
  };
};  

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts = [] }) => {
  // const { posts = [] } = props;
  // const [posts, setPosts] = useState<{title: string, slug: string; meta: string}[]>([]);

  // const fetchPosts = async () => {
  //   setPosts((await fetch('/api/posts').then(data => data.json())).dir);
  // }

  // useEffect(() => {
  //   fetchPosts()
  // }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-5">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          description={post.meta}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default Blogs;
