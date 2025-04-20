<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">📤 Submit PDF to Brigade</h2>

      <div class="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          @change="handleFileChange"
          class="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <input
          type="date"
          v-model="date"
          class="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          @click="submitPdf"
          :disabled="!isFormValid"
          class="w-full bg-blue-600 text-white font-medium py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Submit
        </button>

        <div
          v-if="submissionStatus"
          :class="submissionStatus.success ? 'text-green-600' : 'text-red-600'"
          class="text-center mt-4 font-semibold"
        >
          {{ submissionStatus.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../axios';

export default {
  name: 'HomePage',
  data() {
    return {
      file: null,
      date: '',
      submissionStatus: null,
    };
  },
  computed: {
    isFormValid() {
      return this.file && this.date;
    },
  },
  methods: {
    handleFileChange(e) {
      this.file = e.target.files[0];
    },
    async submitPdf() {
      if (!this.isFormValid) {
        alert('Please fill in all fields');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file); // ✅ matches Django model
      formData.append('date', this.date); // ✅ matches Django model
      formData.append('unit', 1); // ✅ replace with dynamic ID if needed

      try {
        await api.post('submissions/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.submissionStatus = {
          success: true,
          message: '✅ PDF submitted successfully!',
        };

        // Reset form
        this.file = null;
        this.date = '';
      } catch (err) {
        console.error(err.response?.data || err);
        this.submissionStatus = {
          success: false,
          message: '❌ Submission failed. Please try again.',
        };
      }
    },
  },
};
</script>

<style scoped>
/* Optional scoped styling if needed */
</style>