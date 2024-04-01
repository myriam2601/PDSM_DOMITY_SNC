// ParametrageLink.js

import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import {Cog6ToothIcon} from "@heroicons/react/24/outline";

const ParametrageLink = ({ parametreId }) => {
    const parametreEditUrl = parametreId ? `/parametres/${parametreId}/edit` : '/parametres';

    return (
        <Link
            href={parametreEditUrl}
            className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
            <Cog6ToothIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" />
            Paramétrage
        </Link>
    );
};

export default ParametrageLink;
