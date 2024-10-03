import { MatchDetails } from './types';

// obtener la API KEY de Riot desde el entorno
const RIOT_API_KEY = process.env.RIOT_API_KEY;
export const PUUID = process.env.PUUID;

if (!RIOT_API_KEY) {
  throw new Error('RIOT_API_KEY is not set');
}

const headers = {
  'X-Riot-Token': RIOT_API_KEY || '',
};

export async function getPUUIDBySummonerName(
  summonerName: string,
  summonerTag: string
) {
  const response = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}`,
    {
      headers,
    }
  );

  const data = (await response.json()) as { puuid: string };

  console.log(data);
  return data.puuid;
}

export async function getMatchHistoryByPUUID(
  puuid: string,
  count: number = 20,
  start: number = 0
) {
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
    {
      headers,
    }
  );

  const data = (await response.json()) as string[];
  return data;
}

export async function getMatchDetailsByMatchId(matchId: string) {
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    {
      headers,
    }
  );

  const data = (await response.json()) as MatchDetails;

  return data;
}
