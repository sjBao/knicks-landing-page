import axios from 'axios';

export const BASE_URL = 'https://www.thesportsdb.com';
export const API_VERSION = 'api/v1';
export const API_FORMAT = 'json/1';


export enum TeamNameEnum {
  "KNICKS" = 'new_york_knicks'
}
export type TeamName = keyof typeof TeamNameEnum;
export type SportsDBCacheKeys = "CACHE_EXPIRY_TIME" | TeamName;
export interface SportsDBDataModel {
  idAPIfootball: string;
  idLeague: string;
  idTeam: string;
  intFormedYear: string;
  intLoved: string;
  intStadiumCapacity: string;
  strCountry: string;
  strDescriptionCN: null;
  strDescriptionDE: null;
  strDescriptionEN: string;
  strDescriptionES: null;
  strDescriptionFR: null;
  strDescriptionHU: null;
  strDescriptionIL: null;
  strDescriptionIT: null;
  strDescriptionJP: null;
  strDescriptionNL: null;
  strDescriptionNO: null;
  strDescriptionPL: null;
  strDescriptionPT: null;
  strDescriptionRU: null;
  strDescriptionSE: null;
  strDivision: null;
  strFacebook: string;
  strGender: string;
  strInstagram: string;
  strKeywords: string;
  strLeague: string;
  strLeague2: null;
  strLeague3: null;
  strLeague4: null;
  strLeague5: null;
  strLeague6: null;
  strLeague7: null;
  strLocked: string;
  strManager: string;
  strRSS: string;
  strSport: string;
  strStadium: string;
  strStadiumDescription: string;
  strStadiumLocation: string;
  strStadiumThumb: string;
  strTeam: string;
  strTeamBadge: string;
  strTeamBanner: string;
  strTeamFanart1: string;
  strTeamFanart2: string;
  strTeamFanart3: string;
  strTeamFanart4: string;
  strTeamJersey: string;
  strTeamLogo: string;
  strTeamShort: string;
  strTwitter: string;
  strWebsite: string;
  strYoutube: string;
}


export const fetchTeamData = async (team: TeamName): Promise<SportsDBDataModel> => {
  if (cacheDataIsExpired() || teamDoesNotExistInCache(team)) {
    const requestUrl =
      `${BASE_URL}/${API_VERSION}/${API_FORMAT}` +
      `/searchteams.php?t=${TeamNameEnum[team]}`;

    const response = await axios.get(requestUrl);
    console.log("[SportsDBService]: Cache is expired... fetching from ", response);
    if (response.status === 200) {
      cacheTeamData(team, response.data.teams[0]);
      return response.data.teams[0];
    }
  } else {
    console.log("[SportsDBService]: Retrieving Data from cache");
    return getCachedTeamData(team);
  }
};

const getCachedTeamData = (team: TeamName): SportsDBDataModel => {
  const cachedData = localStorage.getItem(team);
  return JSON.parse(cachedData);
};

const cacheTeamData = (team: TeamName, data: any): void => {
  const FIVE_MINUTES_IN_MILLISECONDS = 300000;

  localStorage.setItem(team, JSON.stringify(data));
  localStorage.setItem("CACHE_EXPIRY_TIME", `${new Date().getTime() + FIVE_MINUTES_IN_MILLISECONDS}`);
};

const teamDoesNotExistInCache = (team: TeamName): boolean => {
  return localStorage.getItem(team) === null;
};

const cacheDataIsExpired = (): boolean => {
  const expiryTime = localStorage.getItem('CACHE_EXPIRY_TIME');
  return !!expiryTime && new Date().getTime() > parseInt(expiryTime);
};
