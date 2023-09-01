import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

interface DocData {
  id: string;
  [key: string]: any;
}

const useDoc = (collection: string, id: string) => {
  const [data, setData] = useState<DocData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDocAsync = async () => {
      setLoading(true);
      const docRef = doc(db, collection, id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        setLoading(false);
        setError('Could not find that document');
      } else {
        setData({ id: docSnapshot.id, ...docSnapshot.data() } as DocData);
        setLoading(false);
      }
    };

    getDocAsync();
  }, [collection, id]);

  return { data, error, loading };
};

export default useDoc;