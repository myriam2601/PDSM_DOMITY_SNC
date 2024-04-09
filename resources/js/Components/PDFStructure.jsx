import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
// Styles inspirés de Tailwind pour @react-pdf/renderer
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        paddingHorizontal: 20, // Réduire pour plus de largeur utilisable
        paddingVertical: 30,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        color: "#111827",
    },
    infoSection: {
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#111827",
    },
    infoContent: {
        fontSize: 12,
        color: "#000000",
        marginBottom: 4,
    },
    table: {
        display: "table",
        width: "100%", // Passer à 'auto' pour permettre au tableau de s'étendre
        borderColor: "#d1d5db",
        marginHorizontal: 1, // Réduire les marges pour plus de largeur
    },
    tableRow: {
        flexDirection: "row",
        borderColor: "#d1d5db",
        backgroundColor: "#f3f4f6",
    },
    tableColHeader: {
        width: "30%", // Répartition équitable pour les 5 autres colonnes

        borderColor: "#d1d5db",
        backgroundColor: "#374151",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    tableColHeaderDesignation: {
        width: "70%", // Répartition équitable pour les 5 autres colonnes

        borderColor: "#d1d5db",
        backgroundColor: "#374151",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    tableCol: {
        width: "30%",

        borderColor: "#d1d5db",
        padding: 10,
        justifyContent: "center", // Centre verticalement le contenu dans la cellule
        alignItems: "center", // Centre horizontalement le contenu dans la cellule (pour Flexbox)
    },
    tableColDesignation: {
        width: "70%",

        borderColor: "#d1d5db",
        padding: 10,
        justifyContent: "center", // Centre verticalement le contenu dans la cellule
        alignItems: "center", // Centre horizontalement le contenu dans la cellule (pour Flexbox)
    },
    tableCellHeader: {
        fontFamily: "Helvetica-Bold",
        fontSize: 11,
        color: "#ffffff",
    },
    tableCell: {
        fontSize: 10, // Taille de police plus petite pour le texte dans les cellules
        color: "#000000",
    },
    signatureSection: {
        marginTop: 100,
    },
    signatureText: {
        fontSize: 12,
        color: "#000000",
        marginBottom: 10,
        textAlign: "left",
    },
    footer: {
        fontSize: 14,
        textAlign: "center",
        color: "#6b7280",
        marginTop: 100,
    },
    elegantHeader: {
        flexDirection: "column", // Les éléments sont disposés verticalement
        alignItems: "flex-start", // Aligner les éléments à gauche
        marginBottom: 24,
        marginLeft: 0, // Assurez-vous que l'en-tête commence à la marge gauche de la page
    },
    destinataire: {
        flexDirection: "column", // Les éléments sont disposés verticalement
        alignItems: "flex-start", // Aligner les éléments à gauche
        marginBottom: 24,
        marginLeft: 0, // Assurez-vous que l'en-tête commence à la marge gauche de la page
    },
    logoContainer: {
        position: "absolute",
        top: 30,
        left: 50,
        width: 60,
        height: 60,
        zIndex: 1000,
    },

    companyInfo: {
        fontSize: 12,
        color: "#000000",
        marginTop: 8, // Ajoutez un espace au-dessus du texte si nécessaire
    },
    companyInfoBold: {
        fontSize: 12,
        color: "#000000",
        fontFamily: "Helvetica-Bold", // Appliquer le gras
    },
    clientInfo: {
        fontSize: 12,
        color: "#000000",
        marginTop: 8,
    },
    clientInfoBold: {
        fontSize: 12,
        color: "#000000",
        fontFamily: "Helvetica-Bold", // Appliquer le gras
    },
    elegantTableHeader: {
        backgroundColor: "#e5e7eb",
    },
    sectionTitle: {
        fontSize: 22,

        color: "#000000",
        marginBottom: 8,
    },
    totalSection: {
        marginTop: 32,
        textAlign: "right",
        fontSize: 12,
        color: "#000000",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 100, // Assurez-vous que le texte commence en dessous du logo, ajustez cette valeur selon la hauteur du logo
        marginBottom: 24,
    },
    leftColumn: {
        width: "50%",
    },
    rightColumn: {
        width: "50%",
        paddingLeft: 90,
    },

    ajustementsSection: {
        marginTop: 10,
        padding: 10,
    },
    ajustementHeader: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 5,
    },
    ajustementText: {
        fontSize: 10,
        marginLeft: 10,
    },

    rightTextBlock: {
        position: "absolute",
        top: 30,
        right: 50,
        width: 200,
    },
    textContent: {
        fontSize: 12,
        color: "#000000",
        textAlign: "right",
        marginBottom: 4,
    },
    titleText: {
        fontSize: 22,
        color: "#000000",
        fontFamily: "Helvetica-Bold",
        marginBottom: 10,
        textAlign: "right",
    },
});

// Utilisation des styles dans le composant PDFStructure reste inchangée.

const PDFStructure = ({
    dev_liste_prestation,
    client,
    parametre,
    devisGeneral,
}) => {
    const tabDevis = JSON.parse(dev_liste_prestation);
    
    const libelles = tabDevis["libelles"];
    const ajustements = tabDevis["ajustements"];
    console.log(ajustements);
    // Calcul du total TTC initial
    const totalTTC = libelles.reduce((acc, curr) => acc + curr.prixTTC, 0);

    // Calcul des ajustements si présents et ajustement du total TTC
    let montantTotalAjuste = 0;
    let totalFinalTTC = totalTTC;

    if (ajustements.length > 0) {
        ajustements.forEach((ajustement) => {
            const montantAjustement = parseFloat(ajustement.montantTotalAjuste);
            if (ajustement.nomAjustement.toLowerCase() === "rabais") {
                totalFinalTTC -= montantAjustement; // Soustraire le montant si c'est un rabais
            } else if (ajustement.nomAjustement.toLowerCase() === "majoration") {
                totalFinalTTC += montantAjustement; // Ajouter le montant si c'est une majoration
            }
        });
    }
    const acompte = totalFinalTTC * 0.30;
    return (
        <PDFViewer className="w-full h-screen">
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image
                        style={styles.logoContainer}
                        src={`/storage/${parametre.par_logo}`}
                    />
                    <View style={styles.rightTextBlock}>
                        <Text style={styles.titleText}>
                            {devisGeneral.dev_nom}
                        </Text>
                        <Text style={styles.textContent}>
                            Date : {format(devisGeneral.dev_date, "dd/MM/yyyy")}
                        </Text>
                        <Text style={styles.textContent}>
                            Date de validité :{" "}
                            {format(
                                devisGeneral.dev_fin_validite,
                                "dd/MM/yyyy"
                            )}
                        </Text>
                    </View>
                    <View style={styles.headerRow}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.companyInfoBold}>
                                {parametre.par_nom_societe}
                            </Text>
                            <Text style={styles.companyInfo}>
                                {parametre.par_adresse}
                                {"\n"}
                                {parametre.par_localite}, {parametre.par_npa}
                                {"\n"}
                                {parametre.par_email}
                                {"\n"}
                                {parametre.par_site_web}
                            </Text>
                        </View>

                        <View style={styles.rightColumn}>
                            <Text style={styles.clientInfoBold}>
                                {client.cli_societe}
                            </Text>
                            <Text style={styles.clientInfo}>
                                {client.cli_nom}
                                {"\n"}
                                {client.cli_prenom}
                                {"\n"}
                                {client.cli_adresse} {client.cli_npa}
                                {"\n"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow} fixed>
                            <View style={styles.tableColHeaderDesignation}>
                                <Text style={styles.tableCellHeader}>
                                    Désignation
                                </Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>
                                    Quantité
                                </Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>
                                    Prix U.
                                </Text>
                            </View>

                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>
                                    Prix HT
                                </Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>TVA</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>
                                    Montant
                                </Text>
                            </View>
                        </View>
                        {libelles.map((ligne, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.tableRow,
                                    {
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "#f0f3fe"
                                                : "#fff",
                                    },
                                ]}
                            >
                                <View style={styles.tableColDesignation}>
                                    <Text style={styles.tableCell}>
                                        {ligne.designation}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {ligne.quantite}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {ligne.prixUnitaire}
                                    </Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {ligne.prixHT} CHF
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {ligne.tva} %
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {ligne.prixTTC} CHF
                                    </Text>
                                </View>
                            </View>
                        ))}
                        <View style={styles.ajustementsSection}>
                        {ajustements.map((ajustement, indexAjustement) => (
                            <View key={indexAjustement} style={{ marginBottom: 10 }}>
                                <Text style={styles.ajustementHeader}>
                                    {ajustement.appellationAjustement} - {ajustement.nomAjustement} (taux: {ajustement.taux}%):
                                </Text>
                                {ajustement.identifiantDesignation.map((idLibelle) => {
                                    const libelleConcerne = libelles.find((libelle) => libelle.id === idLibelle);
                                    return libelleConcerne ? (
                                        <Text key={idLibelle} style={styles.ajustementText}>
                                            - {libelleConcerne.designation} à {ajustement.montantTotalAjuste} CHF 
                                        </Text>
                                    ) : null;
                                })}
                            </View>
                        ))}
                    </View>
                    </View>

                    <View style={styles.totalSection}>
                        <Text>Total TTC sans ajustements: {totalTTC.toFixed(2)} CHF</Text>
                        <Text>Total à payer après ajustements: {totalFinalTTC.toFixed(2)} CHF</Text>
                        <Text>Accompte (30%): {acompte.toFixed(2)} CHF</Text>
                    </View>

                    <View style={styles.signatureSection}>
                        <Text style={styles.signatureText}>
                            Date et signature du client :
                        </Text>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderColor: "#d1d5db",
                                marginVertical: 5,
                            }}
                        ></View>
                    </View>
                    <Text style={styles.footer}>
                        Merci pour votre confiance.
                    </Text>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PDFStructure;
