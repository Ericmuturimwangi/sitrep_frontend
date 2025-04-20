<template>
    <div>
      <h2>HQ Reports Dashboard</h2>
  
      <div v-if="reports.length === 0">No reports submitted yet.</div>
  
      <div v-for="report in reports" :key="report.id" class="report">
        <h3>Brigade: {{ report.brigade_name }}</h3>
        <p>Submitted On: {{ report.created_at }}</p>
  
        <a :href="report.compiled_pdf_url" target="_blank">Download Compiled PDF</a>
  
        <table>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Submission Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sub in report.submissions" :key="sub.id">
              <td>{{ sub.unit_name }}</td>
              <td>{{ sub.submission_date }}</td>
              <td>{{ sub.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../axios';
  
  export default {
    data() {
      return {
        reports: [],
      };
    },
    async mounted() {
      const res = await api.get('reports/');
      this.reports = res.data.map(r => ({
        ...r,
        compiled_pdf_url: `/media/${r.compiled_report_filename}`, // adjust if you use another media root
      }));
    },
  };
  </script>
  
  <style scoped>
  .report {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ccc;
  }
  </style>