import React, { useState } from 'react';

export default function ModalCalcul({ tab }) {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [adjustmentType, setAdjustmentType] = useState('majoration'); // default to 'majoration'
    const [percentage, setPercentage] = useState(0); // initialisation avec 0
    const [adjustedTotal, setAdjustedTotal] = useState(0); // initialisation avec 0

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const selectedItems = Object.values(tab).filter((_, index) => checkedItems[index]);

    // Calcul du montant total après ajustement
    const calculateAdjustedTotal = () => {
        
        if (percentage <= 0 || selectedItems.length === 0) {
            return 0; // Si le pourcentage est nul ou s'il n'y a aucun élément cochés, le montant ajusté est zéro
        }
        
        const totalAmount = selectedItems.reduce((total, ligne) => total + parseFloat(ligne.prixTTC), 0);
        console.log(totalAmount)
        const adjustmentFactor = adjustmentType === 'majoration' ? (1 + percentage / 100) : (1 - percentage / 100);
        return totalAmount * adjustmentFactor;
    };

    const handlePercentageChange = (event) => {
        const newPercentage = parseFloat(event.target.value);
        console.log("new pourcentage ", typeof(newPercentage))
        setPercentage(newPercentage);
        setAdjustedTotal(calculateAdjustedTotal());
    };

    return (
        
        <div>
            {/* {console.log(selectedItems)} */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>Calcul</button>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-3/4 h-3/4 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Ajustement</p>
                                <div className="modal-close cursor-pointer z-50" onClick={toggleModal}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M16.22 14.74l-1.48 1.48L9 10.48l-5.74 5.74-1.48-1.48L7.52 9 1.78 3.26l1.48-1.48L9 7.52l5.74-5.74 1.48 1.48L10.48 9z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Affichage des éléments cochés */}
                            <ul>
                                {Object.values(tab).map((ligne, index) => (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[index]}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <p>Designation: {ligne.designation} - Prix TTC: {ligne.prixTTC}</p>
                                        <hr className="border-t-2 border-blue-800 my-3" />
                                    </li>
                                ))}
                            </ul>
                            {/* Sélection du type d'ajustement */}
                            <div className="mb-4">
                                <input type="radio" id="majoration" name="adjustment" value="majoration" checked={adjustmentType === 'majoration'} onChange={() => setAdjustmentType('majoration')} />
                                <label htmlFor="majoration" className="ml-2">Majoration</label>
                                <input type="radio" id="rabais" name="adjustment" value="rabais" checked={adjustmentType === 'rabais'} onChange={() => setAdjustmentType('rabais')} />
                                <label htmlFor="rabais" className="ml-2">Rabais</label>
                            </div>
                            {/* Champ pour spécifier le pourcentage */}
                            <div className="mb-4">
                                <label htmlFor="percentage" className="block">Pourcentage :</label>
                                <input type="number" id="percentage" value={percentage} onChange={handlePercentageChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
                            </div>
                            {/* Montant total après ajustement */}
                            
                            <p className="text-xl font-semibold">Montant total après ajustement : {adjustedTotal.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
