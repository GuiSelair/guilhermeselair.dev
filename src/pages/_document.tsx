import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="pt">
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<meta charSet="utf-8" />
					<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<script
						// Runs before the page is parsed so /about?ai-mode=on
						// does not paint the designed layout first.
						dangerouslySetInnerHTML={{
							__html: `(function(){try{var path=location.pathname.replace(/\\/$/,"")||"/";var aiMode=new URLSearchParams(location.search).get("ai-mode");if(path==="/about"&&aiMode==="on"){document.documentElement.setAttribute("data-ai-mode","on");}else{document.documentElement.removeAttribute("data-ai-mode");}}catch(e){}})();`,
						}}
					/>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
