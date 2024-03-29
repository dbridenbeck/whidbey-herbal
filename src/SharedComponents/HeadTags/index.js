import Head from 'next/head';

const HeadTags = ({ title, ogUrl, ogDescription, ogImage }) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={title} key="title" />
    <meta property="og:url" content={ogUrl} key="url" />
    <meta property="og:description" content={ogDescription} key="description" />
    <meta property="og:image" content={ogImage} key="image" />
  </Head>
);

export default HeadTags;
