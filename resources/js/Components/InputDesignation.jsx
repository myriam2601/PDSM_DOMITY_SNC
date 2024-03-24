/* eslint-disable react/prop-types */

export function InputDesignation({value, onChange}){
    return <div>
            <input
            type="text"
            value={value}
            placeholder="Nouvelle Désignation"
            onChange={(e)=> onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primaryDarkBlue focus:border-primaryDarkBlue sm:text-sm"
            />
        </div>
}

/*  --> STD = mettre les propTyps quand même*/

/* , qte, pu, prixTotal, TVA */