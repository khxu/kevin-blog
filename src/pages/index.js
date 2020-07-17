import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import Image from 'gatsby-image';

import '../styles/index.css';

class BlogIndex extends React.Component {
	render() {
		const { data } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const posts = data.allMarkdownRemark.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title="All posts" />
				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
					{posts.map(({ node }) => {
						const title = node.frontmatter.title || node.fields.slug;
						return (
							<Link key={node.fields.slug} to={node.fields.slug} style={{ boxShadow: 'none' }}>
								<article style={{ maxWidth: '300px', padding: '1.5em' }} className='blog-post'>
									<header>
										<h3
											style={{
												marginBottom: rhythm(1 / 4),
												marginTop: 0
											}}
										>
											{title}
										</h3>
										<small>{node.frontmatter.date}</small>
									</header>
									<section>
										<p
											dangerouslySetInnerHTML={{
												__html: node.frontmatter.description || node.excerpt
											}}
										/>
										{node.frontmatter.coverImage ? (
											<Image
												style={{ maxWidth: '300px' }}
												fluid={node.frontmatter.coverImage.childImageSharp.fluid}
											/>
										) : null}
									</section>
								</article>
							</Link>
						);
					})}
				</div>
			</Layout>
		);
	}
}

export default BlogIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
						coverImage {
							childImageSharp {
								fluid(maxWidth: 500) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				}
			}
		}
	}
`;
