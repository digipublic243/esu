import * as React from 'react';
import { GiSpiderWeb } from 'react-icons/gi';

const EmptyState = () => (
    <div className="m-auto flex flex-col justify-center items-center gap-5 font-light">
        <GiSpiderWeb size={100} />
        Aucune ressource sélectionnée pour l&lsquo;instant
    </div>
);

export default EmptyState;
