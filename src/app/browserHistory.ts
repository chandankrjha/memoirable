/// <reference path="../../typings/index.d.ts" />

import { createHistory, createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';

const browserHistory = useRouterHistory(createHashHistory)({
  //basename: '/memoirable'
});

export default browserHistory;