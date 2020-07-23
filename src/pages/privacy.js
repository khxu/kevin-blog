import React from 'react';
import Layout from '../components/layout';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/seo';

const Privacy = ({ location }) => {
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
      <SEO title="Privacy" />
      <div>
        <h1 style={{ textAlign: 'center' }}>Privacy</h1>
        <p><i>Last updated: July 22, 2020</i></p>
        <h2>What Information Does This Site Collect?</h2>
        <h3>Email Address</h3>
        <p>
          This site uses <a href="https://magic.link/">Magic</a> for passwordless authentication. If you sign up for an account using your email address, then I'll know what your your email address is, and so will Magic. Their Privacy Policy is located here: <a href="https://magic.link/legal/developer-privacy-policy">https://magic.link/legal/developer-privacy-policy</a>.
        </p>
        <h3>User Submitted Content</h3>
        <h4>Comments</h4>
        <p>If you submit a comment (and you get past the text toxicity filter), I'll know what your comment says, and so will everyone else who visits the page, because they're public comments. If you don't want your comment displayed, please either delete your comment, or don't submit one in the first place.</p>
        <h3>Analytics (e.g., Google Analytics)</h3>
        <p>I don't use any analytics tools on this site.</p>
        <h2>What Will You Do With This Information?</h2>
        <p>In theory, I would use the information collected to improve the site. In practice, I imagine I'll rarely get around to actually doing so.</p>
        <p></p>
        <p>I won't sell your email address or any other information collected on this site.</p>
      </div>
    </Layout>
  );
};

export default Privacy;