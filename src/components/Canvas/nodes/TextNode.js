import React from "react";
import { Handle } from "reactflow";
import { useFlowDispatch } from "../../../state/flowContext";
// Outlined Message icon (chat bubble)
const messageIcon = (
  <svg width="18" height="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }} overflow="visible">
    {/* larger white circular background (extends beyond the original circle) */}
    {/* <circle cx="256" cy="256" r="300" fill="#fff" /> */}
    <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" fill="#838b86ff"/>
  </svg>
);

// Outlined WhatsApp icon
const whatsappIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path>
    <path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path>
    <path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path>
    <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
    <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
  </svg>
);

const TextNode = ({ id, data, selected }) => {
  const dispatch = useFlowDispatch();
  const message = typeof data?.text === "string" ? data.text : "New message";

  function handleChange(e) {
    const value = e.target.value;
    // If input is empty, set text to empty string (not "New message")
    dispatch({ type: "UPDATE_NODE", id, data: { ...data, text: value } });
  }

  return (
    <div
      style={{
        borderRadius: 24,
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        background: "#fff",
        minWidth: 240,
        maxWidth: 280,
        minHeight: 100,
        border: selected ? "2px solid #25D366" : "none",
        position: "relative",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with left message icon, label, and WhatsApp icon */}
      <div
        style={{
          background: "rgb(208 249 231)",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 44,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 0,
          position: "relative",
        }}
      >
        {/* Left message icon */}
        <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{messageIcon}</div>
        {/* Label */}
        <span style={{ fontWeight: 600, fontSize: 18, color: "#222", flex: 1, textAlign: 'left', marginLeft: 8 }}>Send Message</span>
        {/* WhatsApp icon right-aligned */}
        <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{whatsappIcon}</div>
      </div>
      {/* Handles */}
      <Handle type="target" position="left" style={{ top: 56, background: "#222" }} />
      <Handle type="source" position="right" style={{ top: 56, background: "#222" }} />
      {/* Message text */}
      <div style={{ padding: "14px 24px 14px 24px", fontSize: 18, color: "#222", textAlign: "left" }}>
        <input
          type="text"
          value={typeof data?.text === "string" ? data.text : ""}
          placeholder="New message"
          onChange={handleChange}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 16,
            color: "#222",
            width: "100%",
            fontWeight: 400,
            padding: 0,
            margin: 0,
          }}
        />
      </div>
    </div>
  );
};

export default TextNode;
