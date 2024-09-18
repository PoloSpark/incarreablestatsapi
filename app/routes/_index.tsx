import type { ActionFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
import {
  getMatchDetailsByMatchId,
  getMatchHistoryByPUUID,
  getPUUIDBySummonerName,
} from '~/utils/riot.server';

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
  const matchDetails = await getMatchDetailsByMatchId(matchData[0]);

  return {
    summonerData: puuid,
    matchData: matchData,
    matchDetails: matchDetails,
  };
};

export default function Index() {
  const actionData = useActionData() as unknown as {
    summonerData: string;
    matchData: string[];
    matchDetails: {
      metadata: {
        participants: string[];
      };
    };
  };
  console.log({
    actionData,
  });
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
    </div>
  );
}
