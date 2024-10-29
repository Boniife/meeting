'use client';

import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallbyid } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { Loader } from 'lucide-react';


const Meeting = ({ params: {id} }: { params: { id: string } }) => {
  const {user, isLoaded} = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, iscallLoading} = useGetCallbyid(id);

  if(!isLoaded || iscallLoading) return <Loader />

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  // const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  // if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ): (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
