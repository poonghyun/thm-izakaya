import DishesByTag from './components/DishesByTag.jsx';
import OneTag from './components/OneTag.jsx';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DishesByTag />
      <OneTag />
    </div>
  );
}
