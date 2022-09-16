import React, { useState, useEffect, useRef } from 'react';
import { UserPreferences } from './services/UserPreferences';
import { Index, Loading } from "./views";

const App = () => {
    const [appData, setAppData] = useState(null);
    useEffect(() => {
        (async () => {
            const preferences = UserPreferences.read();
            const i18n = await fetch(`conf/i18n/${preferences.lang}/ui.json`);
            setAppData({ preferences, i18n });
        })();
      }, []);
    return (
        <>{ appData ? <Index /> : <Loading />} </>
    );
}
export default App;
