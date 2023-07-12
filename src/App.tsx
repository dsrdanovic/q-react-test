import { useEffect } from 'react';
import './App.css';
import { Content } from './components/Content';

interface Props {
  message: string;
  componentName?: string;
}

export const App: React.FC<Props> = ({ message, componentName = App.displayName }) => {

  useEffect(() => {
    console.log(`${message} ${componentName}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Content message={message} />
    </div>
  );
}

App.displayName = "App";
export default App
