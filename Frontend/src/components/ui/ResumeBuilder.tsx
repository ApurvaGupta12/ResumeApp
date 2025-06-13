import  { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 1.5,
  },
});

// Create Resume Document
const ResumeDocument = ({ name, email, experience, skills }: { name: string, email: string, experience: string, skills: string }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.content}>Email: {email}</Text>
        <Text style={styles.content}>Experience: {experience}</Text>
        <Text style={styles.content}>Skills: {skills}</Text>
      </View>
    </Page>
  </Document>
);

const ResumeBuilder = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Build Your Resume</h1>
      
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="w-full p-2 border rounded-md"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      {/* PDF Download Link */}
      <div className="mt-4">
        <PDFDownloadLink
          document={<ResumeDocument name={name} email={email} experience={experience} skills={skills} />}
          fileName="resume.pdf"
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download Resume as PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ResumeBuilder;
