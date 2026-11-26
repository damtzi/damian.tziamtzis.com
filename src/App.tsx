import { contact } from '@/contact';
import './App.css';

export default function App() {
	return (
		<main class="mx-auto max-w-xl px-6 py-24 sm:py-32">
			<h1 class="font-bold">{contact.name}</h1>
			<ul class="mt-4 list-['-_'] pl-[2ch] text-muted">
				<li>
					email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
				</li>
				<li>
					website: <a href={`https://${contact.website}`}>{contact.website}</a>
				</li>
				<li>
					github: <a href={`https://github.com/${contact.github}`}>{contact.github}</a>
				</li>
			</ul>
		</main>
	);
}
