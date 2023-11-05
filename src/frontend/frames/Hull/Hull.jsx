import React, { useEffect } from 'react';


import "./Hull.scss";

import { pages } from '../../config/pages';
import { Router, Route } from '@randajan/jet-react/dom';


export const Hull = () => {
  return (
    <Router className="Hull" transition={500} transitionPrefix="page">
      
      {pages.map(({ id, path, content }) => <Route key={id} path={path}>{content}</Route>)}
    </Router>
  )
}

export default Hull
