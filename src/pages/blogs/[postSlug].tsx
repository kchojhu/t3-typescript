import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = (props) => {
  return (
    <div className="mx-auto max-w-3xl pb-10">
      <h1 className='font-semibold text-2xl py-5'>{props.post.title}</h1>
      <div className="prose">
        <MDXRemote compiledSource={props.post.content} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);
  const data = dirs.map((fileName) => {
    const filePathToRead = path.join(process.cwd(), 'posts', fileName);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    const meta = matter(fileContent).data;
    return { params: { postSlug: meta.slug } };
  });

  return {
    paths: data,
    fallback: false,
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

export const getStaticProps: GetStaticProps<{
  post: { content: string; title: string };
}> = async (context) => {
  try {
    const { params } = context;
    const { postSlug } = params! as IStaticProps;
  
    const filePathToRead = path.join(process.cwd(), 'posts/' + postSlug) + '.md';
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
  
    const { compiledSource, frontmatter } = await serialize(fileContent, {
      parseFrontmatter: true,
    });
  
    return {
      props: {
        post: {
          content: compiledSource,
          title: frontmatter!.title!,
        },
      },
    };  
  } catch (error) {
    return {
      notFound: true
    }
  }
};

export default SinglePage;
