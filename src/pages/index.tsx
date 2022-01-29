import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { buildClient, IPostFields } from "../lib/contentful";
import Link from "next/link";
import { Entry, EntryCollection } from "contentful";

const client = buildClient();

export const getStaticProps: GetStaticProps = async () => {
  const { items }: EntryCollection<IPostFields> = await client.getEntries({
    content_type: "post",
    order: "-sys.createdAt",
  });
  return {
    props: { posts: items },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Contentful with Next.js</h1>
        <div>
          <ul>
            {posts &&
              posts.map((post: Entry<IPostFields>) => (
                <li key={post.sys.id}>
                  <Link href={post.fields.slug}>
                    <a>
                      <h2>{post.fields.title}</h2>
                      <img src={post.fields.image.fields.file.url} width="240px"/>
                      <p>posted on {post.fields.date}</p>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;