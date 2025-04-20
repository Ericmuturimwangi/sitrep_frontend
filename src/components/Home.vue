<template>
    <div>
      <h2>Submit PDF to Brigade</h2>
      <input type="file" @change="handleFileChange" />
      <input type="date" v-model="date" />
      <button @click="submitPdf" :disabled="!isFormValid">Submit</button>
      <div v-if="submissionStatus" :class="submissionStatus.success ? 'success' : 'error'">
        {{ submissionStatus.message }}
      </div>
    </div>
  </template>
  
  <script>
  import api from '../axios' ;
  
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
        formData.append('pdf_file', this.file);
        formData.append('submission_date', this.date);
        formData.append('unit', 1);
  
        try {
          const response = await api.post('submissions/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log(response.data); // ✅ This line is now back
  
          this.submissionStatus = {
            success: true,
            message: 'PDF submitted successfully!',
          };
        } catch (err) {
          console.error(err);
          this.submissionStatus = {
            success: false,
            message: 'Submission failed. Please try again.',
          };
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>