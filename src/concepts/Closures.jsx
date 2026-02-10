import { FiLock } from 'react-icons/fi';
import { PageHeader } from '../components';

export const meta = {
  title: 'Closures',
  description: 'Understanding closures in JavaScript',
  icon: FiLock,
  color: '#22d3ee',
};

export default function Closures() {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary) font-sans">
      <PageHeader
        label="JavaScript"
        title="Closures"
        subtitle="A closure is a function that remembers variables from its outer scope even after the outer function has returned."
        accentColor="#22d3ee"
      />

      <main className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 pb-20">
        <pre className="bg-(--color-bg-card) border border-(--color-border) rounded-xl p-6 overflow-x-auto">
          <code className="text-[13px] text-(--color-text-primary)">{`function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2`}</code>
        </pre>
      </main>
    </div>
  );
}
