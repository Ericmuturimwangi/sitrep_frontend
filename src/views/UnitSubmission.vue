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
  import api from '../axios'; // Import the api instance for Axios
  
  export default {
    data() {
      return {
        file: null,
        date: '',
        submissionStatus: null, // To show success/error messages
      };
    },
    computed: {
      // Computed property to check if the form is valid
      isFormValid() {
        return this.file && this.date;
      },
    },
    methods: {
      handleFileChange(e) {
        this.file = e.target.files[0];
        console.log('Selected file:', this.file);
      },
      async submitPdf() {
        console.log('Selected file:', this.file);
        if (!this.isFormValid) {
          alert('Please fill in all fields');
          return;
        }
  
        const formData = new FormData();
        formData.append('pdf_file', this.file);
        formData.append('submission_date', this.date);
        formData.append('unit', 1); // Example unit ID
  
        try {
          const response = await api.post('submissions/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          // Log the response or handle the data if needed
          console.log(response.data);  // Use response.data or other parts of the response as needed
  
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