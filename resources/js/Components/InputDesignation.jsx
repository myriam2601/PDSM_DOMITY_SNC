/* eslint-disable react/prop-types */

export function InputDesignation({value, onChange}){
    return <div>
            <input
            type="text"
            value={value}
            placeholder="Nouvelle Désignation"
            onChange={(e)=> onChange(e.target.value)}
            />
        </div>
}

/*  --> STD = mettre les propTyps quand même*/

/* , qte, pu, prixTotal, TVA */