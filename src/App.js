import React, { useState, useEffect, useRef } from 'react';
import { useAppData } from 'views/_functions/Hooks';
import { Index, Loading } from "views";

const App = () => {
    const { appData } = useAppData();
    return (
        <>{ appData ? <Index /> : <Loading />} </>
    );
}
export default App;
