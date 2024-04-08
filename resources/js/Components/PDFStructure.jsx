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

// Styles inspirés de Tailwind pour @react-pdf/renderer
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        paddingHorizontal: 50,
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
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#111827",
    },
    infoContent: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 4,
    },
    table: {
        display: "table",
        width: "100%", // Augmente la largeur pour une meilleure disposition
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#d1d5db",
        backgroundColor: "#f3f4f6", // Un gris plus clair pour les rangées
    },
    tableColHeader: {
        width: "16.666%",
        borderRightWidth: 1,
        borderColor: "#d1d5db",
        backgroundColor: "#374151", // Un fond plus foncé pour l'entête
        padding: 10,
    },
    tableCol: {
        width: "16.666%",
        borderRightWidth: 1,
        borderColor: "#d1d5db",
        padding: 10,
    },
    tableCellHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
    tableCell: {
        fontSize: 14,
        color: "#4b5563",
    },
    signatureSection: {
        marginTop: 20,
    },
    signatureText: {
        fontSize: 14,
        color: "#111827",
        marginBottom: 5,
        textAlign: "center",
    },
    footer: {
        fontSize: 14,
        textAlign: "center",
        color: "#6b7280",
        marginTop: 20,
    },
    elegantHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    logoContainer: {
        width: 60,
        height: 60,
    },
    companyInfo: {
        fontSize: 14,
        color: "#1f2937",
    },
    elegantTableHeader: {
        backgroundColor: "#e5e7eb",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 8,
    },
    totalSection: {
        marginTop: 32,
        textAlign: "right",
        fontSize: 16,
        fontWeight: "bold",
        color: "#1f2937",
    },
});

// Utilisation des styles dans le composant PDFStructure reste inchangée.


const PDFStructure = ({ dev_liste_prestation, client, parametre }) => {

    const tabDevis = JSON.parse(dev_liste_prestation);
    console.log(parametre);
    const libelles = tabDevis["libelles"];
    const ajustements = tabDevis["ajustements"];
    console.log(ajustements);
    return (
        <PDFViewer className="w-full h-screen">
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.elegantHeader}>
                    <Text style={styles.companyInfo}>
                        {parametre.par_nom_societe}{"\n"}
                        {parametre.par_adresse}{"\n"}
                        {parametre.par_localite}{"\n"}
                        {parametre.par_npa}{"\n"}
                        {parametre.par_email}{"\n"}
                        {parametre.par_site_web}{"\n"}
                    </Text>
                        <Image
                        style={styles.logoContainer}
                        src={`/storage/${parametre.par_logo}`}
                        />
                    </View>
                    <Text style={styles.header}>Devis</Text>

                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        {/* Section Émetteur */}
                        <View style={{ width: "50%" }}>
                            <Text style={styles.infoTitle}>Émetteur:</Text>
                            <Text style={styles.infoContent}>
                            {parametre.par_nom_societe}
                            </Text>
                            <Text style={styles.infoContent}>
                            {parametre.par_adresse}
                            </Text>
                            <Text style={styles.infoContent}>
                                Autres informations
                            </Text>
                        </View>

                        {/* Section Destinataire */}
                        <View style={{ width: "50%" }}>
                            <Text style={styles.infoTitle}>Destinataire:</Text>
                            <Text style={styles.infoContent}>
                                Nom : {client.cli_nom}
                            </Text>
                            <Text style={styles.infoContent}>
                                Prenom : {client.cli_prenom}
                            </Text>
                            <Text style={styles.infoContent}>
                                Société : {client.cli_societe}
                            </Text>
                            <Text style={styles.infoContent}>
                                Adresse : {client.cli_adresse} {client.cli_npa}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow} fixed>
                            <View style={styles.tableColHeader}>
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
                                    Prix Unitaire
                                </Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>TVA</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>
                                    Prix HT
                                </Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>
                                    Prix TTC
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
                                <View style={styles.tableCol}>
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
                                        {ligne.tva}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {ligne.prixHT}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {ligne.prixTTC}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        {ajustements.map((ajustement, indexAjustement) => (
                            <View
                                key={indexAjustement}
                                style={{ marginBottom: 10 }}
                            >
                                {" "}
                                {/* Stylez comme vous le souhaitez */}
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 24 }}
                                >
                                    {ajustement.appellationAjustement} :
                                </Text>
                                {ajustement.identifiantDesignation.map(
                                    (idLibelle) => {
                                        const libelleConcerne = libelles.find(
                                            (libelle) =>
                                                libelle.id === idLibelle
                                        );
                                        return libelleConcerne ? (
                                            <Text
                                                key={idLibelle}
                                                style={{ marginLeft: 10 }}
                                            >
                                                {" "}
                                                - {libelleConcerne.designation}
                                            </Text>
                                        ) : null;
                                    }
                                )}
                            </View>
                        ))}
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: 20,
                        }}
                    >
                        <View style={{ ...styles.totalSection }}>
                        <Text>Total TTC: XXXXX €</Text>
                        <Text>Accompte (30%): XXXX €</Text>
                    </View>
                    </View>

                    <View style={styles.signatureSection}>
                        <Text style={styles.signatureText}>
                            Date et signature du client :
                        </Text>
                        <View style={{ borderBottomWidth: 1, borderColor: "#d1d5db", marginVertical: 5 }}></View>
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
