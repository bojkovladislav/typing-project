import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/cookies';
import { GoogleAuthData, UserData } from '../../types/api';

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const accessToken = getCookie('google_access_token');

  async function fetchUserData() {
    try {
      if (accessToken) {
        if (accessToken) {
          const response = await axios.get<GoogleAuthData>(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
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

  useEffect(() => {
    fetchUserData();
  }, [accessToken]);

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
