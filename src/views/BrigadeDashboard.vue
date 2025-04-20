<template>
  <div class="p-6 min-h-screen bg-gray-100">
    <div class="max-w-4xl mx-auto bg-white rounded shadow p-6">
      <h1 class="text-2xl font-bold mb-6 text-center text-blue-700">🗂️ Brigade Dashboard</h1>

      <div v-if="loading" class="text-center text-gray-600">Loading submissions...</div>

      <div v-if="submissions.length === 0 && !loading" class="text-center text-gray-500">
        No submissions in brigade yet.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="submission in submissions"
          :key="submission.id"
          class="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              📄 {{ submission.unit_name }} - {{ submission.date }}
            </h2>
            <p class="text-sm text-gray-600">Status: {{ submission.status }}</p>
            <a
              :href="submission.file"
              target="_blank"
              class="text-blue-600 underline text-sm mt-2 inline-block"
            >
              View PDF
            </a>
          </div>

          <button
            @click="sendToHQ(submission.id)"
            class="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
            :disabled="submission.status !== 'IN_BRIGADE'"
          >
            Send to HQ
          </button>
        </div>
      </div>

      <div v-if="actionMessage" class="text-center text-sm text-green-600 mt-4">
        {{ actionMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import api from '../axios';

export default {
  name: 'BrigadeDashboard',
  data() {
    return {
      submissions: [],
      loading: true,
      actionMessage: '',
    };
  },
  methods: {
    async fetchSubmissions() {
      this.loading = true;
      try {
        const res = await api.get('/submissions/');
        this.submissions = res.data
          .filter((sub) => sub.status === 'IN_BRIGADE')
          .map((sub) => ({
            ...sub,
            unit_name: sub.unit.name, // assumes nested unit data
          }));
      } catch (err) {
        console.error('Error fetching submissions:', err);
      } finally {
        this.loading = false;
      }
    },
    async sendToHQ(submissionId) {
      try {
        await api.post(`/submissions/${submissionId}/send_to_hq/`);
        this.actionMessage = '✅ Submission sent to HQ successfully.';
        this.fetchSubmissions();
      } catch (err) {
        console.error(err.response?.data || err);
        this.actionMessage = '❌ Failed to send submission to HQ.';
      }
    },
  },
  mounted() {
    this.fetchSubmissions();
  },
};
</script>

<style scoped>
/* optional styling */
</style>