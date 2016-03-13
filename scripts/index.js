import React from 'react';
import {render} from 'react-dom';
import Frame from './Components/Frame';


render(
  <Frame />, // this line calls app.render() into the root of the Document
  document.getElementById('root')
);
