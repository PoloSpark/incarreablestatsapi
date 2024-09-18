import type { ActionFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
import { MatchList } from '~/components/MatchList';
import {
  getMatchDetailsByMatchId,
  getMatchHistoryByPUUID,
  getPUUIDBySummonerName,
} from '~/utils/riot.server';
import { MatchDetails } from '~/utils/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Incarreables Stats on Cloudflare!',
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const summonerName = formData.get('summoner-name') as string;
  const summonerTag = formData.get('summoner-tag') as string;

  if (!summonerName || !summonerTag) {
    return {
      error: 'Summoner name and tag are required',
    };
  }

  const puuid = await getPUUIDBySummonerName(summonerName, summonerTag);
  const matchData = await getMatchHistoryByPUUID(puuid);
  const matchDetails: MatchDetails[] = [];
  for (const matchId of matchData) {
    const match = await getMatchDetailsByMatchId(matchId);
    matchDetails.push(match);
  }
  return {
    puuid: puuid,
    matchData: matchData,
    matchDetails: matchDetails,
  };
};

export default function Index() {
  const actionData = useActionData() as unknown as {
    puuid: string;
    matchData: string[];
    matchDetails: {
      metadata: {
        participants: string[];
      };
    };
  };

  return (
    <div className='font-sans p-4'>
      <Form method='POST' className='flex flex-col gap-2'>
        <input
          type='text'
          name='summoner-name'
          placeholder='Summoner Name'
          required
          className='border border-blue-500'
        />
        <input
          type='text'
          name='summoner-tag'
          placeholder='Summoner Tag'
          className='border border-blue-500'
          required
        />
        <button type='submit' className='bg-blue-500 text-white p-2'>
          Search
        </button>
      </Form>
      {actionData?.matchDetails && (
        <div>
          <MatchList
            userPuuid={actionData.puuid}
            matchDetails={actionData.matchDetails as unknown as MatchDetails[]}
          />
        </div>
      )}
    </div>
  );
}
