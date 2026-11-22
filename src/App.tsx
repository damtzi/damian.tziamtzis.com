import Card3D from './Card3D';
import { contact } from './contact';
import './App.css';

export default function App() {
  return (
    <main class="flex h-dvh flex-col">
      <div class="min-h-0 flex-1">
        <Card3D />
      </div>
      <nav class="flex justify-center gap-6 pb-10 text-sm text-neutral-400">
        <a class="hover:text-white" href={`mailto:${contact.email}`}>
          Email
        </a>
        <a class="hover:text-white" href={contact.website}>
          Website
        </a>
        <a class="hover:text-white" href={contact.cv}>
          CV
        </a>
      </nav>
    </main>
  );
}
