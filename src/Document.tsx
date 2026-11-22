import type { ParentProps } from 'solid-js';
import { HydrationScript } from '@solidjs/web';

// Document shell (replaces index.html); prerendered, ships no client JS.
export default function Document(props: ParentProps) {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<title>Damian Tziamtzis</title>
				<meta name="description" content="Damian Tziamtzis — contact card" />
				<meta property="og:title" content="Damian Tziamtzis" />
				<meta property="og:description" content="Contact card" />
				<meta property="og:url" content="https://tziamtzis.com" />
				<HydrationScript />
			</head>
			<body class="bg-neutral-950 text-neutral-100 antialiased">{props.children}</body>
		</html>
	);
}
