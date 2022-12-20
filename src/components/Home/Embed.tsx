// react
import { useEffect, useRef } from "react";
// state
import { useHomeContext } from "./mobx";
// mui
import { Stack } from "@mui/material";
// utils
import { observer } from "mobx-react-lite";
import { SProps } from "../../mui/interfaces";

/** Displays information about input to the fetch call
 */
const Embed: React.FC<SProps> = () => {
  // state
  const title: string = useHomeContext((s) => s.songMetrics.title);
  const artworkUrl: string = useHomeContext((s) => s.songMetrics.artwork_url);
  const permalinkUrl: string = useHomeContext(
    (s) => s.songMetrics.permalink_url
  );
  const permalink: string = useHomeContext((s) => s.songMetrics.permalink);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // artist
  const artistUrl: string = permalinkUrl.replace(`/${permalink}`, "");
  const artistSlug: string = artistUrl.replace("https://soundcloud.com/", "");
  console.log("titl", title);
  useEffect(() => {
    const xxx = iframeRef.current;
    console.log("iframe ref", xxx?.contentDocument?.body);
  }, []);

  return (
    <Stack flexDirection="row" p={1}>
      <iframe
        width="100%"
        height="166"
        ref={iframeRef}
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1376227570&color=%23a488a0&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
      ></iframe>
      <div
        style={{
          fontSize: "10px",
          color: "#cccccc",
          lineBreak: "anywhere",
          wordBreak: "normal",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontFamily:
            "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sansSerif",
          fontWeight: 100,
        }}
      ></div>
    </Stack>
  );
};

export default observer(Embed);