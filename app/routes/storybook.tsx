import { json, useLoaderData } from "@remix-run/react";
import { MatchList } from "~/components/MatchList";
import { getMatchDetailsByMatchId, getMatchHistoryByPUUID, PUUID } from '~/utils/riot.server'
import { MatchDetails } from '~/utils/types';

export async function loader() {
  const matchData = await getMatchHistoryByPUUID(PUUID as string);
  const matchDetails: MatchDetails[] = [];
  for (const matchId of matchData) {
    const match = await getMatchDetailsByMatchId(matchId);
    matchDetails.push(match);
  }

  return json({ puuid: process.env.PUUID, matchDetails: matchDetails });
}

export default function Storybook() {

  const data = useLoaderData<typeof loader>();

  return <div>Storybook<MatchList userPuuid={data.puuid  as string} matchDetails={data.matchDetails as unknown as MatchDetails[]}/></div>;
}
