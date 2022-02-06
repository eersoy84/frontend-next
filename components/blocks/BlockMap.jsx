// react
import React from 'react';

export default function BlockMap() {
  return (
    <div className="block-map block">
      <div className="block-map__body">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%C3%87ak%C4%B1r%20Sk.%20No:9,%20Do%C4%9Fu,%2034890%20Pendik/%C4%B0stanbul+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    // src="https://maps.google.com/maps?q=Holbrook-Palmer%20Park&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          height="50"
        />
      </div>

    </div>
  );
}
