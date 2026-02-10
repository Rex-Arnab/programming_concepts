export const meta = {
  title: 'Closures',
  description: 'Understanding closures in JavaScript',
};

export default function Closures() {
  return (
    <div>
      <h1>Closures</h1>
      <p>A closure is a function that remembers variables from its outer scope even after the outer function has returned.</p>
      <pre><code>{`function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2`}</code></pre>
    </div>
  );
}
