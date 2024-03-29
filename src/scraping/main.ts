import { CLIENT_ID } from "../.main.env";

const getSongStats = (songData: SongData) => {
  const songStats: { [key in string]: any } = {};
  const songDataMap = new Map<string, string>();
  ["reposts_count", "comment_count"].forEach((key) => {
    const value = songData[key as string];
    // @ts-ignore
    songDataMap.set(key, value);
    songStats[key] = value;
  });
  return songStats;
};
// build the call that makes the signed playlist resource string
const buildSignedPlaylistCall = (
  trackId: number,
  trackHls: string,
  trackAuth: string,
  clientId: string
): string => {
  // https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls
  const hlsBody = trackHls
    .split("/stream/hls")[0]
    .split("https://api-v2.soundcloud.com/media/soundcloud:tracks:")[1]
    .split("/")[1];

  // {1317984667}/{b6705d26-a662-499e-8c4b-1e922b59475c}/stream/hls?client_id={lnFbWHXluNwOkW7TxTYUXrrse0qj1C72}&track_authorization={eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM}
  const url = `https://api-v2.soundcloud.com/media/soundcloud:tracks:${trackId}/${hlsBody}/stream/hls?client_id=${clientId}&track_authorization=${trackAuth}`;
  return url;
};

interface PlaylistPayload {
  mp3FileName: string;
  policy: string;
  signature: string;
  keyPairId: string;
  trackAuthorization: string;
}

/** # Parse the track's `playlist URL`.
 * URL has the structure:
 * 
https://cf-hls-media.sndcdn.com/\
  playlist/\
  4ufacd02y5DN.128.mp3/\
  playlist.m3u8?\
    Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0LzR1ZmFjZDAyeTVETi4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjcxMzE0Mzk2fX19XX0_\
    &Signature=IrPBKSoCmN5h0uof084x25hOtZhnFEnxeFRTk-vr0bTKyatIBw7L-jDf7XwyKz3heNX12vqttsAdSpsr2rmA674U3AxW-QCyezsLzrZJ1TKIvk62xQ-R4tW8n27vyz5tctk7Y~pMa2EBZ0Ctka5rHzwO6TN~j1BTMFaf5KcKBJrx4b9BtzuKELVSHA01KlV79Qa7n1g0WVNN2tDsYB6GUwRRNlQEshJakpQDM6qzvmB26Tg0fVCOMNzEgfDzP8LTM5FpWroqMPYMTs7kWpZrJ5EEewzMLKmQ4EZ9nhiupmDMy3Y52MRn~Fc~VtdTpsb~KYTWrKG9g6d0KkfMFBCqUw__\
    &Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ\
    &track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6Ijc4MGQwNWU1LTFhMzItNDRmNy04ZjZmLTk0Mzk2NjBiMDJkMiIsImlhdCI6MTY3MTMxNDAzNn0.ohoTp60H0vELqV4WcIv7m5VRU5ZGhO8duAU8csKEOKE
 */
const parsePlaylistUrl = (playlistUrl: string): PlaylistPayload => {
  const playlistUrlBaseSplit = playlistUrl.split(
    "https://cf-hls-media.sndcdn.com/playlist/"
  );
  const mp3FileName = playlistUrlBaseSplit[1].split("/")[0];
  const policy = playlistUrl.split("playlist.m3u8?Policy=")[1].split("&")[0];
  const signature = playlistUrl.split("&Signature=")[1].split("&")[0];
  const keyPairId = playlistUrl.split("&Key-Pair-Id=")[1].split("&")[0];
  const trackAuthorization = playlistUrl
    .split("&track_authorization=")[1]
    .split("&")[0];
  return {
    mp3FileName,
    policy,
    signature,
    keyPairId,
    trackAuthorization,
  };
};
const fetchPlaylistUrl = async (
  trackId: number,
  trackHashId: string,
  trackHls: string,
  trackAuth: string,
  clientId: string
): Promise<PlaylistPayload> => {
  const playlistCallUrl = buildSignedPlaylistCall(
    trackId,
    trackHls,
    trackAuth,
    clientId
  );

  // fetch
  if (playlistCallUrl) console.log("fetching:", playlistCallUrl);
  // response `https://cf-hls-media.sndcdn.com/playlist/${trackHashId}.128.mp3/playlist.m3u8?Policy=${policy}&Signature=EFdCzjwm1c2cEmERyXCAlKdufsv7L~YYbZGbQJt5O9Mp0zl~-rIg0-yUO95M-o09Y69rfFMwSnh7fBG6oyXI5PFCSncYXJBusgO2FrBjOW6b36wf-~hHPT~pc5L7LWkXvLEy4eszR7zWIfV3ygTwjdzORvwOBWi-9-FVPyatgceBF9cr9mUYQ2cPTJdvMYT9lNg9bHyc-F9FDG23A8fcQ7HQlDKcNo0tZJZFDo4nq9cGHfCi6shHBuLvuP3rFH9hxvj3uFUypY0e3FGIUEqYukICi2mBm5mgSqapZnseuvvlRTK-LmZaf06FGB~LIufMA6UIQ~poOQshvDdMinfFGA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM`;
  const res = await fetch(playlistCallUrl);
  const resPlaylistJson: { url: string } = await res.json();

  return parsePlaylistUrl(resPlaylistJson.url);
};

const parseSongDataFromHtml = (inputHtml: string): SongData => {
  const parser = new DOMParser();
  const htmlScripts = parser
    .parseFromString(inputHtml, "text/html")
    .body.querySelectorAll("script");

  // there are multiple script elements, we need to find the one with `window.__sc_hydration` in it
  const script = [...htmlScripts].find((scriptNode: HTMLScriptElement) => {
    // could also use: innerHTML, innerText, textContent, outerText
    return scriptNode.text.includes("window.__sc_hydration");
  });

  const scriptStr = script?.text.split("window.__sc_hydration =")[1]!;
  const scriptJson: any[] = JSON.parse(scriptStr);
  const songData: SongData = scriptJson.find((elem) => {
    return elem.hydratable && elem.hydratable === "sound";
  }).data;

  return songData;
};
/** # Get MP3 file and other data from song data
 *
 * @param songData
 */
const getMp3 = async (songData: SongData) => {
  const trackHashId = songData.waveform_url
    .split("https://wave.sndcdn.com/")[1]
    .split("_m.json")[0];
  // parse
  const trackId: number = songData.id;
  const trackTranscodings: Transcoding[] = songData.media.transcodings;
  const trackMp3: Transcoding = trackTranscodings.filter((val) => {
    return val.preset === "mp3_1_0";
  })[0];
  const trackHls: string = trackMp3.url;

  const trackAuth: string = songData.track_authorization;

  // get the playlist url
  const playlistUrl: PlaylistPayload = await fetchPlaylistUrl(
    trackId,
    trackHashId,
    trackHls,
    trackAuth,
    CLIENT_ID
  );
};

/** Track url is validated prior to calling this.
 *
 * URL is in the form: https://soundcloud.com/${userInput}
 */
export const getSongInfo = async (trackUrl: string) => {
  const resolveUrl = `${trackUrl}`;
  console.log("respolve", resolveUrl);

  // send request for html
  const infoRes = await fetch(resolveUrl, {
    method: "GET",
    headers: {
      accept: "*/*",
    },
  });

  // convert html to text
  const htmlStr: string = await infoRes.text();

  // parse html, get the song info from the script tag

  const songData: SongData = parseSongDataFromHtml(htmlStr);
  console.log("valuevalue", songData);

  return songData;
  // return getMp3(songData)
};

export interface SongData {
  [index: string]: string | number | { transcodings: Transcoding[] };
  genre: string;
  title: string;
  waveform_url: string;
  comment_count: number;
  duration: number;
  id: number; // 1317984667
  likes_count: number;
  playback_count: number;
  reposts_count: number;
  release_date: string;
  media: {
    transcodings: Transcoding[]; // https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls
  };
  track_authorization: string; // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI4MDg3M30.NtHZS90th2v8CbYqlPkjemw9qbZZHBl2ZBCQwFnTksk";
  artwork_url: string;
  permalink_url: string;
  permalink: string;
  // created_at?: string;
  // description?: string;
  // embeddable_by?: string;
  // kind?: string;
  // last_modified?: string;
  // license?: string;
  // state?: string;
  // track_format?: string;
  // uri?: string;
  // urn?: string;
  // display_date?: string;
  // tag_list?: string;
  // download_count?: number;
  // full_duration?: number;
  // user_id?: number;
  // commentable?: boolean;
  // downloadable?: boolean;
  // has_downloads_left?: boolean;
  // public?: boolean;
  // streamable?: boolean;
  // caption?: any;
  // label_name?: any;
  // visuals?: any;
  // purchase_title?: any;
  // purchase_url?: any;
}
export interface Transcoding {
  url: string; //"https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls";
  preset: string; //"mp3_1_0";
  duration: number;
  // quality?: string; //"sq";
  // snipped?: boolean;
}
