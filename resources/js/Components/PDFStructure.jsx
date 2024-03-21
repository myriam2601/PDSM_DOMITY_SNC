import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Styles inspirés de Tailwind pour @react-pdf/renderer
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#374151',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#374151',
  },
  infoContent: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
  },
  table: {
    display: "table",
    width: "auto",
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
  },
  tableColHeader: {
    width: "16.666%",
    borderRightWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#1b263b',
    padding: 8,
  },
  tableCol: {
    width: "16.666%",
    borderRightWidth: 1,
    borderColor: '#d1d5db',
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: '#FFFFFF',
  },
  tableCell: {
    fontSize: 10,
    color: '#4b5563',
  },
  signatureSection: {
    marginTop: 20,
  },
  signatureText: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 5,
    textAlign: 'center',
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
  },
});

const PDFComponent = ({ data }) => {
  
  const tabLignesDevis = JSON.parse(data);

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>Devis</Text>
          
          {/* Section Émetteur */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Émetteur:</Text>
            <Text style={styles.infoContent}>Nom de l'entreprise</Text>
            <Text style={styles.infoContent}>Adresse de l'entreprise</Text>
            <Text style={styles.infoContent}>Autres informations</Text>
          </View>

          {/* Section Destinataire */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Destinataire:</Text>
            <Text style={styles.infoContent}>Nom du client</Text>
            <Text style={styles.infoContent}>Adresse du client</Text>
          </View>

          {/* Tableau des lignes de devis */}
          <View style={styles.table}>
            <View style={styles.tableRow} fixed>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Désignation</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Quantité</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Prix Unitaire</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>TVA</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Prix HT</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Prix TTC</Text></View>
            </View>
            {tabLignesDevis.map((ligne, index) => (
              <View key={index} style={[styles.tableRow, {backgroundColor: index % 2 === 0 ? '#f0f3fe' : '#fff'}]}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{ligne.designation}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{ligne.quantite}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{ligne.prixUnitaire}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{ligne.tva}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{ligne.prixHT}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{ligne.prixTTC}</Text></View>
              </View>
            ))}
          </View>
          
          {/* Section Signature */}
          <View style={styles.signatureSection}>
            <Text style={styles.signatureText}>Signature du client:</Text>
            <View style={{ borderTop: '2 dashed #d1d5db', marginHorizontal: 100, marginTop: 5 }}></View>
          </View>

          <Text style={styles.footer}>Merci de faire affaire avec nous !</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFComponent;
