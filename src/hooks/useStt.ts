import { useState, useLayoutEffect, useEffect, useRef } from 'react';

export type useSttResult = any;

export type Handler = (e: any) => void;

export type useSttParams = {
  onAudioStart?: Handler;
  onAudioEnd?: Handler;
  onEnd?: Handler;
  onError?: Handler;
  onSoundStart?: Handler;
  onSoundEnd?: Handler;
  onResult?: Handler;
  onSpeechStart?: Handler;
  onSpeechEnd?: Handler;
};

export const useStt = (props?: useSttParams): useSttResult => {
  const {
    onAudioStart,
    onAudioEnd,
    onEnd,
    onError,
    onSoundStart,
    onSoundEnd,
    onResult,
    onSpeechStart,
    onSpeechEnd,
  } = props || {};
  const [, setLoaded] = useState(false);
  const sr = useRef<any>(null);

  useEffect(() => {
    if (!sr.current || !onAudioStart) return;
    sr.current.addEventListener('audiostart', onAudioStart);

    return () => {
      sr.current.removeEventListener('audiostart', onAudioStart);
    };
  }, [onAudioStart]);

  useEffect(() => {
    if (!sr.current || !onAudioEnd) return;
    sr.current.addEventListener('audioend', onAudioEnd);

    return () => {
      sr.current.removeEventListener('audioend', onAudioEnd);
    };
  }, [onAudioEnd]);

  useEffect(() => {
    if (!sr.current || !onEnd) return;
    sr.current.addEventListener('end', onEnd);

    return () => {
      sr.current.removeEventListener('end', onEnd);
    };
  }, [onEnd]);

  useEffect(() => {
    if (!sr.current || !onError) return;
    sr.current.addEventListener('error', onError);

    return () => {
      sr.current.removeEventListener('error', onError);
    };
  }, [onError]);

  useEffect(() => {
    if (!sr.current || !onSoundStart) return;
    sr.current.addEventListener('soundstart', onSoundStart);

    return () => {
      sr.current.removeEventListener('soundstart', onSoundStart);
    };
  }, [onSoundStart]);

  useEffect(() => {
    if (!sr.current || !onSoundEnd) return;
    sr.current.addEventListener('soundend', onSoundEnd);

    return () => {
      sr.current.removeEventListener('soundend', onSoundEnd);
    };
  }, [onSoundEnd]);

  useEffect(() => {
    if (!sr.current || !onResult) return;
    sr.current.addEventListener('result', onResult);

    return () => {
      sr.current.removeEventListener('result', onResult);
    };
  }, [onResult]);

  useEffect(() => {
    if (!sr.current || !onSpeechStart) return;
    sr.current.addEventListener('speechstart', onSpeechStart);

    return () => {
      sr.current.removeEventListener('speechstart', onSpeechStart);
    };
  }, [onSpeechStart]);

  useEffect(() => {
    if (!sr.current || !onSpeechEnd) return;
    sr.current.addEventListener('speechend', onSpeechEnd);

    return () => {
      sr.current.removeEventListener('speechend', onSpeechEnd);
    };
  }, [onSpeechEnd]);

  useLayoutEffect(() => {
    const SpeechRecognition: any =
      (window as any)['SpeechRecognition'] ||
      (window as any)['webkitSpeechRecognition'];

    const speechRecognition = new SpeechRecognition();

    if (!speechRecognition) return;

    speechRecognition.continuous = false;
    speechRecognition.lang = 'en-US';
    speechRecognition.interimResults = false;
    speechRecognition.maxAlternatives = 10;
    sr.current = speechRecognition;

    setLoaded(true);
  }, []);

  return sr.current;
};
