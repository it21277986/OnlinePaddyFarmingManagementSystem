import React from 'react';

const PaddyInfo = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <br /><br /><br /><br />
          <h2>
            Paddy, also called rice paddy, small, level, flooded field used to cultivate rice in southern and eastern Asia.
            Wet-rice cultivation is the most prevalent method of farming in the Far East,
            where it utilizes a small fraction of the total land yet feeds the majority of the rural population.
          </h2>
          <h2>
            Rice was domesticated as early as 3500 BC, and by about 2,000 years ago it was grown in almost all of the
            present-day cultivation areas, predominantly deltas, floodplains and coastal plains, and some terraced valley slopes.
          </h2>
        </div>
        <div className="col-md-6">
          <br /><br /><br /><br />
          <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6 float-right"
            src="thimalkaimg/about1.jpg" alt="..." />
          <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6 float-right"
            src="thimalkaimg/about2.jpg" alt="..." />
        </div>
      </div>
    </div>
  );
};

export default PaddyInfo;
