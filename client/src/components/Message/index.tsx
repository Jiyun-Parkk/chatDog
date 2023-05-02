import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import profileDefault from '/public/static/images/profile.png';
import kcalProfile from '/public/static/images/kcaldogprofile.png';

interface MessageProps {
  chatter: 'assistant' | 'user';
  message: string;
}

// eslint-disable-next-line react/display-name
export const Message = React.forwardRef<HTMLLIElement, MessageProps>(
  ({ chatter, message }, ref) => {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState(profileDefault);
    useEffect(() => {
      if (router.query.dog === 'kcal') {
        setProfileImage(kcalProfile);
      }
    }, []);
    return (
      <li className={chatter} ref={ref}>
        {chatter === 'assistant' && (
          <Image src={profileImage} width={40} height={40} alt="profile" priority />
        )}
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
      </li>
    );
  }
);
