// PagePDF.jsx

import PDFStructure from "@/Components/PDFStructure";


//import ClientsDisplay from "@/Components/ClientsDisplay";

const PDFDisplay = ({ dev_liste_prestation, client, parametre }) => {
    
  return (
  
    <div>
      <h1>Données JSON en texte brut :</h1>
      <pre>{dev_liste_prestation}</pre>
      
      {/* Utiliser PDFComponent pour afficher le PDF */}
      <PDFStructure dev_liste_prestation={dev_liste_prestation} client={client} parametre={parametre} />
    </div>
    
  );
};

export default PDFDisplay;
