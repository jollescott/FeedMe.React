import React from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export default class AdComponent extends React.Component {
  public componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  public render() {
    return (
      <div className="ad">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4571482486671250"
          data-ad-slot="xxxxxxxxxx"
          data-ad-format="auto"
          data-adtest="on"
        />
      </div>
    );
  }
}
