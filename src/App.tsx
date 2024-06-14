import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  name: string;
  address: {
    city: string;
  };
}

export default function App() {
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<User>('https://jsonplaceholder.typicode.com/users/1')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-rotation spinner"></div>
        <div className="mt-4 text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-rotation spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-1/3 h-1/2 bg-[#eacfcf] p-40 items-center mx-auto my-40 rounded-3xl space-y-10">
      <div className="rounded-br-3xl bg-slate-500">
        <img src={`https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} alt="placeholder" />
      </div>
      <div>{data.name}</div>
      <div>{data.address.city}</div>
    </div>
  );
}
