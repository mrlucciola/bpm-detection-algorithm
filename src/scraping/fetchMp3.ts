import { CLIENT_ID } from "../.main.env";
import { SongMetrics } from "../components/Home/SongInput";
import { Transcoding } from "./SongMetadata";

const apiV2BaseUrl = "https://api-v2.soundcloud.com";
const mediaBaseUrl = "https://cf-hls-media.sndcdn.com";

/**
 * https://api-v2.soundcloud.com/media/soundcloud:tracks:170734376/d7cb779d-d356-4bbf-b799-c6944eae0829/stream/hls
 */
export const parseTrackHashFromMetadata = (songMetadata: SongMetrics): string => {
  const trackTranscodings: Transcoding[] = songMetadata.media.transcodings;
  const transcodingUrl: string = trackTranscodings.filter((val) => {
    return val.preset.includes("mp3_") && val.format.protocol === "hls";
  })[0].url;

  let url = transcodingUrl.split("soundcloud:tracks:")[1]; // -> ${trackId}/${songHash}/stream/hls
  url = url.split("/stream/hls")[0]; // -> ${trackId}/${songHash}
  const trackHash = url.split("/")[1]; // -> ${songHash}

  return trackHash;
};

const buildPreMp3Url = (songMetadata: SongMetrics) => {
  const trackId = songMetadata.id;
  const songHash = parseTrackHashFromMetadata(songMetadata);
  const trackAuth = "";
  return `${apiV2BaseUrl}/media/soundcloud:tracks:${trackId}/${songHash}/stream/hls?client_id=${CLIENT_ID}&track_authorization=${trackAuth}`;
};

/**
 * ## Template is:
 * `https://api-v2.soundcloud.com/media/soundcloud:tracks:${trackId}/{songHash}/stream/hls?client_id=${CLIENT_ID}&track_authorization=${trackAuth}`
 * ex: https://api-v2.soundcloud.com/media/soundcloud:tracks:170734376/d7cb779d-d356-4bbf-b799-c6944eae0829/stream/hls?client_id=0K8gqs6E9DAVUafZxVq6xIIVVjtIgXTv&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImZiOTJkOWRmLWRhMjEtNDI3OC1iZWQxLTE1YWZhMjIxMjdkZCIsImlhdCI6MTY3MTU4Njg3Mn0.nMqIe3ZvOgmRI3bnakQAqsmeCZiwcimd2868Reysj-g
 *
 * @todo Create a "URL-fetcher" file to build all URLs used in this algo
 */
export const fetchMp3Url = async (
  songMetadata: SongMetrics
): Promise<string> => {
  const preMp3Url = buildPreMp3Url(songMetadata);

  const mp3UrlRes = await fetch(preMp3Url);
  const mp3UrlJson: { url: string } = await mp3UrlRes.json();
  if (!mp3UrlJson.url.includes(mediaBaseUrl))
    throw new Error("Error getting mp3 url - media-base-url");

  return mp3UrlJson.url;
};

/**
 * ## Template is:
 * ``
 * ex: https://cf-hls-media.sndcdn.com/playlist/6qNXQubfWGR7.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0LzZxTlhRdWJmV0dSNy4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjcxNTg3ODE3fX19XX0_&Signature=JLtcv5jUaUEPOi9NhTklLErSohyuz2HoEQhtPFIglTkZSSAOF1FXrDBRrdo7JdBb~bT7nxLmKZRcl6P4ufSDKs2034rHkLm2cZKMl0yfsQ-tZYGtpZKMfHP~5BHvV11L7kfwgOn8bZNkxj7oruq3jgvZxtX4rvNOJkKoFq19oFTnL30SSsjLl3XsztpzSSxoN5MgV6VZZlUluowv1qYePIRbmWpDtT6VedYF0aksu8nufdlXkEGTnaemzGDkmYx39ZQHCbuuxVkUQaDB4VJwahKdezRNM9rbM4d1fQsScm0sF93U8~a6WxhmzUyfKJYIQCmTo8AuhwxR5MulPvGNTg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImZiOTJkOWRmLWRhMjEtNDI3OC1iZWQxLTE1YWZhMjIxMjdkZCIsImlhdCI6MTY3MTU4Njg3Mn0.nMqIe3ZvOgmRI3bnakQAqsmeCZiwcimd2868Reysj-g
 */
export const fetchMp3 = async (songMetadata: SongMetrics): Promise<string> => {
  const mp3Url: string = await fetchMp3Url(songMetadata);
  console.log("mp3Url", mp3Url);
  return mp3Url;
};