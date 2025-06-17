"use client"
import React from 'react'
import { useUsers } from '@/hooks/useUsers'
import { useSession } from 'next-auth/react'
import UserSection from './UserSection';
import UserProfileSkeleton from './UserProfileSkeleton';

function UserMain() {
    const { data: session } = useSession()
    const { getUserQuery } = useUsers('user', 1, 10)
    const userId = session?.user?.id

    const {
        isLoading: loading,
        error: error,
        data: userData
    } = getUserQuery(userId)

    // console.log(userData)

    if (!session || session === undefined || !session.user.id) return <UserProfileSkeleton />

    return (
        <div className='max-w-6xl mx-auto my- p-2 sm:p-5  rounded-2xl min-h-[90vh]'>
            <UserSection error={error} loading={loading} userData={userData} />
        </div>
    )
}

export default UserMain