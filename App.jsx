import DishesByTag from './components/DishesByTag.jsx';
import OneTag from './components/OneTag.jsx';

export default function App() {
  return (
    <div className="flex flex-col">
      <DishesByTag />
      <OneTag />
    </div>
  );
}
