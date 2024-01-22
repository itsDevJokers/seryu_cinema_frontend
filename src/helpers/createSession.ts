import axios from "axios";

const createSession = async (requestToken: string) => {
    try {
      // Memanggil endpoint untuk membuat session baru dengan request token yang telah terautentikasi
      const response = await axios.post('https://api.themoviedb.org/3/authentication/session/new', {
        request_token: requestToken // Token yang telah disetujui oleh pengguna
      }, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
        },
      });
  
      const sessionId = response.data.session_id;
      if (sessionId) {
        // Simpan session ID di tempat yang aman (misalnya dalam state management, localStorage, atau cookie)
        // Simpan di localstorage
        localStorage.setItem('session_id', sessionId);
        // Lakukan redirect pengguna ke halaman yang diinginkan atau tampilkan informasi bahwa login berhasil
      }
    } catch (error) {
      console.error('Error creating TMDB session:', error);
      // Handle error, seperti menampilkan pesan kesalahan ke pengguna
    }
  };

  export default createSession