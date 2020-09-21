module.exports = {
	siteMetadata: {
		title: `Kevin Xu`,
		author: `Kevin Xu`,
		description: `Kevin's blog.`,
		siteUrl: `https://kevinhxu.com/`,
		social: {
			github: `khxu`,
			observable: `@khxu`,
			linkedin: `kevin-hanjie-xu`
		}
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 800
						}
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`
						}
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					{
						resolve: `gatsby-remark-embedder`,
						options: {
							customTransformers: [
								{
									getHTML: (url) => `<iframe
										height="400px"
										width="100%"
										src="${url}?lite=true"
										scrolling="no"
										frameborder="no"
										allowtransparency="true"
										allowfullscreen="true"
										sandbox="allow-forms
										allow-pointer-lock
										allow-popups
										allow-same-origin
										allow-scripts
										allow-modals"
										></iframe>`,
									name: 'replit',
									shouldTransform: (url) => /repl\.it/.test(url)
								}
							],
							services: {
								replit: {}
							},
						},
					}
				]
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.excerpt,
									date: edge.node.frontmatter.date,
									url: site.siteMetadata.siteUrl + edge.node.fields.slug,
									guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
									custom_elements: [{ "content:encoded": edge.node.html }],
								})
							})
						},
						query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
						output: "/rss.xml",
						title: "Kevin's Blog's RSS Feed",
					},
				],
			},
		},
		`gatsby-plugin-sitemap`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Kevin's Blog`,
				short_name: `Kevin's Blog`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `content/assets/icon.png`
			}
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`
			}
		}
	]
};
