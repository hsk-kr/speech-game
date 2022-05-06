import { useEffect } from 'react';
import { useStt } from './hooks/useStt';

function App() {
  const speechRecognition = useStt({
    onAudioStart: () => {
      console.log('start');
    },
    onAudioEnd: () => {
      console.log('end');
    },
    onResult: (e) => {
      const { results } = e;
      console.log({ results });
    },
  });

  useEffect(() => {
    if (!speechRecognition) return;

    speechRecognition.start();

    setTimeout(() => {
      speechRecognition.stop();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechRecognition]);

  if (!speechRecognition) return <div>This browser doesn't support STT.</div>;

  return <div className="App">App</div>;
}

export default App;
