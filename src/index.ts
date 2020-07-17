import { FrameworkEnvironment, SVScript, SVScriptFactory } from '../framework/types';

import packageJsonClientInfo from './package-json-client-info';

const svScriptFactory: SVScriptFactory = ({ SV, log }: FrameworkEnvironment): SVScript => {
  let count = 0;
  const intervalCallback = (): void => {
    log.info('Callback called', count);
    count++;
    const navMain = SV.getMainEditor().getNavigation();
    const [tLeft] = navMain.getTimeViewRange();
    navMain.setTimeLeft(tLeft + SV.QUARTER / count);

    if (count < 100) {
      SV.setTimeout(500, intervalCallback);
    } else {
      SV.finish();
    }
  };

  const main = (): void => {
    const navMain = SV.getMainEditor().getNavigation();

    navMain.setTimeScale(50 / SV.QUARTER);

    intervalCallback();
  };

  return {
    getClientInfo: packageJsonClientInfo,
    main,
  };
};

export default svScriptFactory;
