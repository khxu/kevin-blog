import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props;
		const rootPath = `${__PATH_PREFIX__}/`;
		let header;

		if (location.pathname === rootPath) {
			header = (
				<h1
					style={{
						...scale(1.5),
						marginBottom: rhythm(1.5),
						marginTop: 0,
						textAlign: 'center'
					}}
				>
					{title}
				</h1>
			);
		} else {
			header = (
				<h3
					style={{
						marginTop: 0,
						textAlign: 'center'
					}}
				>
					<Link
						style={{
							boxShadow: `none`,
							textDecoration: `none`,
							color: `inherit`
						}}
						to={`/`}
					>
						{title}
					</Link>
				</h3>
			);
		}
		return (
			<div
				style={{
					marginLeft: `auto`,
					marginRight: `auto`,
					maxWidth: location.pathname === rootPath ? rhythm(40) : rhythm(24),
					padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
				}}
			>
				<header>{header}</header>
				<main>{children}</main>
				<footer style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
					{
						location.pathname === rootPath
							? <div>
								<a href="https://github.com/khxu">GitHub</a>
								{` `}
								<a href="https://observablehq.com/@khxu">Observable</a>
								{` `}
								<a href="https://www.linkedin.com/in/kevin-hanjie-xu/">LinkedIn</a>
							</div>
							: null
					}
					<div><Link to='/terms'>Terms</Link> <Link to='/privacy'>Privacy</Link></div>
				</footer>
			</div>
		);
	}
}

export default Layout;
