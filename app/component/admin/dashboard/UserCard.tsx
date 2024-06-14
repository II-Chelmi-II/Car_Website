// app/components/UserCard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { fetchUtils } from 'ra-core';

export function UserCard() {
    const [userCount, setUserCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const { json } = await fetchUtils.fetchJson('http://localhost:8080/api/users/all');
                setUserCount(json.length);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserCount();
    }, []);

    const handleClick = () => {
        router.push('/admin/users');
    };

    return (
        <Card onClick={handleClick} style={{ cursor: 'pointer' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Total Users: {userCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    view details
                </Typography>
            </CardContent>
        </Card>
    );
};
