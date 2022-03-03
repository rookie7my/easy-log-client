import { useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'

import Dropdown from './Dropdown';

const Header = () => {
  const { data: currentUser, isLoading, isError } = useQuery(
    'currentUser',
    async () => {
      const response = await axios.get('/api/currentUser');
      return response.data;
    }
  );

  return (
    <header className="flex items-center px-4 h-16 md:h-20">
      <Link href="/">
        <a className="flex items-center mr-auto gap-x-3">
          <Image src="/logo.png" alt="easy log logo" height={32} width={32} />
          <h1 className="text-2xl font-bold">Easy Log</h1>
        </a>
      </Link>
      {(isLoading || isError || !currentUser.isLoggedIn)? (
        <Link href="/login">
          <a className="bg-blue-500 p-2 rounded text-white">로그인</a>
        </Link>
      ): (<Dropdown name={currentUser.username} />)
      }
    </header>
  );
};

export default Header;
