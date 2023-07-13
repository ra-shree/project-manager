import { api } from '../../utils';
import { useState, useEffect } from 'react';
import { useGetUserInfoQuery } from '../../utils/query';

export default function Dashboard() {
    // const [profile, setProfile] = useState();

    // const { data, error, isLoading } = useGetUserInfoQuery();

    // console.log(data);
    // useEffect(() => {
    //     async function getProfiles() {
    //         try {
    //             const fetchData = await api.get('/api/user');
    //             setProfile(fetchData.data);
    //             sessionStorage.setItem('user', JSON.stringify(fetchData.data));
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getProfiles();
    // }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>
                Welcome, User
                {/* {profile === undefined ? 'user' : profile['first_name']} */}
            </p>
        </div>
    );
}
