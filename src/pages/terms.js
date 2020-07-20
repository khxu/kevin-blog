import React from 'react';
import Layout from '../components/layout';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/seo';

const Terms = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Layout title={data.site.siteMetadata.title} location={location}>
      <SEO title="Terms" />
      <div>
        <h1 style={{ textAlign: 'center' }}>Terms</h1>
        <p><i>Last updated: July 19, 2020</i></p>
        <ol>
          <li>All opinions and mistakes on this site are my own.</li>
          <li>All useful insights are likely from others.</li>
        </ol>
        <p>Because of the above, I make no guarantees about the accuracy of anything on this site. Please don't rely on this site for anything important.</p>
      </div>
    </Layout>
  );
};

export default Terms;