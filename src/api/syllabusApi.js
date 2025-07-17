// src/api/syllabusApi.js

const AIRTABLE_API_KEY = 'YOUR_API_KEY'; // store in .env in production
const BASE_ID = 'YOUR_BASE_ID';
const TABLE_NAME = 'Syllabus';

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
};

// Upload new syllabus
export async function uploadSyllabus(data) {
  const payload = {
    records: [
      {
        fields: {
          studentId: data.studentId,
          parentId: data.parentId,
          fileName: data.fileName,
          fileUrl: data.fileUrl,
          extractedText: data.extractedText,
          academicYear: data.academicYear,
          grade: data.grade,
          board: data.board,
          subject: data.subject,
        },
      },
    ],
  };

  const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  return result;
}

// Get syllabi for a specific student
export async function getSyllabiByStudent(studentId) {
  const filterFormula = encodeURIComponent(`{studentId} = '${studentId}'`);

  const response = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula=${filterFormula}`,
    {
      method: 'GET',
      headers,
    }
  );

  const result = await response.json();
  return result.records;
}
