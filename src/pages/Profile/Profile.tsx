import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/cookies';
import { GoogleAuthData, UserData } from '../../types/api';

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const googleAccessToken = getCookie('google_access_token');
  const githubAccessToken = getCookie('github_access_token');

  async function fetchGoogleUserData() {
    try {
      if (googleAccessToken) {
        if (googleAccessToken) {
          const response = await axios.get<GoogleAuthData>(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
              },
            }
          );

          const { id, email, name, picture } = response.data;

          const userData: UserData = {
            id,
            username: name,
            email,
            picture,
          };

          setUserData(userData);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function fetchGithubUserData() {
    try {
      if (githubAccessToken) {
        const response = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${githubAccessToken}`,
            Accept: 'application/vnd.github+json',
          },
        });

        const { id, login, email, avatar_url } = response.data;

        const userData: UserData = {
          id,
          username: login,
          email,
          picture: avatar_url,
        };

        setUserData(userData);
      }
    } catch (error) {
      console.error('Error fetching GitHub user data:', error);
    }
  }

  useEffect(() => {
    fetchGoogleUserData();
    fetchGithubUserData();
  }, [googleAccessToken, githubAccessToken]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcome, {userData.username}</h2>
          <p>Email: {userData.email}</p>
          <img src={userData.picture} alt="Profile" />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;
