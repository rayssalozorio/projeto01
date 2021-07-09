import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const formatPost = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
    };
  });
  const [posts, setPosts] = useState<Post[]>(formatPost);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [atuallyPage, setActuallyPage] = useState(1);

  //fiz uma funcao async onde quando  pagina atual nao for a 1 e nem null ela vai
  //so retornar para nao dar erro.
  //fiz um fetch para o nextPage que e' o next_page do prismic para me trazer a resposta
  //no fromato json.
  async function handleNextPage(): Promise<void> {
    if (atuallyPage !== 1 && nextPage === null) {
      return;
    }
    const postsResponse = await fetch(`${nextPage}`).then(response =>
      response.json()
    );
    setNextPage(postsResponse.next_page);
    setActuallyPage(postsResponse.posts);

    const newPosts = postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd MMM yyyy',
          {
            locale: ptBR,
          }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });
    setPosts([...posts, ...newPosts]);
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={commonStyles.content}>
        <Header isMain={true} />
        <div className={commonStyles.postContent}>
          {posts.map(post => (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a className={styles.posts}>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <ul>
                  <li>
                    <FiCalendar /> {post.first_publication_date}
                  </li>
                  <li>
                    <FiUser /> {post.data.author}
                  </li>
                </ul>
              </a>
            </Link>
          ))}
          {nextPage && (
            <button onClick={handleNextPage} type="button">
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };
  return {
    props: {
      postsPagination,
    },
  };
};
