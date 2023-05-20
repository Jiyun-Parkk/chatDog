import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import profileDefault from '/public/static/images/fortunedogprofile.png';
import kcalProfile from '/public/static/images/kcaldogprofile.png';
import recipeProfile from '/public/static/images/recipedogprofile.png';
import drunkenprofile from '/public/static/images/drunkenprofile.png';
import { CHAT } from '@/consts/chatType';

interface MessageProps {
  chatter: 'assistant' | 'user';
  message: string;
}

// eslint-disable-next-line react/display-name
export const Message = React.forwardRef<HTMLLIElement, MessageProps>(
  ({ chatter, message }, ref) => {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<StaticImageData>();
    useEffect(() => {
      if (router.query.dog === CHAT.KCAL) {
        setProfileImage(kcalProfile);
      } else if (router.query.dog === CHAT.RECIPE) {
        setProfileImage(recipeProfile);
      } else if(router.query.dog === CHAT.DRUNKEN) {
        setProfileImage(drunkenprofile)
      }else {
        setProfileImage(profileDefault);
      }
    }, []);
    return (
      <li className={chatter} ref={ref}>
        {chatter === 'assistant' && profileImage && (
          <Image src={profileImage} width={40} height={40} alt="profile" priority />
        )}
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
      </li>
    );
  }
);
