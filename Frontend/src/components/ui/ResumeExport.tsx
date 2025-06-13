// src/components/ResumeExport.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeData } from '../../types/ResumeData' // Adjust path accordingly

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
});

const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.title}>{data.fullName}</Text>
        <Text style={styles.text}>{data.email}</Text>
        <Text style={styles.text}>{data.phoneNumber}</Text>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.title}>Professional Summary</Text>
        <Text style={styles.text}>{data.summary}</Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.title}>Skills</Text>
        {data.skills.map((skill, index) => (
          <Text key={index} style={styles.text}>
            {skill.title} ({skill.level})
          </Text>
        ))}
      </View>

      {/* More Sections like Experience, Education, etc. */}
    </Page>
  </Document>
);

const ResumeExport: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div>
    <PDFDownloadLink document={<ResumePDF data={data} />} fileName="resume.pdf">
      {({ loading }) => (loading ? 'Loading document...' : 'Download Resume')}
    </PDFDownloadLink>
  </div>
);

export default ResumeExport;
