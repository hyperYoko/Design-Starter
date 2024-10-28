<template>
    <div style="height: 100%; background-color: #e7f0ff">
      <v-row style="height: 85vh">
        <v-col
          md="4"
          sm="4"
          style="display: flex; align-items: center; justify-content: center; height: 100%"
        >
          <div class="ChatFrame">
            <input
              type="checkbox"
              v-model="startAndStopToggle"
              @click="checkToggle"
              name="toggle"
              id="record-toggle"
            />
  
            <svg viewBox="0 0 100 100" class="SvgImage">
              <circle cx="50%" cy="50%" r="45" class="circle-svg" />
            </svg>
  
            <div class="mic">
              <div class="mic__head"></div>
              <div class="mic__neck"></div>
              <div class="mic__leg"></div>
            </div>
  
            <div class="recording">
              <div class="round"></div>
              <div class="round"></div>
              <div class="round"></div>
            </div>
  
            <label for="record-toggle" class="toggle-label"></label>
          </div>
        </v-col>
        <v-col md="8" sm="8" class="ubuntu-regular-italic" style="padding-right: 50px">
          <div style="margin-top: 80px; width: 95%; padding-top: 20px">
            <v-skeleton-loader type="paragraph" color="#e7f0ff" v-if="translatedMessageLoader">
            </v-skeleton-loader>
          </div>
          <div v-if="translatedMessage.trim() != ''" style="font-style: italic; padding-top: 20px">
            <v-alert
              icon="fas fa-user"
              density="compact"
              theme="dark"
              variant="tonal"
              style="
                background-color: #e0e0de !important;
                color: #8a8a87 !important;
                padding-right: 0px;
              "
            >
              <VueWriter :array="[translatedMessage]" :typeSpeed="55" :iterations="1" />
            </v-alert>
            &nbsp;
          </div>
          <v-divider :thickness="3" v-if="agentMessage.trim() != ''"> </v-divider>
          <div style="margin-top: 24px; width: 95%">
            <v-skeleton-loader type="text@7" color="#e7f0ff" v-if="agentMessageLoader">
            </v-skeleton-loader>
          </div>
          <div
            v-if="agentMessage.trim() != ''"
            style="font-style: italic; margin-top: 24px; height: 42vh; overflow-y: auto"
          >
            <v-alert
              icon="fas fa-brain"
              density="compact"
              theme="dark"
              variant="tonal"
              style="
                background-color: #cbe0f5 !important;
                color: #2d3058 !important;
                padding-right: 0px;
              "
            >
              <VueWriter :array="[agentMessage]" :typeSpeed="55" :iterations="1" />
            </v-alert>
          </div>
        </v-col>
        <div id="siri-container" :class="audioUrl ? 'showAudioBlock' : 'hideAudioBlock'"></div>
      </v-row>
      <v-btn
        v-if="true"
        icon="fas fa-message"
        style="
          margin-right: 10px;
          float: right;
          bottom: 25px;
          right: 25px;
          position: fixed;
          z-index: 5;
        "
        :elevation="5"
        color="rgb(29, 6, 91)"
        @click="openChat = true"
      >
      </v-btn>
      <v-navigation-drawer color="#e7f0ff" v-model="openChat" location="right" temporary width="800">
        <div>
          <v-icon style="float: right; margin-right: 15px; margin-top: 10px" @click="openChat = false"
            >fas fa-close</v-icon
          >
        </div>
        <div
          id="ChatApp"
          style="width: 90%; margin-top: 10px; height: 98%; position: relative; left: 5%"
        >
          <div style="display: flex; justify-content: center">
            <div class="ChatHead">
              <div style="display: flex; justify-content: center">
                <div>
                  <img style="height: 40px" src="../assets/images/supergraphic_white.png" />
                </div>
                <div style="color: white; margin-left: 20px">
                  <div style="font-size: 18px">Chat History</div>
                  <div style="font-size: 10px">Chat</div>
                </div>
              </div>
            </div>
          </div>
          <div id="chat-box" style="height: 90%; padding-top: 50px">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="{
                'user-message': msg.sender === 'You',
                'bot-message': msg.sender === 'Bot'
              }"
              style="margin-top: 10px"
            >
              <span v-if="msg.sender === 'You'" class="message-text">{{ msg.text }}</span>
              <span v-if="msg.sender === 'You'" class="user-icon"
                ><i class="fas fa-user-circle"></i
              ></span>
              <div style="display: flex; margin-top: 5px; align-items: center">
                <span v-if="msg.sender === 'Bot'" class="bot-icon"
                  ><i class="fas fa-comments"></i
                ></span>
                <span v-if="msg.sender === 'Bot' && !msg.loading" class="message-text">{{
                  msg.text
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </v-navigation-drawer>
      <div v-if="audioUrl">
        <audio v-if="audioUrl" autoplay @ended="audioUrl = null">
          <source :src="'data:audio/mp3;base64,' + audioUrl" type="audio/mp3" />
        </audio>
      </div>
    </div>
  </template>
  
  <script>
  import SiriWave from 'siriwave'
  import { VueWriter } from 'vue-writer'
  
  export default {
    components: {
      VueWriter
    },
    data() {
      return {
        mediaRecorder: null,
        audioUrl: null,
        audioChunks: [],
        history: [],
        transcription: '',
        recording: false,
        silenceTimeout: null, // Timeout to detect silence
        silenceThreshold: 0.02, // Threshold for detecting silence
        userMessage: '',
        messages: [],
        openChat: false,
        startAndStopToggle: false,
        translatedMessage: '',
        agentMessage: ' ',
        agentMessageLoader: false,
        translatedMessageLoader: false,
        baseLink: ''
      }
    },
    methods: {
      async startRecording() {
        try {
          // Ask for user permission to access microphone
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  
          // Initialize MediaRecorder
          this.mediaRecorder = new MediaRecorder(stream)
  
          // Listen for data available event and collect audio chunks
          this.mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data)
          }
  
          // Start recording
          this.mediaRecorder.start()
  
          // Monitor silence
          this.detectSilence(stream)
        } catch (error) {
          console.error('Error accessing microphone:', error)
        }
      },
  
      async stopRecording() {
        this.startAndStopToggle = !this.startAndStopToggle
        if (this.mediaRecorder) {
          // Stop the recording
          this.mediaRecorder.stop()
          this.recording = false
          // this.startAndStopToggle = true
  
          // Once stopped, convert chunks to audio blob
          this.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' })
  
            // Reset audio chunks array
            this.audioChunks = []
  
            // Upload the audio to the backend
            this.agentMessage = ''
            this.translatedMessage = ''
  
            await this.translateAudio(audioBlob)
            await this.uploadAudio(audioBlob)
          }
        }
      },
  
      detectSilence(stream) {
        const audioContext = new AudioContext()
        const microphone = audioContext.createMediaStreamSource(stream)
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 2048
  
        const dataArray = new Uint8Array(analyser.fftSize)
        microphone.connect(analyser)
  
        this.silenceTimeout = null
        this.recording = true
  
        const checkForSilence = () => {
          analyser.getByteFrequencyData(dataArray)
  
          // Calculate the average volume level
          const averageVolume = dataArray.reduce((a, b) => a + b) / dataArray.length
  
          // Normalize the average volume
          const normalizedVolume = averageVolume / 255
  
          // console.log(normalizedVolume)
          // console.log(this.silenceThreshold)
          // If the volume level is below the threshold, set the silence timeout
          if (normalizedVolume < this.silenceThreshold) {
            if (!this.silenceTimeout) {
              this.silenceTimeout = setTimeout(() => {
                this.stopRecording()
                console.log('Silence detected')
                this.startAndStopToggle = false
              }, 2000) // 3 seconds of silence
            }
          } else {
            // If volume is above the threshold, clear the silence timeout
            if (this.silenceTimeout) {
              clearTimeout(this.silenceTimeout)
              this.silenceTimeout = null
            }
          }
  
          // Continue monitoring
          if (this.recording) {
            requestAnimationFrame(checkForSilence)
          } else {
            // Clean up
            microphone.disconnect()
            analyser.disconnect()
          }
        }
  
        checkForSilence()
      },
  
      async uploadAudio(audioBlob) {
        // Create FormData object to send the audio file.
        this.agentMessageLoader = true
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.wav')
        if (this.history.length > 0) {
          formData.append('history', JSON.stringify(this.history))
        }
  
        this.audioUrl = ''
  
        try {
          // Send the audio file to the backend and get the audio stream in response
          const response = await fetch(this.baseLink + '/upload_audio/', {
            method: 'POST',
            body: formData
          })
  
          // Log the entire response for debugging
  
          if (response.ok) {
            const result = await response.json()
            this.agentMessage = result.response
  
            this.audioUrl = result.audio
            this.transcription = result.response
            this.agentMessageLoader = false
            this.history.push({
              user_message: result.question,
              bot_response: result.response
            })
            this.messages.push({
              sender: 'You',
              text: result.question
            })
            this.messages.push({
              sender: 'Bot',
              text: result.response
            })
          } else {
            const errorResponse = await response.json()
            console.error('Error:', errorResponse)
          }
        } catch (error) {
          console.error('Upload error:', error)
          this.agentMessageLoader = false
        }
      },
  
      async translateAudio(audioBlob) {
        // Create FormData object to send the audio file
        this.translatedMessageLoader = true
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.wav')
        if (this.history.length > 0) {
          formData.append('history', JSON.stringify(this.history))
        }
  
        this.audioUrl = ''
  
        try {
          // Send the audio file to the backend and get the audio stream in response
          const response = await fetch(this.baseLink + '/translate', {
            method: 'POST',
            body: formData
          })
  
          // Log the entire response for debugging
  
          if (response.ok) {
            const result = await response.json()
            this.translatedMessage = result.message
            this.translatedMessageLoader = false
          } else {
            const errorResponse = await response.json()
            console.error('Error:', errorResponse)
          }
        } catch (error) {
          console.error('Upload error:', error)
          this.translatedMessageLoader = false
        }
      },
  
      checkToggle() {
        this.showAudioWave()
        if (this.startAndStopToggle) {
          clearTimeout(this.silenceTimeout)
          this.stopRecording()
        } else {
          this.startRecording()
        }
      },
      showAudioWave() {
        const container = document.getElementById('siri-container')
        const hasCanvas = container.querySelector('canvas') !== null
  
        if (!hasCanvas) {
          const SW9 = new SiriWave({
            style: 'ios9',
            container: document.getElementById('siri-container'),
            autostart: true,
            color: 'red',
            speed: 0.16,
            amplitude: 2.5
          })
        }
      }
    },
    created() {
      this.baseLink = import.meta.env.VITE_MODEL_URL
    }
  }
  </script>
  
  <style scoped>
  #siri-container {
    width: 600px;
    height: 150px;
    background-size: cover;
    margin: 0 auto;
    margin-top: -100px;
    z-index: 5;
  }
  .showAudioBlock {
    display: block;
  }
  .hideAudioBlock {
    display: none;
  }
  .ChatFrame {
    position: absolute;
    width: 130px;
    height: 130px;
    border-radius: 100px;
    box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.564);
    overflow: hidden;
    background: linear-gradient(151deg, rgba(0, 12, 101, 1) 0%, rgba(0, 0, 0, 1) 100%);
    color: #333;
    margin-left: -100px;
  }
  
  .ChatFrame input {
    display: none;
  }
  
  .SvgImage {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 130px;
    height: 130px;
    margin-top: -65px;
    margin-left: -65px;
  }
  
  .circle-svg {
    stroke: #f5f5f5;
    stroke-width: 3;
    fill: transparent;
  }
  
  .mic {
    width: 85px;
    height: 85px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -42.5px;
    /* 85px * -0.5 */
    margin-left: -42.5px;
    /* 85px * -0.5 */
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
  }
  
  .mic__head {
    background: linear-gradient(45deg, #e0e0e0 50%, white 50%);
    width: 30px;
    height: 63.75px;
    border-radius: 30px;
  }
  
  .mic__head::after {
    content: '';
    position: absolute;
    top: 10%;
    background: linear-gradient(151deg, rgba(0, 12, 101, 1) 0%, rgba(0, 0, 0, 1) 100%);
    width: 8px;
    height: 20px;
    border-radius: inherit;
    left: 50%;
    transform: translate(-50%);
  }
  
  .mic__neck {
    background: linear-gradient(45deg, #e0e0e0 50%, white 50%);
    width: 4.25px;
    /* 85px * 0.05 */
    height: 17px;
    /* 85px * 0.2 */
  }
  
  .mic__leg {
    background: linear-gradient(45deg, #e0e0e0 50%, white 50%);
    width: 30px;
    height: 4.25px;
    /* 85px * 0.05 */
    border-radius: 50px;
  }
  
  .recording {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 85px;
    height: 85px;
    margin-top: -42.5px;
    /* 85px * -0.5 */
    margin-left: -42.5px;
    /* 85px * -0.5 */
    transform: scale(0.5);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .round {
    background: white;
    width: 19.5px;
    /* 85px * 0.15 */
    height: 19.5px;
    /* 85px * 0.15 */
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -9.75px;
    /* 19.5px * -0.5 */
    margin-left: -9.75px;
    /* 19.5px * -0.5 */
    animation: recording 1s ease-in-out infinite;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.15);
  }
  
  .round:first-child {
    left: 20%;
  }
  
  .round:nth-child(2) {
    animation-delay: 0.15s;
  }
  
  .round:last-child {
    left: 80%;
    animation-delay: 0.3s;
  }
  
  .toggle-label {
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: 130px;
    height: 130px;
    margin-top: -65px;
    /* 130px * -0.5 */
    margin-left: -65px;
    /* 130px * -0.5 */
    cursor: pointer;
  }
  
  #record-toggle:checked ~ .SvgImage {
    animation: spinning 3s ease-in-out infinite alternate;
  }
  
  #record-toggle:checked ~ .SvgImage .circle-svg {
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    animation: dash 3s ease-in-out infinite alternate;
  }
  
  #record-toggle:checked ~ .mic {
    transform: scale(1.128);
    animation: gone 0.5s 0.3s ease forwards;
  }
  
  #record-toggle:checked ~ .recording {
    opacity: 1;
    transform: scale(0.98);
    transition-delay: 0.3s;
  }
  
  @keyframes spinning {
    to {
      transform: rotatez(360deg);
    }
  }
  
  @keyframes gone {
    to {
      transform: scale(0.5);
      opacity: 0;
    }
  }
  
  @keyframes recording {
    0% {
      transform: translatey(0%);
    }
  
    30% {
      transform: translatey(-30%);
    }
  
    60% {
      transform: translatey(30%);
    }
    toggle 90% {
      transform: translatey(0%);
    }
  }
  
  @keyframes dash {
    from {
      stroke-dashoffset: 300;
    }
  
    to {
      stroke-dashoffset: 0;
    }
  }
  
  .ChatHead {
    background: linear-gradient(
      151deg,
      rgba(0, 12, 101, 1) 0%,
      rgba(0, 8, 70, 1) 67%,
      rgba(0, 0, 0, 1) 100%
    );
    border-radius: 14px;
    width: 90%;
    margin-bottom: -30px;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    box-shadow: 2px 2px 4px rgb(205, 205, 205);
    z-index: 5;
  }
  
  #chat-box {
    border: none;
    padding: 10px;
    height: 300px;
    overflow-y: auto;
    background-color: #fff;
    margin-bottom: 4px;
    border-radius: 10px 10px 10px 10px;
  }
  
  #user-input {
    display: flex;
    align-items: center;
    /* Center the input and button vertically */
  }
  
  .input-container {
    padding: 0px 30px 0px 30px;
    position: relative;
    /* For positioning the button */
    flex: 1;
    /* Allow the container to grow */
  }
  
  input {
    width: 100%;
    padding: 15px;
    background-color: #ffffff;
    /* Light background color for input */
    border: none;
    /* Border color */
    border-radius: 0px 0px 10px 10px;
    /* Rounded corners */
  }
  
  .send-button {
    position: absolute;
    /* Position inside the input */
    right: 50px;
    /* Position to the right */
    top: 50%;
    /* Center vertically */
    transform: translateY(-50%);
    /* Adjust for vertical centering */
    background: none;
    /* Remove background */
    border: none;
    /* Remove border */
    cursor: pointer;
    /* Pointer on hover */
    color: #191973;
    /* Color of the icon */
  }
  
  .user-message {
    display: flex;
    justify-content: flex-end;
    /* Align user messages to the right */
    margin: 5px 0;
  }
  
  .bot-message {
    text-align: left;
    margin: 5px 0;
  }
  
  .message-text {
    display: inline-block;
    padding: 5px;
    /* Padding for better spacing */
    /* Rounded corners */
  }
  
  .user-message .message-text {
    margin-right: 15px;
    padding: 5px 20px;
    /* Light green background for user messages */
    border-radius: 8px 8px 0px 8px;
    box-shadow: 2px 2px 4px rgba(184, 184, 184, 0.667);
    background-color: #eaeaea;
    color: gray;
  }
  
  .bot-message .message-text {
    margin-left: 15px;
    padding: 5px 20px;
    background-color: #daf4ff;
    box-shadow: 2px 2px 4px rgba(215, 215, 215, 0.853);
    color: #191973;
    border-radius: 8px 8px 8px 0px;
    /* Light red background for bot messages */
  }
  
  .user-icon {
    color: gray;
    margin-left: 5px;
    /* Space between icon and text */
    align-self: flex-end;
    /* Align icon to the bottom of the message */
  }
  
  .bot-icon {
    color: gray;
    margin-right: 5px;
    /* Space between icon and text */
    align-self: flex-start;
    /* Align icon to the top of the message */
  }
  
  .loading-dots {
    margin-left: 5px;
    /* Space between bot icon and loading dots */
    display: inline-block;
    animation: dot-blink 1.5s infinite;
    font-weight: bold;
    /* Make dots bolder for visibility */
  }
  
  .montserrat {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 22px;
    padding-right: 30px;
    /* font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal; */
  }
  
  .ubuntu-regular-italic {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 500;
    font-size: 20px;
    font-style: italic;
  }
  
  /* Animation for loading dots */
  @keyframes dot-blink {
    0%,
    20% {
      opacity: 1;
    }
  
    40% {
      opacity: 0;
    }
  
    60% {
      opacity: 1;
    }
  
    80%,
    100% {
      opacity: 0;
    }
  }
  </style>
  